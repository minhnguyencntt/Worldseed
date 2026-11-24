# UNIT-574 — Act: Confirm hover, click and fallback paths in SceneObject and BootScene

## Summary
Confirm SceneObject hover/click wiring and BootScene fallback use are exported and importable under @game.

## Description
Read SceneObject constructor/activate, planPreload.ts and BootScene.ts; keep FALLBACK_KEY, planPreload, resolveTextureKey exports intact.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/entities/SceneObject.ts` · `SceneObject constructor / activate` · L29-L41
- **Do:** Confirm the constructor calls handle.onHover and handle.onClick and activate emits objectId and available actions only when visible; change nothing if so
- **Expected:** hover and click wiring present

### Step 2 — `game/src/engine/planPreload.ts` · `resolveTextureKey` · L1-L40
- **Do:** Confirm resolveTextureKey and planPreload are named exports; change nothing if so
- **Expected:** both importable via @game/engine/planPreload

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `FALLBACK_KEY` · L16-L40
- **Do:** Confirm FALLBACK_KEY is a named export and preload generates the fallback texture; change nothing if so
- **Expected:** FALLBACK_KEY exported

## Acceptance criteria
- SceneObject registers onHover and onClick on the handle
- BootScene exports FALLBACK_KEY and resolves unknown ids to it

## Definition of done
- exports confirmed, no behavior change
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-574.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-115
- Requirement: REQ-288
- Unit (Act): UNIT-574
- Unit (Verify): UNIT-577
- Status: completed
- Change: UPDATE
