# UNIT-291 — Verify: GameLayout stack usage unit tests

## Summary
Unit tests for Button, icon and drawer state in GameLayout

## Description
Test GameLayout renders the icon and keeps drawer behavior and that package.json lists the stack.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layoutStack.test.tsx` · `new: it('toggle renders Lucide icon and flips drawer-open')` · new
- **Do:** Render <GameLayout scene={<div/>} story={<div/>}/>; get button name 'Story'; assert toggle.querySelector('svg') not null; fireEvent.click(toggle); assert container.querySelector('aside') has class 'drawer-open' and toggle aria-expanded 'true'
- **Run:** `cd game/frontend && npx vitest run tests/layoutStack.test.tsx -t 'toggle renders'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/layoutStack.test.tsx` · `it('package.json lists the UI stack')` · new
- **Do:** Read package.json with readFileSync(join(process.cwd(),'package.json')), JSON.parse, assert dependencies has keys lucide-react, motion, clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot, @radix-ui/react-dialog and devDependencies has tailwindcss, postcss, autoprefixer
- **Run:** `cd game/frontend && npx vitest run tests/layoutStack.test.tsx -t 'package.json'`
- **Expected:** Test passes

## Acceptance criteria
- Given render, then toggle contains svg
- Given package.json, then stack deps listed

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-291.md`

## Links
- Evidence: EVD-057
- Requirement: REQ-145
- Unit (Act): UNIT-288
- Unit (Verify): UNIT-291
- Status: completed
- Change: UPDATE
