# UNIT-821 — Act: Run art:generate to emit item PNGs and manifest entries

## Summary
Regenerate assets so the six item icons and manifest entries are committed

## Description
With ITEM_SOURCES in ART_SOURCES, run the existing art:generate script so mergeManifest adds six item/ entries and writes the PNGs. No generator code change is needed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets array (item/ entries)` · after the room/ entries in assets
- **Do:** Run npm run art:generate in game/frontend; it writes the six PNGs and appends item/old-key, item/note, item/book, item/coin, item/flashlight and item/photo entries with type image and dimensions {width:16,height:16}. Do not edit the JSON by hand.
- **Run:** `cd game/frontend && npm run art:generate && git status --short ../public`
- **Expected:** Six new PNGs under items/ and a manifest diff with only six added entries.

## Acceptance criteria
- Six PNGs exist under game/public/assets/worlds/the-boys-room/items/.
- manifest.json has six item/ entries of type image with 16x16 dimensions.
- Existing manifest entries are unchanged.

## Definition of done
- git diff shows only new item files and manifest additions.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-821.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-166
- Requirement: REQ-411
- Unit (Act): UNIT-821
- Unit (Verify): UNIT-823
- Status: completed
- Change: UPDATE
