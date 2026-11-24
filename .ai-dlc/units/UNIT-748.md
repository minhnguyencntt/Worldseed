# UNIT-748 — Verify: BootScene plays character animation on playAnimation unit tests

## Summary
Unit tests for playAnimation dispatch with Phaser mocked

## Description
Test that playAnimation drives sprite.play for known targets and is ignored for unknown targets.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScenePlayAnimation.test.ts` · `new: describe('BootScene playAnimation')` · new
- **Do:** Copy the phaser and content vi.mock setup from tests/bootSceneCharacters.test.ts; capture the sprite returned by scene.add.sprite; call create(); then reactToPhaser.emit('playAnimation', {target:'boy', name:'interact'}) and assert sprite.play was last called with 'boy-sheet:interact' style key from the mocked manifest; emit name 'idle' and assert idle key; emit target 'ghost' and assert play call count unchanged. Reset with reactToPhaser.clear() in beforeEach.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePlayAnimation.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- interact and idle emit tests assert play keys
- Unknown target test asserts no extra play

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-748.md`

## Links
- Evidence: EVD-151
- Requirement: REQ-373
- Unit (Act): UNIT-746
- Unit (Verify): UNIT-748
- Status: completed
- Change: UPDATE
