# UNIT-867 — Verify: placeholder styling removed unit tests

## Summary
Test CSS and dialog classes

## Description
Read styles.css from disk and render the dialog.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `stylesheet test` · L47-L56
- **Do:** Change the last assertion expect(css).toContain('.contribution-sheet') to expect(css).not.toContain('.contribution-sheet').

```
toContain -> not.toContain
```

- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** Stylesheet test passes

### Step 2 — `game/frontend/tests/noPlaceholderStyles.test.tsx` · `new: dialog uses kit class` · new
- **Do:** Render ContributionSheet open=true with the client mocked as tests/contributionDialog.test.tsx does; assert screen.getByRole('dialog') has class sf-frame-parchment and not contribution-sheet.
- **Run:** `cd game/frontend && npx vitest run tests/noPlaceholderStyles.test.tsx`
- **Expected:** Dialog class assertions pass

## Acceptance criteria
- Given styles.css, then it does not contain contribution-sheet
- Given the open dialog, then its content has class sf-frame-parchment

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-867.md`

## Links
- Evidence: EVD-172
- Requirement: REQ-433
- Unit (Act): UNIT-862
- Unit (Verify): UNIT-867
- Status: completed
- Change: UPDATE
