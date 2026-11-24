# UNIT-282 — Verify: UI stack configuration and cn helper unit tests

## Summary
Unit tests for deps, Tailwind content globs, directives and cn

## Description
Prove the stack configuration with file-reading unit tests and a cn test; no network or build is run.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStack.test.ts` · `new: describe('UI stack config')` · new
- **Do:** Add test 'declares UI dependencies' that parses package.json and asserts each of zustand, motion, lucide-react, @radix-ui/react-dialog, tailwind-merge, clsx is in dependencies and tailwindcss is in devDependencies
- **Run:** `npx vitest run tests/uiStack.test.ts -t 'declares UI dependencies'`
- **Expected:** test passes

### Step 2 — `game/frontend/tests/uiStack.test.ts` · `it('tailwind scans src and directives present')` · new
- **Do:** Import default from ../tailwind.config and assert content contains './index.html' and './src/**/*.{ts,tsx}'; read src/styles.css and assert it contains '@tailwind base', '@tailwind components', '@tailwind utilities'
- **Run:** `npx vitest run tests/uiStack.test.ts -t 'tailwind scans'`
- **Expected:** test passes

### Step 3 — `game/frontend/tests/uiStack.test.ts` · `it('cn merges classes')` · new
- **Do:** Import cn from ../src/lib/utils; assert cn('a', false, 'b') === 'a b' and cn('p-2','p-4') === 'p-4'
- **Run:** `npx vitest run tests/uiStack.test.ts -t 'cn merges'`
- **Expected:** test passes

## Acceptance criteria
- Dependency declarations are asserted
- Tailwind content globs are asserted
- cn merges and drops falsy values

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-282.md`

## Links
- Evidence: EVD-056
- Requirement: REQ-139
- Unit (Act): UNIT-278
- Unit (Verify): UNIT-282
- Status: completed
- Change: UPDATE
