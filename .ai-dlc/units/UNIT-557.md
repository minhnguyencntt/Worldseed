# UNIT-557 — Verify: Fallback tests mock sceneSpec and type the particles mock

## Summary
bootSceneFallback type-checks and passes

## Description
Add sceneSpec to the content mock and type the particles mock signature.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFallback.test.ts` · `vi.mock content and particles mock` · L17-L30, L76
- **Do:** Add sceneSpec: { id: 'bedroom', objects: [] } to the content mock factory; type particles as vi.fn((_x: number, _y: number, _key: string) => emitter)

```
const particles = vi.fn((_x: number, _y: number, _key: string) => emitter);
```

- **Run:** `npx vitest run tests/bootSceneFallback.test.ts`
- **Expected:** All tests pass; calls[0][2] equals FALLBACK

## Acceptance criteria
- Given typed particles mock, When tsc runs, Then no TS2493
- Given the suite, When run, Then it passes

## Definition of done
- Suite passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-557.md`

## Links
- Evidence: EVD-111
- Requirement: REQ-278
- Unit (Act): UNIT-553
- Unit (Verify): UNIT-557
- Status: approved
- Change: UPDATE
