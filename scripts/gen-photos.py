#!/usr/bin/env python3
"""
Generate the site photography for USA Appliance & HVAC using Gemini image models.

Every slot in PHOTOS.md is reproduced here as a dict: the scene prompt, the
aspect ratio to request, and the exact pixel size the layout wants. The shared
style and negative blocks are applied to all of them so the ten frames read as
one shoot rather than ten unrelated stock images.

Usage:
    python3 scripts/gen-photos.py --list
    python3 scripts/gen-photos.py --only hero-technician
    python3 scripts/gen-photos.py --all
    python3 scripts/gen-photos.py --all --flash        # cheaper/faster model
"""

import argparse
import io
import os
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
OUT_DIR = PROJECT / "src" / "assets" / "photos"

MODEL_PRO = "gemini-3-pro-image-preview"
MODEL_FLASH = "gemini-2.5-flash-image"


def load_env() -> None:
    """Same lookup order the design skill uses."""
    for env_path in (
        PROJECT / ".env",
        Path.home() / ".claude" / "skills" / ".env",
        Path.home() / ".claude" / ".env",
    ):
        if not env_path.exists():
            continue
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


load_env()

try:
    from google import genai
    from google.genai import types
except ImportError:
    sys.exit("google-genai not installed. Run: pip3 install google-genai")

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow not installed. Run: pip3 install Pillow")


STYLE = (
    "Documentary editorial photograph, photorealistic. Natural available light, "
    "cool-neutral white balance around 5600K. 35mm lens, f/2.8, mild depth of field. "
    "Muted desaturated palette of slate blue, warm grey and worn metal. Subtle film grain. "
    "A candid working moment: the subject is absorbed in the task and unaware of the camera. "
    "Midwestern United States residential setting, late winter."
)

NEGATIVE = (
    "Absolutely no text, letters, words, numbers, signage, logos, brand marks or watermarks "
    "anywhere in the frame. No posing, no smiling at the camera, no thumbs up, no crossed arms. "
    "Not stock-photo styling. No white studio background. No orange-and-teal grading, no HDR, "
    "no lens flare, no oversaturated colour. Anatomically correct hands."
)

# Gemini accepts these; anything else is center-cropped from the nearest match.
SLOTS = [
    {
        "name": "hero-technician",
        "ratio": "5:4",
        "size": (1800, 1620),
        "prompt": (
            "A service technician in his forties crouches beside a pulled-out dishwasher in a "
            "real family kitchen, one hand on the circulation pump, a work light clamped to the "
            "cabinet. Shaker cabinets and a stone countertop, a kettle soft in the background. "
            "Cool daylight from a window on the left. He is looking at the component, not the "
            "camera. The composition leaves clear, quiet negative space across the upper left."
        ),
    },
    {
        "name": "about-crew",
        "ratio": "3:4",
        "size": (800, 1067),
        "prompt": (
            "Two service technicians stand at the doorway of a Chicago brick two-flat, "
            "mid-conversation about a tablet one of them holds. Vertical framing. Late afternoon "
            "overcast light, bare trees behind them. Working outerwear, deliberately unmatched. "
            "Neither looks at the camera."
        ),
    },
    {
        "name": "about-van",
        "ratio": "3:4",
        "size": (800, 1067),
        "prompt": (
            "Vertical shot into the open rear doors of a work van: organised shelving with "
            "appliance parts bins, coiled copper refrigerant line set, a vacuum pump and a folded "
            "drop cloth. A hand reaches in for a tool at the edge of frame. Flat grey daylight, "
            "wet asphalt behind. The van is plain white with no lettering or livery of any kind."
        ),
    },
    {
        "name": "why-us-technician",
        "ratio": "5:4",
        "size": (1400, 1260),
        "prompt": (
            "Close three-quarter view of a technician's hands seating a new capacitor into an "
            "outdoor air-conditioning condenser, the access panel resting against the side. "
            "Shallow focus on the hands and the component. Blurred house siding and flat grey sky "
            "behind."
        ),
    },
    {
        "name": "service-refrigerator-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame of a refrigerator eased away from the kitchen wall, its lower rear "
            "panel off, a technician working on the compressor and condenser coils with a "
            "flashlight propped nearby. Kitchen floor and cabinet edges soft at the sides."
        ),
    },
    {
        "name": "service-washer-dryer-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame of a front-loading washing machine pulled out from a laundry alcove, "
            "front panel removed, revealing the drum and drain pump. A technician crouches with "
            "both hands on the pump housing. Detergent and a laundry basket soft at the edges."
        ),
    },
    {
        "name": "service-dishwasher-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame in a family kitchen: a dishwasher pulled forward from under the "
            "counter with its lower access panel removed, a technician's hands on the inlet valve "
            "and hose connections, a towel underneath catching drips. Cool daylight from a window "
            "off-frame left."
        ),
    },
    {
        "name": "service-oven-stove-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame of a wall oven pulled partway out of its cabinet with the rear control "
            "board exposed, a technician checking a connector with a multimeter. Kitchen "
            "surroundings soft. Warm interior light mixed with cool daylight."
        ),
    },
    {
        "name": "service-air-conditioning-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame of an outdoor air-conditioning condenser with its top grille lifted, "
            "a technician using refrigerant gauges connected to the service ports. Suburban house "
            "siding and a strip of lawn behind. Flat overcast daylight."
        ),
    },
    {
        "name": "service-heating-furnace-repair",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame of a residential gas furnace with the front panel removed, exposing "
            "the inducer motor and hot-surface ignitor. A gloved hand steadies a replacement "
            "ignitor into position. Cold basement light, exposed floor joists overhead."
        ),
    },
    {
        "name": "service-commercial",
        "ratio": "4:5",
        "size": (1000, 1250),
        "prompt": (
            "Vertical frame inside a working commercial kitchen: a technician kneeling beside "
            "an open stainless-steel walk-in cooler door, hands on the evaporator unit mounted "
            "above, a service gauge set resting on a prep table nearby. Stainless surfaces, "
            "wire shelving stacked with crates, quarry-tile floor. Cool overhead work light "
            "mixed with the cold light spilling from inside the cooler. The room is clearly a "
            "restaurant back-of-house, not a domestic kitchen."
        ),
    },
    {
        "name": "og-cover",
        "ratio": "16:9",
        "size": (1200, 630),
        "prompt": (
            "Wide horizontal establishing shot of a plain unmarked work van parked at the curb of "
            "a Chicago residential street on a grey afternoon. A technician walks toward the house "
            "carrying a tool bag, seen from behind. Generous empty sky across the upper third."
        ),
    },
]


