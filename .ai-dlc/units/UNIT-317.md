# UNIT-317 — Verify: Store-driven drawer and legacy CSS removal unit tests

## Summary
Update layout tests for store-driven drawer and no legacy CSS

## Description
Rewrite the legacy-class assertions in tests/layout.test.tsx and tests/layoutStack.test.tsx to the store-driven drawer with data-state, and assert the legacy CSS is absent. Real useUiStore is used, reset in beforeEach.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `describe 'GameLayout drawer toggle and styles'` · L10-L82
- **Do:** Add beforeEach calling useUiStore.setState({drawerOpen:false}). Rewrite the toggle test to also assert useUiStore.getState().drawerOpen true then false and aside data-state 'open' then 'closed'. Replace the stylesheet test with one asserting css does not contain '.game-layout', '.story-panel', '.scene-area' or '@media (max-width: 768px)' but contains '.contribution-sheet'. Replace '.story-panel' and 'drawer-open' selectors with 'aside' and [data-state="open"]; keep the story-content assertions.

```
expect(css).not.toContain('.story-panel');
expect(container.querySelectorAll('aside')).toHaveLength(1);
```

- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** All tests in layout.test.tsx pass.

### Step 2 — `game/frontend/tests/layoutStack.test.tsx` · `it 'toggle renders Lucide icon and flips drawer-open'` · L12-L31
- **Do:** Replace expect(aside).toHaveClass('drawer-open') with expect(aside).toHaveAttribute('data-state','open'); add a check that the scene <main> has class pb-12 while the scene content stays in the document; add beforeEach resetting useUiStore drawerOpen to false.
- **Run:** `cd game/frontend && npx vitest run tests/layoutStack.test.tsx`
- **Expected:** Tests pass.

## Acceptance criteria
- Drawer toggles via store, aria-expanded and data-state.
- Legacy CSS absent, contribution-sheet kept.
- Single aside and story-content root.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-317.md`

## Links
- Evidence: EVD-063
- Requirement: REQ-158
- Unit (Act): UNIT-315
- Unit (Verify): UNIT-317
- Status: completed
- Change: UPDATE
