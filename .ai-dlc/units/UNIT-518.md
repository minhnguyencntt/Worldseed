# UNIT-518 — Act: Mark planPreload and resolveTextureKey as pure exports

## Summary
Document pure named exports in planPreload.ts

## Description
Context: planPreload.ts already exports both functions with no side effects. Desired behavior: add a comment guarding purity so tests can import them directly. Expected result: no behavior change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/planPreload.ts` · `module header` · after L3
- **Do:** Insert a comment line above export type PreloadPlan stating both exports are pure and must not import runtime or Phaser modules

```
// Pure helpers: planPreload and resolveTextureKey must stay free of I/O and Phaser imports.
```

- **Expected:** File has the comment, exports and logic unchanged

## Acceptance criteria
- Given planPreload.ts, when imported, then planPreload and resolveTextureKey are named exports
- Given the file, when read, then it imports only types and performs no I/O

## Definition of done
- Comment added, behavior unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-518.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-105
- Requirement: REQ-259
- Unit (Act): UNIT-518
- Unit (Verify): UNIT-521
- Status: completed
- Change: UPDATE
