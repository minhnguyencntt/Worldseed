# UNIT-850 — Act: Add anchorFor and report canvas rect and zoom from PhaserHost

## Summary
Create the pure anchor function and expose canvas rect and zoom on resize.

## Description
Add frontend/src/lib/anchor.ts exporting anchorFor and have PhaserHost report its canvas rect and zoom through an optional onLayout callback on mount, resize and DPR change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/anchor.ts` · `new: anchorFor` · new
- **Do:** Create exported type AnchorInput {position:{x:number;y:number}; bounds?:{x:number;y:number;width:number;height:number}; scale:number; zoom:number; offset:{left:number;top:number}; dpr:number} and function anchorFor(input) returning {top:{x,y}; bottom:{x,y}} in CSS pixels or null when bounds is undefined. cssZoom = zoom / dpr; top.x = offset.left + (position.x + (bounds.x + bounds.width/2)*scale)*cssZoom; top.y = offset.top + (position.y + bounds.y*scale)*cssZoom; bottom.y uses bounds.y+bounds.height.

```
const z = input.zoom / input.dpr;
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** anchor.ts type-checks

### Step 2 — `game/frontend/src/components/PhaserHost.tsx` · `PhaserHost, applyZoom` · L8-L65
- **Do:** Add optional prop onLayout?: (l:{left:number;top:number;zoom:number;dpr:number})=>void to PhaserHostProps. After the initial createGame call and at the end of applyZoom, read container.getBoundingClientRect() and call onLayout?.({left:r.left, top:r.top, zoom:currentZoom(), dpr:window.devicePixelRatio}).

```
onLayout?.({ left: r.left, top: r.top, zoom: currentZoom(), dpr: window.devicePixelRatio });
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** PhaserHost accepts onLayout

## Acceptance criteria
- anchorFor returns top-centre and bottom-centre CSS-pixel points from position, bounds, scale, zoom, offset and DPR
- PhaserHost calls onLayout with {left, top, zoom, dpr} after every applyZoom

## Definition of done
- anchorFor exported
- onLayout invoked on resize
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-850.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-171
- Requirement: REQ-425
- Unit (Act): UNIT-850
- Unit (Verify): UNIT-854
- Status: completed
- Change: UPDATE
