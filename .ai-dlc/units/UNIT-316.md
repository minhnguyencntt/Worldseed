# UNIT-316 — Verify: GameLayout desktop Tailwind classes and overflow rules unit tests

## Summary
Unit tests asserting desktop classes and overflow stylesheet rules

## Description
Write tests from REQ-1 asserting the Tailwind desktop classes on GameLayout and the overflow rules in styles.css. No browser or server is used.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layoutDesktop.test.tsx` · `new: GameLayout desktop classes` · new
- **Do:** Add test 'root grid classes': render GameLayout with scene <div/> and story <div/>, assert container.firstElementChild has classes grid, h-screen, overflow-hidden, md:grid-cols-[4fr_1fr]; assert the aside has overflow-y-auto and md:h-screen and the main has min-w-0.

```
expect(container.firstElementChild).toHaveClass('grid','h-screen','overflow-hidden','md:grid-cols-[4fr_1fr]');
```

- **Run:** `cd game/frontend && npx vitest run tests/layoutDesktop.test.tsx -t 'root grid classes'`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/layoutDesktop.test.tsx` · `new: stylesheet overflow rule` · new
- **Do:** Add test 'stylesheet overflow rule': read src/styles.css via readFileSync(join(process.cwd(),'src','styles.css')) and assert it matches /html,\s*body,\s*#root\s*\{[^}]*height:\s*100%[^}]*overflow:\s*hidden/.
- **Run:** `cd game/frontend && npx vitest run tests/layoutDesktop.test.tsx -t 'stylesheet overflow rule'`
- **Expected:** Test passes.

## Acceptance criteria
- Root, aside and main classes asserted.
- Stylesheet html/body/#root rule asserted.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-316.md`

## Links
- Evidence: EVD-063
- Requirement: REQ-157
- Unit (Act): UNIT-314
- Unit (Verify): UNIT-316
- Status: completed
- Change: UPDATE
