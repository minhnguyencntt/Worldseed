# UNIT-606 — Verify: validateWorld scene character path and count unit tests

## Summary
Add tests for index path, absent characters and single error count.

## Description
Extend the 'validateWorld scene characters' describe in game/tests/validator.test.ts using the real validateWorld.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/validator.test.ts` · `describe('validateWorld scene characters')` · after L123
- **Do:** Add test 'tags the index of the second unknown character': scene.characters = [boy, ghost]; assert errors toContain 'scenes[bedroom].characters[1].id: unknown character ghost' and toHaveLength(1).

```
expect(errors).toEqual(['scenes[bedroom].characters[1].id: unknown character ghost']);
```

- **Run:** `cd game && npx vitest run tests/validator.test.ts -t "second unknown character"`
- **Expected:** Test passes; it fails if the check is deleted.

### Step 2 — `game/tests/validator.test.ts` · `describe('validateWorld scene characters')` · after L123
- **Do:** Add test 'reports no character error when scene.characters is undefined': validateWorld({ ...validWorld, scenes: [validScene] }) and assert no error contains 'characters['.

```
expect(errors.filter((e) => e.includes('characters['))).toEqual([]);
```

- **Run:** `cd game && npx vitest run tests/validator.test.ts`
- **Expected:** All validator tests pass.

## Acceptance criteria
- Index 1 path asserted
- Undefined characters gives no error
- Exactly one error for one unknown id

## Definition of done
- Tests pass and fail if the check is removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-606.md`

## Links
- Evidence: EVD-122
- Requirement: REQ-302
- Unit (Act): UNIT-603
- Unit (Verify): UNIT-606
- Status: completed
- Change: UPDATE
