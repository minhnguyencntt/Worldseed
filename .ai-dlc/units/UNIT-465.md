# UNIT-465 — Act: Compute and refresh zoom in PhaserHost

## Summary
Use computeZoom at mount, on resize and on dpr change

## Description
PhaserHost computes the zoom from the container size and window.devicePixelRatio, passes it to createGame, and re-applies it via scale.setZoom plus scale.refresh on resize and ratio change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/PhaserHost.tsx` · `PhaserHost` · L1-L3
- **Do:** Import computeZoom from '../phaser/config'.

```
import { computeZoom } from '../phaser/config';
```

- **Expected:** computeZoom available

### Step 2 — `game/frontend/src/components/PhaserHost.tsx` · `PhaserHost useEffect` · L13-L30
- **Do:** Define const currentZoom = () => computeZoom(container.clientWidth, container.clientHeight, window.devicePixelRatio) once container is non-null; pass currentZoom() as third argument to createGame; in the ResizeObserver callback call game.scale.setZoom(currentZoom()) then game.scale.refresh(); also register a matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`) 'change' listener (only if window.matchMedia exists) running the same update, and remove it in cleanup.

```
gameRef.current = createGame(container, scenes ?? [], currentZoom());
```

- **Expected:** Zoom passed at creation and refreshed on resize and dpr change

## Acceptance criteria
- createGame receives computed zoom
- Resize and dpr change call setZoom then refresh

## Definition of done
- Host wired and type-check clean
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-465.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-094
- Requirement: REQ-233
- Unit (Act): UNIT-465
- Unit (Verify): UNIT-467
- Status: completed
- Change: UPDATE
