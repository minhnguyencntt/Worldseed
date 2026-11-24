# UNIT-607 — Verify: BootScene character spawn, fallback and shutdown unit tests

## Summary
Add BootScene tests for no characters, no interact fallback and shutdown destroy.

## Description
Extend game/frontend/tests/bootSceneCharacters.test.ts with Phaser mocked. The Scene fake exposes events.once as a vi.fn so the shutdown callback can be captured and invoked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('destroys character sprites on shutdown')` · after L197
- **Do:** Create BootScene, call create(), find the call in boot.events.once whose first arg is 'shutdown', invoke its second arg, and assert the sprite destroy spy was called once.

```
const cb = (boot.events.once as any).mock.calls.find((c: unknown[]) => c[0] === 'shutdown')[1]; cb(); expect(sprite.destroy).toHaveBeenCalledTimes(1);
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts -t "shutdown"`
- **Expected:** Test passes; it fails if the shutdown destroy loop is removed.

### Step 2 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('creates no sprite when the scene has no characters')` · after L197
- **Do:** Set scene.characters to [] before new BootScene().create(), assert boot.add.sprite was not called, then restore the original array in finally.

```
expect(boot.add.sprite).not.toHaveBeenCalled();
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts -t "no characters"`
- **Expected:** Test passes; it fails if create ignores scene.characters.

### Step 3 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('only emits characterClick when the character has no interact animation')` · after L197
- **Do:** Delete animations.interact from the mocked scene character, create the scene, fire pointerdown via pointerDownOn, assert emit called with characterClick {id:'boy'} and play not called after mockClear; restore in finally.

```
expect(play).not.toHaveBeenCalled();
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- No sprite for an empty character list
- Shutdown destroys sprites
- Click without interact animation only emits characterClick

## Definition of done
- Tests pass and fail if the BootScene code is removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-607.md`

## Links
- Evidence: EVD-122
- Requirement: REQ-303
- Unit (Act): UNIT-604
- Unit (Verify): UNIT-607
- Status: completed
- Change: UPDATE
