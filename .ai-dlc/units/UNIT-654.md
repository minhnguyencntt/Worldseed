# UNIT-654 — Act: Confirm blank-text guard in ContributionSheet handleSubmit

## Summary
Check the blank guard exposes the message and aria wiring the tests assert

## Description
Context: ContributionSheet.handleSubmit already trims and rejects blank text. Desired behavior: no product change unless the guard or its aria wiring is missing. Expected result: the guard, BLANK_MESSAGE and aria attributes are present.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet.handleSubmit` · L72-L95
- **Do:** Check that after remaining<=0 return, prompt=text.trim() and prompt==='' calls setValidation(BLANK_MESSAGE) then returns before submitContribution; add it only if absent

```
if (prompt === '') { setValidation(BLANK_MESSAGE); return; }
```

- **Expected:** Blank text never reaches submitContribution

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet textarea and error paragraph` · L113-L140
- **Do:** Check textarea has aria-invalid when validation is defined, aria-describedby='contribution-idea-error', and <p id='contribution-idea-error' role='alert'> renders validation; add only if absent
- **Expected:** Alert id equals the textarea aria-describedby value after a blank submit

## Acceptance criteria
- handleSubmit sets validation to BLANK_MESSAGE and returns before submitContribution when the trimmed text is empty
- The textarea sets aria-invalid and aria-describedby pointing at contribution-idea-error while validation is set

## Definition of done
- Guard and aria wiring confirmed present, adding them only if missing
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-654.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-132
- Requirement: REQ-327
- Unit (Act): UNIT-654
- Unit (Verify): UNIT-657
- Status: approved
- Change: UPDATE
