# UNIT-358 — Verify: Relocated the-boys-room content and loader validation unit tests

## Summary
Update content/layout/loader tests

## Description
Prove R2 with unit tests; update existing path assertions and temp-dir fixtures to include the new required fields.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/content.test.ts` · `WORLD_DIR and bedroom tests` · L8-L50
- **Do:** Change WORLD_DIR to resolve(__dirname, '../src/content/worlds/the-boys-room'); add test asserting loadWorld(WORLD_DIR).scenes[0].objects has length 6 and every object has a layer and position.
- **Run:** `cd game && npx vitest run tests/content.test.ts`
- **Expected:** Tests pass

### Step 2 — `game/tests/layout.test.ts` · `layout and load tests` · L10-L25
- **Do:** Change paths to src/content/worlds/the-boys-room/world.yaml and add expect(existsSync(join(gameDir,'content'))).toBe(false).
- **Run:** `cd game && npx vitest run tests/layout.test.ts`
- **Expected:** Tests pass

### Step 3 — `game/tests/loader.test.ts` · `temp-dir scene fixtures; new test 'rejects object without position'` · L7-L60
- **Do:** Add position {x:0,y:0}, asset and layer 'objects' to any object in temp scene fixtures; add a test writing a scene whose object lacks position and asserting loadWorld throws a message containing 'position'.
- **Run:** `cd game && npx vitest run tests/loader.test.ts`
- **Expected:** Tests pass

## Acceptance criteria
- New path loads six objects with layer and position
- Missing position throws
- Old content dir absent

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-358.md`

## Links
- Evidence: EVD-070
- Requirement: REQ-178
- Unit (Act): UNIT-355
- Unit (Verify): UNIT-358
- Status: completed
- Change: UPDATE
