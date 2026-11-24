# UNIT-378 — Act: Add the three ui SVG files under game/public/assets/ui

## Summary
Create sound.svg, panel-frame.svg and pointer.svg in the ui folders.

## Description
Create the three files with the same content as game/frontend/public/assets/ui so the folders are tracked by git.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/ui/icons/sound.svg` · `new: sound.svg` · new
- **Do:** Create the file with the same single-line SVG as game/frontend/public/assets/ui/icons/sound.svg (16x16 speaker glyph).

```
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><rect x="2" y="6" width="4" height="4" fill="#f0e0b0"/><rect x="6" y="3" width="4" height="10" fill="#f0e0b0"/></svg>
```

- **Expected:** game/public/assets/ui/icons/sound.svg exists and is non-empty

### Step 2 — `game/public/assets/ui/frames/panel-frame.svg` · `new: panel-frame.svg` · new
- **Do:** Create the file with the same SVG as game/frontend/public/assets/ui/frames/panel-frame.svg (24x24 frame).

```
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" shape-rendering="crispEdges"><rect width="24" height="24" fill="#2a1f1a"/><rect x="3" y="3" width="18" height="18" fill="#4a3828"/></svg>
```

- **Expected:** game/public/assets/ui/frames/panel-frame.svg exists and is non-empty

### Step 3 — `game/public/assets/ui/cursors/pointer.svg` · `new: pointer.svg` · new
- **Do:** Create the file with the same SVG as game/frontend/public/assets/ui/cursors/pointer.svg (16x16 cursor).

```
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><rect x="2" y="2" width="2" height="10" fill="#fff"/><rect x="4" y="4" width="2" height="6" fill="#fff"/></svg>
```

- **Expected:** game/public/assets/ui/cursors/pointer.svg exists and is non-empty

## Acceptance criteria
- Given the repo, When the ui folders are listed, Then each holds one non-empty SVG
- Given each file, When read, Then it matches the file of the same name under game/frontend/public/assets/ui

## Definition of done
- Three SVGs exist under game/public/assets/ui
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-378.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-075
- Requirement: REQ-189
- Unit (Act): UNIT-378
- Unit (Verify): UNIT-380
- Status: completed
- Change: UPDATE
