# UNIT-052 — Verify: Remount restores saved state unit tests

## Summary
Unit tests for remount restore using mocked storage

## Description
Add tests asserting that state written to the mocked storage is restored on remount and that null saved state starts fresh.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appFlow.test.tsx` · `it('restores saved state after remount')` · after the story describe
- **Do:** Render <App/>, click Begin, Bookshelf, Search; call unmount() from the render result; render <App/> again and click Begin; assert history toHaveTextContent('A hidden door swings open behind the books.'), button 'Bookshelf' toHaveAttribute('data-open','true'), and region 'Inventory' is in the document.
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'remount'`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/appFlow.test.tsx` · `it('starts fresh when nothing is saved')` · after the restore test
- **Do:** With saved = null, call begin(); assert region 'Dialogue' toHaveTextContent("I don't know what to do next. What should we do?") and Bookshelf data-open is 'false'.
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'remount|fresh'`
- **Expected:** Both tests pass.

## Acceptance criteria
- Given Search performed, when App unmounted, remounted and Begin clicked, then history has the hidden door text and Bookshelf data-open is true
- Given readSaved returns null, when App begins, then the Dialogue region shows the opening text

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-052.md`

## Links
- Evidence: EVD-010
- Requirement: REQ-026
- Unit (Act): UNIT-049
- Unit (Verify): UNIT-052
- Status: completed
- Change: UPDATE
