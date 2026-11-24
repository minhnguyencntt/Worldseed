# UNIT-290 — Verify: cn helper and Button unit tests

## Summary
Unit tests for cn and Button

## Description
Test cn merging and Button variants/asChild with jsdom only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/ui.test.tsx` · `new: describe('cn')` · new
- **Do:** Add tests: cn('px-2','px-4') toBe 'px-4'; cn('a', false && 'b', 'c') toBe 'a c'. Import cn from ../src/lib/utils
- **Run:** `cd game/frontend && npx vitest run tests/ui.test.tsx -t 'cn'`
- **Expected:** Both tests pass

### Step 2 — `game/frontend/tests/ui.test.tsx` · `describe('Button')` · new
- **Do:** Add tests: render <Button>Go</Button> and assert role button 'Go' has class bg-primary; render <Button asChild><a href='/x'>Link</a></Button> and assert getByRole('link') has class 'inline-flex' and no button role exists
- **Run:** `cd game/frontend && npx vitest run tests/ui.test.tsx -t 'Button'`
- **Expected:** Both tests pass

## Acceptance criteria
- Given conflicting classes, when cn runs, then last wins
- Given asChild, when rendered, then child element is used

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-290.md`

## Links
- Evidence: EVD-057
- Requirement: REQ-144
- Unit (Act): UNIT-287
- Unit (Verify): UNIT-290
- Status: completed
- Change: UPDATE
