# UNIT-605 — Verify: characterSchema defaults and rejection unit tests

## Summary
Add tests that fail when characterSchema defaults or rejection rules are removed.

## Description
Extend game/tests/characterSchema.test.ts with tests using the real characterSchema and in-memory input.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/characterSchema.test.ts` · `new: describe('characterSchema defaults')` · after L65
- **Do:** Add test 'applies default scale and layer': parse baseCharacter() and assert result.scale is 1 and result.layer is 'characters'.

```
expect(result.scale).toBe(1); expect(result.layer).toBe('characters');
```

- **Run:** `cd game && npx vitest run tests/characterSchema.test.ts -t "default scale and layer"`
- **Expected:** Test passes; it fails if the defaults are removed from characterSchema.

### Step 2 — `game/tests/characterSchema.test.ts` · `new: describe('characterSchema rejects invalid base fields')` · after L65
- **Do:** Add test 'throws when animations.idle is missing' using baseCharacter({ animations: {} }) and test 'throws when scale is 0 and when scale is -1'; each expects characterSchema.parse to throw.

```
expect(() => characterSchema.parse(baseCharacter({ animations: {} }))).toThrow();
```

- **Run:** `cd game && npx vitest run tests/characterSchema.test.ts`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- Default scale and layer are asserted
- Missing idle and non-positive scale throw

## Definition of done
- New tests pass and fail if the schema rule is removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-605.md`

## Links
- Evidence: EVD-122
- Requirement: REQ-301
- Unit (Act): UNIT-602
- Unit (Verify): UNIT-605
- Status: completed
- Change: UPDATE
