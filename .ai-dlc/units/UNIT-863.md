# UNIT-863 — Verify: GameLayout wide split and narrow drawer unit tests

## Summary
Assert 3fr/1fr class, narrow drawer classes and toggle

## Description
Update existing layout tests to the new split and cover wide and narrow class sets and the drawer toggle.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layoutDesktop.test.tsx` · `root grid classes test` · L22-L30
- **Do:** Change the expected class md:grid-cols-[4fr_1fr] in toHaveClass to md:grid-cols-[3fr_1fr].

```
'md:grid-cols-[4fr_1fr]' -> 'md:grid-cols-[3fr_1fr]'
```

- **Run:** `cd game/frontend && npx vitest run tests/layoutDesktop.test.tsx`
- **Expected:** Wide-width test passes with 3fr/1fr

### Step 2 — `game/frontend/tests/layoutSplit.test.tsx` · `new: narrow drawer classes and toggle` · new
- **Do:** Add a test rendering GameLayout with scene and story nodes; assert the aside has classes max-md:fixed, max-md:bottom-0 and data-state closed, click the Story button, assert data-state open and useUiStore.getState().drawerOpen is true, reset store in beforeEach.
- **Run:** `cd game/frontend && npx vitest run tests/layoutSplit.test.tsx`
- **Expected:** Narrow and toggle assertions pass

## Acceptance criteria
- Given a wide layout, when rendered, then md:grid-cols-[3fr_1fr] is present
- Given the narrow classes, when inspected, then the aside has max-md:fixed and data-state toggles with the store

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-863.md`

## Links
- Evidence: EVD-172
- Requirement: REQ-429
- Unit (Act): UNIT-858
- Unit (Verify): UNIT-863
- Status: completed
- Change: UPDATE
