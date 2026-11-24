# UNIT-597 — Verify: BootScene characterClick emission unit tests with Phaser mocked

## Summary
Unit-test that clicking an NPC sprite emits characterClick and still plays interact.

## Description
Extend bootSceneCharacters tests, which already mock phaser and content, to spy on phaserToReact.emit.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('emits characterClick with the spec id and still plays interact on pointerdown')` · after L140
- **Do:** Import phaserToReact from '../src/phaser/events'. Create BootScene, set its readState as existing tests do, call create(), take the first value returned by scene.add.sprite, get its listener via pointerDownOn, vi.spyOn(phaserToReact, 'emit'), invoke the listener, then assert emit was called with ('characterClick', { id: 'boy' }) and sprite.play was called with the interact key.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts`
- **Expected:** bootSceneCharacters suite passes including the new emit test.

## Acceptance criteria
- Given the mocked scene, When pointerdown runs on the boy sprite, Then phaserToReact.emit is called with 'characterClick' and { id: 'boy' }.
- Given the same click, When handled, Then sprite.play is called with the interact key.

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-597.md`

## Links
- Evidence: EVD-119
- Requirement: REQ-298
- Unit (Act): UNIT-595
- Unit (Verify): UNIT-597
- Status: completed
- Change: UPDATE
