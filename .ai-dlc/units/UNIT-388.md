# UNIT-388 — Act: Write the temporary-asset replacement requirements document

## Summary
Create game/docs/temporary-assets.md

## Description
Document each asset group with ids, sizes, frame counts and replacement rules, stating the art is temporary and not production quality.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/docs/temporary-assets.md` · `new: temporary-assets.md` · new
- **Do:** Write a doc beginning with: 'These assets are temporary and are not production-quality artwork.' Add headings Backgrounds, Furniture, Objects, Characters, Effects. Under each list manifest ids (background:wall, background:floor, background:window-view, background:lighting, scene:bedroom; objects/bed, objects/bookshelf, objects/desk, furniture:chair, furniture:wardrobe; objects/old-computer, objects/books, objects/door, objects/window, objects/secret-door-closed, objects/secret-door-open; character:boy, character:boy-walk, character:boy-interact; effect:dust, effect:glow) with required dimensions, frame size/count for sheets, SVG/PNG format and that replacements keep the same id and size or update the manifest.
- **Expected:** File exists with all five headings and every id

## Acceptance criteria
- Sections for five layers exist
- Contains the non-production statement

## Definition of done
- Document committed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-388.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-077
- Requirement: REQ-196
- Unit (Act): UNIT-388
- Unit (Verify): UNIT-393
- Status: completed
- Change: UPDATE
