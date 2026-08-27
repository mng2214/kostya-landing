# USA Appliance & HVAC — product context

## What it is
A marketing landing site for USA Appliance & HVAC, a handyman / HVAC / appliance repair
company operating out of Rolling Meadows, IL and covering Chicago's northwest
suburbs.

**Register: brand.** Design *is* the product here. The site has one job: turn a
homeowner with a broken furnace into a phone call or a form submission.

## Audience
Homeowners and small property managers, 30–65, in the Chicago suburbs. They
arrive from Google with a problem already in hand ("furnace not igniting",
"dryer won't heat"). They are not browsing. They are deciding whether this
company is real, close, and reachable today.

## What has to be true on the page
1. The phone number is reachable from anywhere on the page, on any device.
2. It is obvious within one screen what the company does and where it operates.
3. Trust is evidenced, not claimed: Google rating, licensing, warranty terms,
   fixed written estimates.
4. Three conversion paths, all equal citizens: call, request a callback, send
   the form. Different people pick different ones.

## Non-goals
- No e-commerce, no booking calendar, no customer accounts.
- No blog. The company will not maintain one, and a stale blog reads worse
  than no blog.

## Current state
React 19 + Vite + Tailwind 4, single-page-app routing. All copy lives in
`src/content.ts`. Lead submission, callback requests, Google reviews and the
Crisp chat widget are stubs with real UI states, wired to single swap points.
