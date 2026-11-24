# UNIT-461 — Act: Normalise invalid dpr in computeZoom

## Summary
computeZoom treats non-finite or non-positive dpr as 1

## Description
Guard dpr at the top of computeZoom in config.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/config.ts` · `computeZoom` · L6-L8
- **Do:** Add const ratio = Number.isFinite(dpr) && dpr > 0 ? dpr : 1 and use ratio instead of dpr in the formula.

```
const ratio = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
return Math.max(1, Math.floor(Math.min((w * ratio) / GAME_WIDTH, (h * ratio) / GAME_HEIGHT)));
```

- **Expected:** computeZoom(1280,720,NaN) returns 2

## Acceptance criteria
- Invalid dpr behaves as 1
- Valid inputs unchanged

## Definition of done
- Guard added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-461.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-093
- Requirement: REQ-231
- Unit (Act): UNIT-461
- Unit (Verify): UNIT-463
- Status: approved
- Change: UPDATE
