# UNIT-563 — Verify: Fallback test types the particles mock

## Summary
Type the vi.fn call signature in bootSceneFallback

## Description
Type the particles mock so calls[0][2] compiles.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFallback.test.ts` · `particles mock declaration` · near L60-L89
- **Do:** Change the particles vi.fn() declaration to vi.fn<(...args: unknown[]) => unknown>() so index 2 compiles.

```
vi.fn() -> vi.fn<(...args: unknown[]) => unknown>()
```

- **Run:** `npx vitest run tests/bootSceneFallback.test.ts`
- **Expected:** Test passes: calls[0][2] equals FALLBACK

## Acceptance criteria
- No TS2493 error is reported at the calls[0][2] read
- Asserts FALLBACK third argument and setDepth(3)

## Definition of done
- Suite passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-563.md`

## Links
- Evidence: EVD-112
- Requirement: REQ-281
- Unit (Act): UNIT-560
- Unit (Verify): UNIT-563
- Status: completed
- Change: UPDATE
