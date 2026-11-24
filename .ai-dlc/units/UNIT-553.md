# UNIT-553 — Act: Annotate BootScene.resolveKey return and parameter types

## Summary
Make resolveKey signature explicit for typed test mocks

## Description
BootScene.resolveKey already takes id: string and returns string; confirm the explicit signature and the FALLBACK_KEY export stay so the fallback test can type its mocks.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.resolveKey` · L48
- **Do:** Confirm the method signature is resolveKey(id: string): string and keep it; make no change if it already matches

```
resolveKey(id: string): string
```

- **Expected:** Signature matches; tsc reports no new error

## Acceptance criteria
- Given BootScene.resolveKey, When read, Then it is declared (id: string): string
- Given FALLBACK_KEY, When imported, Then it is still exported

## Definition of done
- Signature explicit and unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-553.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-111
- Requirement: REQ-278
- Unit (Act): UNIT-553
- Unit (Verify): UNIT-557
- Status: approved
- Change: UPDATE
