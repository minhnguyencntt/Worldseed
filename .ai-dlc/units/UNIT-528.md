# UNIT-528 — Verify: BootScene builds objects from content with none hardcoded

## Summary
Unit tests for buildScene wiring, cleanup and no-hardcode guard

## Description
Mock buildScene and the render context; assert BootScene wiring and scan source text for hardcoded ids.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneBuild.test.ts` · `new: BootScene build wiring` · new
- **Do:** Mock 'phaser' (Scene with events.once = vi.fn, Scenes.Events.SHUTDOWN), '@game/engine/buildScene' (buildScene: vi.fn returning two fake objects with destroy vi.fn and onInteract/sync vi.fn), '@game/engine/buildEffects', '@game/engine/playSceneTransition', '../src/phaser/renderContext'. Call new BootScene().create(); assert buildScene called once with (ctx, sceneSpec imported from '../src/runtime/content'). Capture the SHUTDOWN callback from events.once.mock.calls and invoke it; assert each fake object's destroy was called once.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneBuild.test.ts -t 'build wiring'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/bootSceneBuild.test.ts` · `new: no hardcoded objects` · new
- **Do:** Read BootScene.ts and renderContext.ts via node:fs readFileSync; for every object id and asset id in sceneSpec.objects assert the source text does not contain the quoted id string.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneBuild.test.ts -t 'no hardcoded'`
- **Expected:** Test passes

## Acceptance criteria
- buildScene called once with sceneSpec
- Shutdown destroys objects
- No object or asset id literal in BootScene.ts or renderContext.ts

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-528.md`

## Links
- Evidence: EVD-106
- Requirement: REQ-263
- Unit (Act): UNIT-525
- Unit (Verify): UNIT-528
- Status: completed
- Change: UPDATE
