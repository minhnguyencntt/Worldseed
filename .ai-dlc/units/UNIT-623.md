# UNIT-623 — Verify: Radix dialog open, Escape and focus behavior unit tests

## Summary
Unit tests for dialog semantics and keyboard/focus

## Description
Test the Radix dialog shell with fetch mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionDialog.test.tsx` · `new: contributionDialog suite` · new
- **Do:** Create the test file with `// @vitest-environment jsdom`. Stub fetch to return the JSON of an empty array (history route mirrors listMine in src/api/client.ts; payload entries come from contributionFixture in tests/fixtures/api.ts, mirroring contributionJSON in backend/internal/contribution/handler.go). Test 'exposes a named dialog': render a harness with a trigger button that toggles ContributionSheet open; click it; assert screen.getByRole('dialog', {name: 'Suggest What Happens Next'}) is present and window.location.pathname is unchanged.
- **Run:** `cd game/frontend && npx vitest run tests/contributionDialog.test.tsx -t "named dialog"`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/contributionDialog.test.tsx` · `test: escape closes` · new
- **Do:** With the harness open and onClose a vi.fn, fire keyDown Escape on the dialog; assert onClose called once.
- **Run:** `cd game/frontend && npx vitest run tests/contributionDialog.test.tsx -t "escape"`
- **Expected:** onClose called once

### Step 3 — `game/frontend/tests/contributionDialog.test.tsx` · `test: focus management` · new
- **Do:** Focus the trigger, click it, assert document.activeElement is inside the dialog (dialog.contains), then close via the Close button and assert document.activeElement is the trigger button (await waitFor).
- **Run:** `cd game/frontend && npx vitest run tests/contributionDialog.test.tsx -t "focus"`
- **Expected:** Focus enters dialog and returns to trigger

## Acceptance criteria
- Dialog role and name asserted
- Escape calls onClose
- Focus enters dialog and returns to trigger

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-623.md`

## Links
- Evidence: EVD-125
- Requirement: REQ-310
- Unit (Act): UNIT-620
- Unit (Verify): UNIT-623
- Status: approved
- Change: UPDATE
