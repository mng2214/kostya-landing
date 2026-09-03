#!/usr/bin/env python3
"""
Draw a "your image here" placeholder for every photo slot.

The client supplies the photography, so every slot ships a placeholder that
states the exact pixel size it expects — both in the filename
(`<slot>__<W>x<H>.jpg`, which `src/lib/photos.ts` reads back) and printed on
the image itself, so the size is visible on the live site without opening a
folder. Replacing a photo means dropping a file over the one already there,
keeping its name.

Sizes are not duplicated here: they are parsed out of PHOTO_SIZES in
src/lib/photos.ts, so the two can never drift apart.

    python3 scripts/gen-placeholders.py            # every slot
    python3 scripts/gen-placeholders.py hero-technician about-crew

Slots listed in KEEP_REAL hold real photography and are never overwritten.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "src" / "assets" / "photos"
REGISTRY = ROOT / "src" / "lib" / "photos.ts"

# Slots that are not the client's to replace.
KEEP_REAL = {"why-us-chicago"}

# Images served from public/ rather than through the slot registry. Their paths
# are hard-coded in index.html and content.ts and are cached by the services
# that render link previews, so the filename stays put and only the picture
# states the size.
EXTRAS = {"public/og-cover.jpg": (1200, 630)}

BG = (255, 255, 255)
FG = (17, 17, 17)
MUTED = (135, 138, 148)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
PLAIN = "/System/Library/Fonts/Supplemental/Arial.ttf"


def read_sizes() -> dict[str, tuple[int, int]]:
    """Pull PHOTO_SIZES out of the registry rather than restating it here."""
    src = REGISTRY.read_text()
    body = src.split("PHOTO_SIZES: Record<PhotoSlot, { width: number; height: number }> = {", 1)[1]
    body = body.split("\n};", 1)[0]
    pattern = re.compile(r'"([\w-]+)":\s*\{\s*width:\s*(\d+),\s*height:\s*(\d+)\s*\}')
    return {m[1]: (int(m[2]), int(m[3])) for m in pattern.finditer(body)}


def fit(text: str, font_path: str, target_w: int, cap: int) -> ImageFont.FreeTypeFont:
    """Largest size at which `text` still fits `target_w`, capped."""
    size = 8
    while size < cap:
        f = ImageFont.truetype(font_path, size + 1)
        if f.getbbox(text)[2] > target_w:
            break
        size += 1
    return ImageFont.truetype(font_path, size)


def upload_glyph(d: ImageDraw.ImageDraw, x: int, y: int, s: int, w: int) -> None:
    """A tray with an arrow rising out of it — the usual 'upload' mark."""
    d.rounded_rectangle([x, y, x + s, y + s], radius=s * 0.22, outline=FG, width=w)
    cx = x + s / 2
    stem_top, stem_bot = y + s * 0.26, y + s * 0.60
    d.line([cx, stem_top, cx, stem_bot], fill=FG, width=w)
    head = s * 0.16
    d.line([cx - head, stem_top + head, cx, stem_top], fill=FG, width=w)
    d.line([cx + head, stem_top + head, cx, stem_top], fill=FG, width=w)
    tray_y = y + s * 0.68
    d.line([x + s * 0.24, tray_y, x + s * 0.24, y + s * 0.78], fill=FG, width=w)
    d.line([x + s * 0.76, tray_y, x + s * 0.76, y + s * 0.78], fill=FG, width=w)
    d.line([x + s * 0.24, y + s * 0.78, x + s * 0.76, y + s * 0.78], fill=FG, width=w)


def render(slot: str, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    unit = min(w, h)

    stroke = max(3, round(unit * 0.011))
    margin = round(unit * 0.13)
    frame = [margin, margin, w - margin, h - margin]
    d.rounded_rectangle(frame, radius=round(unit * 0.02), outline=FG, width=stroke)

    inner_w = frame[2] - frame[0]
    inner_h = frame[3] - frame[1]

    # The tray sits on the frame's top-left corner, punched out of the line.
    glyph = round(unit * 0.13)
    gx, gy = margin - glyph // 2, margin - glyph // 2
    d.rectangle([gx - stroke, gy - stroke, gx + glyph + stroke, gy + glyph + stroke], fill=BG)
    upload_glyph(d, gx, gy, glyph, stroke)

    lines = ["YOUR", "IMAGE", "HERE"]
    # Three lines plus the gap and the size label come to ~4.03 ems of stacked
    # height, so the frame constrains the type as much as its width does — a
    # width-only fit overflows the box on anything wider than it is tall.
    ems = len(lines) * 1.06 + 0.55 + 0.30
    body = fit(
        max(lines, key=len),
        BOLD,
        inner_w * 0.74,
        round(min(unit * 0.30, inner_h * 0.80 / ems)),
    )
    note = ImageFont.truetype(PLAIN, max(11, round(body.size * 0.30)))

    line_h = body.size * 1.06
    label = f"{w} × {h} px"
    block = line_h * len(lines) + body.size * 0.55 + note.size

    y = (h - block) / 2
    for line in lines:
        d.text((w / 2, y), line, font=body, fill=FG, anchor="ma")
        y += line_h

    d.text((w / 2, y + body.size * 0.30), label, font=note, fill=MUTED, anchor="ma")
    return img


def main() -> int:
    sizes = read_sizes()
    wanted = sys.argv[1:] or sorted(sizes)

    unknown = [s for s in wanted if s not in sizes]
    if unknown:
        print(f"unknown slot(s): {', '.join(unknown)}", file=sys.stderr)
        return 1

    PHOTOS.mkdir(parents=True, exist_ok=True)
    for slot in wanted:
        if slot in KEEP_REAL:
            print(f"  skip  {slot} (real photography)")
            continue
        w, h = sizes[slot]
        out = PHOTOS / f"{slot}__{w}x{h}.jpg"
        render(slot, w, h).save(out, quality=72, optimize=True, subsampling=2)
        print(f"  wrote {out.relative_to(ROOT)}  {out.stat().st_size // 1024} kB")

    if not sys.argv[1:]:
        for rel, (w, h) in EXTRAS.items():
            out = ROOT / rel
            render(rel, w, h).save(out, quality=72, optimize=True, subsampling=2)
            print(f"  wrote {rel}  {out.stat().st_size // 1024} kB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
