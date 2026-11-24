# UNIT-029 — Act: Move backend/game to top-level game/

## Summary
git mv the runtime module to game/

## Description
Context: backend/game holds the full TypeScript runtime. Desired behavior: move it wholesale so relative imports stay valid. Expected result: game/ contains every former file and backend/game is gone. Why: top-level module layout.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/package.json` · `new: game module (moved from backend/game/package.json)` · new
- **Do:** From the repo root run git mv backend/game game so every tracked file (src, content, tests, package.json, package-lock.json, tsconfig.json, vitest.config.ts) moves with its history; do not edit contents because all imports are relative (../src/..., ../content/...).

```
git mv backend/game game
```

- **Expected:** ls game shows src content tests package.json tsconfig.json vitest.config.ts; ls backend shows no game directory

### Step 2 — `backend/game/content/worlds/the-boys-room/world.yaml` · `world.yaml` · new
- **Do:** Confirm the moved world.yaml and scenes/bedroom.yaml are at game/content/worlds/the-boys-room/ unchanged, which is the path content.test.ts resolves via resolve(__dirname, '../content/worlds/the-boys-room').
- **Expected:** git status shows renames (R) only, no content modifications

## Acceptance criteria
- Given the repo root, when running git mv backend/game game, then game/src and game/content exist
- Given the move, when checking backend/game, then it is absent

## Definition of done
- backend/game removed
- game/ populated
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-029.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-006
- Requirement: REQ-015
- Unit (Act): UNIT-029
- Unit (Verify): UNIT-031
- Status: completed
- Change: UPDATE
