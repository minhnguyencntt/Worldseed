# UNIT-878 — Verify: GameLayout centered story dialog unit tests

## Summary
New layout tests plus replacement of obsolete sidebar tests.

## Description
Write tests/layoutDialog.test.tsx and update tests that assert the aside or Story toggle.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layoutDialog.test.tsx` · `new: GameLayout centered dialog` · new
- **Do:** Add test rendering <GameLayout header={<i data-testid='h'/>} scene={<div data-testid='scene'/>} story={<p>Hello</p>}/>; expect container.querySelector('aside') toBeNull, queryByRole('button',{name:'Story'}) toBeNull, getByTestId('story-dialog') toHaveClass('sf-dialog') and toHaveTextContent('Hello'), and getByTestId('scene') in the document.
- **Run:** `cd game/frontend && npx vitest run tests/layoutDialog.test.tsx`
- **Expected:** The test passes.

### Step 2 — `game/frontend/tests/layout.test.tsx` · `obsolete drawer/aside tests` · L11-L90
- **Do:** Delete the tests asserting the Story toggle, aside data-state and drawerOpen, and in layoutSplit.test.tsx, layoutStack.test.tsx and layoutDesktop.test.tsx remove the assertions on aside, grid-cols 3fr/1fr, max-md drawer classes and the Story button; also delete the Story button expectation at app.test.tsx L61.
- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx tests/layoutSplit.test.tsx tests/layoutStack.test.tsx tests/layoutDesktop.test.tsx tests/app.test.tsx`
- **Expected:** All of these files pass with no sidebar assertions.

## Acceptance criteria
- No aside and no Story button
- story-dialog contains the story node and the scene node stays mounted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-878.md`

## Links
- Evidence: EVD-174
- Requirement: REQ-438
- Unit (Act): UNIT-874
- Unit (Verify): UNIT-878
- Status: approved
- Change: UPDATE
