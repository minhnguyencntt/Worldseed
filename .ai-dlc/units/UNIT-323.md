# UNIT-323 — Verify: layout.test.tsx asserts Tailwind layout and header slot

## Summary
Update layout.test.tsx to Tailwind assertions

## Description
Replace the stylesheet-reading test with Tailwind class assertions and add a header slot test.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `it: game stylesheet legacy classes` · L50-L60
- **Do:** Delete this test and the unused readFileSync and join imports. Replace with it('Given GameLayout, when rendered, then root, main and aside carry Tailwind layout classes') asserting container.firstElementChild toHaveClass('grid','h-screen','md:grid-cols-[4fr_1fr]'), main toHaveClass('relative','overflow-hidden'), aside toHaveClass('overflow-y-auto','max-md:fixed').
- **Run:** `npx vitest run tests/layout.test.tsx`
- **Expected:** Test asserts Tailwind classes only

### Step 2 — `game/frontend/tests/layout.test.tsx` · `it: header slot` · after L60
- **Do:** Add test rendering <GameLayout header={<div data-testid="hdr" />} scene={<div data-testid="scene-node" />} story={<div />} />; assert container.querySelector('main') contains getByTestId('hdr') and hdr precedes scene-node (compareDocumentPosition & Node.DOCUMENT_POSITION_FOLLOWING).
- **Run:** `npx vitest run tests/layout.test.tsx`
- **Expected:** All layout.test.tsx tests pass

## Acceptance criteria
- No styles.css read or legacy class strings remain
- Header slot and Tailwind classes asserted

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-323.md`

## Links
- Evidence: EVD-064
- Requirement: REQ-161
- Unit (Act): UNIT-320
- Unit (Verify): UNIT-323
- Status: completed
- Change: UPDATE
