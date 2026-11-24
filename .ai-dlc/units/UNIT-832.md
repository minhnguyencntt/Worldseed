# UNIT-832 — Act: Author nine-slice frame sources and register them for art:generate

## Summary
uiFrames.ts, ART_SOURCES registration, generated PNGs

## Description
Pure frame grid builder, FRAME_KIT registry, sources and generated output.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/uiFrames.ts` · `new: FrameSpec, buildFrameGrid, FRAME_KIT, UI_FRAME_SOURCES` · new
- **Do:** Using createGrid, fillRect, outlineRect, shadeRect, rampIndex from ./draw, export buildFrameGrid(spec:{w,h,slice,ramp,border,lightStep,darkStep}):Grid that fills the body with a shadeRect gradient, draws a 1px outlineRect in rampIndex('indigo',0), 1px highlight along top/left and shadow along bottom/right, and a brass 2px corner block of size slice. Export FRAME_KIT: [{id:'ui/frame-bar',file:'bar',w:32,h:24,slice:8,ramp:'wood'},{panel 24x24 slice 8 wood},{plaque 32x16 slice 6 brass},{parchment 24x24 slice 8 parchment},{slot 20x20 slice 6 indigo},{button-normal 24x16 slice 6 brass},{button-hover brass lighter},{button-pressed brass darker},{button-disabled 24x16 slice 6 parchment low contrast}]. Export UI_FRAME_SOURCES mapping each to {id,path:'ui/frames/<file>.png',frames:[buildFrameGrid(spec)]}. Slice must be under half of w and h.

```
export const UI_FRAME_SOURCES: ArtSource[] = FRAME_KIT.map((f) => ({ id: f.id, path: `ui/frames/${f.file}.png`, frames: [buildFrameGrid(f)] }));
```

- **Expected:** FRAME_KIT has nine entries, buildFrameGrid returns w x h grids

### Step 2 — `game/frontend/src/art/sources.ts` · `ART_SOURCES` · L55-L65
- **Do:** Import UI_FRAME_SOURCES from './uiFrames' and spread it into ART_SOURCES immediately after the ui/cursor-hand entry.

```
...UI_FRAME_SOURCES,
```

- **Expected:** ART_SOURCES includes nine ui/frame-* ids

### Step 3 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets array` · after the ui/cursor-hand entry (L10-L17)
- **Do:** Run npm run art:generate in game/frontend to write the nine PNGs under game/public/assets/ui/frames and merge their image entries (with dimensions) into the manifest; do not hand-edit.
- **Run:** `npm run art:generate`
- **Expected:** manifest has ui/frame-bar ... ui/frame-button-disabled entries and the PNG files exist

## Acceptance criteria
- FRAME_KIT lists nine frames
- art:generate writes PNGs and manifest entries

## Definition of done
- PNGs exist under game/public/assets/ui/frames with manifest entries
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-832.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-168
- Requirement: REQ-417
- Unit (Act): UNIT-832
- Unit (Verify): UNIT-836
- Status: completed
- Change: UPDATE
