# UNIT-582 — Verify: Character schema, animation resolver and preload unit tests

## Summary
Unit tests for characters

## Description
Test schema, resolver, planPreload and BootScene with Phaser mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/characterAnimation.test.ts` · `new: describe resolveCharacterAnimation and sceneSchema characters` · new
- **Do:** Add tests: walk resolves to {asset: character:boy-walk, animation: walk}; interact resolves to boy-interact; spec lacking walk returns idle; unknown asset returns idle; sceneSchema.parse accepts the boy; parse without animations.idle throws a ZodError whose issue path includes characters.0.animations.idle; planPreload load includes all three boy asset ids once. Build the manifest from game/public/assets/worlds/the-boys-room/manifest.json via parseManifest.
- **Run:** `cd game && npx vitest run tests/characterAnimation.test.ts`
- **Expected:** All tests pass

### Step 2 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: BootScene character wiring` · new
- **Do:** Following bootScene.test.ts mocking, mock phaser Scene with fake add.sprite and anims.create spies; run create(); assert one sprite per scene.characters entry played with key character:boy:idle; emit phaserToReact objectClick and assert play called with character:boy-interact:interact.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Resolver returns manifest animation or idle
- Schema validates characters
- BootScene plays idle then interact with mocked Phaser

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-582.md`

## Links
- Evidence: EVD-116
- Requirement: REQ-289
- Unit (Act): UNIT-578
- Unit (Verify): UNIT-582
- Status: completed
- Change: UPDATE
