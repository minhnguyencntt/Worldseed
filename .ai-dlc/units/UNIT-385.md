# UNIT-385 — Act: Add books and secret door state SVGs with manifest entries

## Summary
Create three object SVGs and register them

## Description
Create books, secret-door-closed and secret-door-open SVGs and manifest entries.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/objects/books.svg` · `new: books.svg` · new
- **Do:** Create a 20x12 crispEdges SVG with a stack of three coloured book rects (#a04040, #4060a0, #508050) with lighter page edges. Create secret-door-closed.svg (40x80, bookshelf-brown panel with shelf lines) and secret-door-open.svg (40x80, dark doorway rect with a lit frame and ajar panel).
- **Expected:** Three SVG files exist with the stated sizes

### Step 2 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets array` · after the last entry
- **Do:** Append objects/books (20x12), objects/secret-door-closed (40x80) and objects/secret-door-open (40x80), each type image, with interactionBounds equal to full size.

```
{ "id": "objects/secret-door-open", "path": "worlds/the-boys-room/objects/secret-door-open.svg", "type": "image", "dimensions": { "width": 40, "height": 80 }, "interactionBounds": { "x": 0, "y": 0, "width": 40, "height": 80 } }
```

- **Expected:** Manifest parses with three more unique ids

## Acceptance criteria
- Three files exist
- Three entries with matching dimensions and bounds

## Definition of done
- Files exist and entries added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-385.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-077
- Requirement: REQ-193
- Unit (Act): UNIT-385
- Unit (Verify): UNIT-390
- Status: completed
- Change: UPDATE
