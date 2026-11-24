# UNIT-768 — Act: Switch config.ts to 480x270 and guard computeZoom against invalid dpr

## Summary
Change render constants and normalise dpr

## Description
Edit GAME_WIDTH/GAME_HEIGHT and make computeZoom safe for invalid dpr.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/config.ts` · `GAME_WIDTH, GAME_HEIGHT` · L3-L4
- **Do:** Change the values from 640 and 360 to 480 and 270.

```
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 270;
```

- **Expected:** buildGameConfig returns width 480 and height 270.

### Step 2 — `game/frontend/src/phaser/config.ts` · `computeZoom` · L6-L8
- **Do:** Add const ratio = Number.isFinite(dpr) && dpr > 0 ? dpr : 1 and use ratio instead of dpr in the formula.

```
const ratio = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
return Math.max(1, Math.floor(Math.min((w * ratio) / GAME_WIDTH, (h * ratio) / GAME_HEIGHT)));
```

- **Expected:** computeZoom(1280,720,NaN) returns 2.

## Acceptance criteria
- GAME_WIDTH is 480 and GAME_HEIGHT is 270.
- computeZoom returns an integer >= 1 for NaN, 0 and negative dpr.

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-768.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-156
- Requirement: REQ-385
- Unit (Act): UNIT-768
- Unit (Verify): UNIT-771
- Status: completed
- Change: UPDATE