def build_prompt(slot: dict) -> str:
    return f"{STYLE}\n\n{slot['prompt']}\n\n{NEGATIVE}"


def fit_to_size(raw: bytes, size: tuple[int, int]) -> bytes:
    """Center-crop to the target aspect ratio, resize, save as JPEG q82."""
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    target_w, target_h = size
    target_ratio = target_w / target_h
    w, h = img.size
    if w / h > target_ratio:
        new_w = round(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = round(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    img = img.resize(size, Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
    return buf.getvalue()


def generate(client, slot: dict, model: str) -> bool:
    print(f"  {slot['name']}: requesting {slot['ratio']} → {slot['size'][0]}×{slot['size'][1]}")
    response = client.models.generate_content(
        model=model,
        contents=build_prompt(slot),
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio=slot["ratio"]),
        ),
    )

    raw = None
    for part in response.candidates[0].content.parts:
        inline = getattr(part, "inline_data", None)
        if inline and inline.mime_type.startswith("image/"):
            raw = inline.data
            break

    if not raw:
        print(f"  {slot['name']}: no image returned (likely a safety block)")
        return False

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slot['name']}.jpg"
    out.write_bytes(fit_to_size(raw, slot["size"]))
    print(f"  {slot['name']}: saved {out.relative_to(PROJECT)} ({out.stat().st_size // 1024} KB)")
    return True


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="generate every slot")
    ap.add_argument("--only", action="append", default=[], help="slot name (repeatable)")
    ap.add_argument("--flash", action="store_true", help="use the cheaper flash model")
    ap.add_argument("--list", action="store_true", help="print slot names and exit")
    args = ap.parse_args()

    if args.list:
        for s in SLOTS:
            print(f"{s['name']:30} {s['ratio']:>5}  {s['size'][0]}×{s['size'][1]}")
        return

    if not os.environ.get("GEMINI_API_KEY"):
        sys.exit("GEMINI_API_KEY not found in environment or .env files")

    selected = SLOTS if args.all else [s for s in SLOTS if s["name"] in args.only]
    if not selected:
        sys.exit("Nothing selected. Pass --all or --only <name>. Use --list to see names.")

    model = MODEL_FLASH if args.flash else MODEL_PRO
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    print(f"Model: {model}\n")

    ok = 0
    for slot in selected:
        try:
            ok += generate(client, slot, model)
        except Exception as exc:  # keep going; one bad slot shouldn't stop the batch
            print(f"  {slot['name']}: FAILED — {type(exc).__name__}: {exc}")

    print(f"\n{ok}/{len(selected)} generated into {OUT_DIR.relative_to(PROJECT)}")


if __name__ == "__main__":
    main()
