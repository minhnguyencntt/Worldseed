# UNIT-639 — Act: Clear the blank-text message on typing and valid submit

## Summary
Reset validation state in onChange and at valid submit

## Description
Clear the validation message when the player edits the text or submits a valid idea.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet textarea onChange` · L105
- **Do:** Change the onChange handler so it also calls setValidation(undefined) in addition to setText(e.target.value).

```
onChange={(e) => setText(e.target.value)}  ->  onChange={(e) => { setText(e.target.value); setValidation(undefined); }}
```

- **Expected:** Typing a character removes the alert.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet::handleSubmit` · L71-L74
- **Do:** After the blank branch, next to the existing setError(undefined) call, add setValidation(undefined) so a valid submit never leaves the blank message.

```
setError(undefined);  ->  setError(undefined);
setValidation(undefined);
```

- **Expected:** A valid submit after a blank attempt leaves no 'Enter an idea first' alert.

## Acceptance criteria
- Typing removes the alert
- Valid submit leaves no blank-text alert

## Definition of done
- onChange clears validation
- Valid submit clears validation
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-639.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-128
- Requirement: REQ-320
- Unit (Act): UNIT-639
- Unit (Verify): UNIT-641
- Status: completed
- Change: UPDATE
