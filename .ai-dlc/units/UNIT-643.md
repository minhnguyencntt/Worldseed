# UNIT-643 — Act: Block over-limit submit with an inline message

## Summary
Add over-limit state, message and guard to ContributionSheet

## Description
Derive overLimit from the trimmed length, render an inline alert, mark the textarea invalid and return early from handleSubmit.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (derived value)` · after the length const added by the counter unit
- **Do:** Add const overLimit = length > MAX_PROMPT_LENGTH;

```
const overLimit = length > MAX_PROMPT_LENGTH;
```

- **Expected:** overLimit is true only above 500 trimmed characters

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L69-L78
- **Do:** After the blank check (prompt === '') add an early return when overLimit so text, entries and error are untouched

```
if (overLimit) return;
```

- **Expected:** submitContribution is never called while over the limit

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `textarea JSX and message` · L112-L128
- **Do:** Set aria-invalid={validation !== undefined || overLimit}; add 'contribution-idea-limit' to aria-describedby when overLimit; after the form render {overLimit && <p id="contribution-idea-limit" role="alert">{`Too long: ${length} / ${MAX_PROMPT_LENGTH}`}</p>}

```
{overLimit && <p id="contribution-idea-limit" role="alert">{`Too long: ${length} / ${MAX_PROMPT_LENGTH}`}</p>}
```

- **Expected:** Message appears at 501 characters and disappears at 500

## Acceptance criteria
- Message 'Too long: n / 500' shows when over
- submitContribution not called when over

## Definition of done
- Over-limit blocked with message
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-643.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-129
- Requirement: REQ-322
- Unit (Act): UNIT-643
- Unit (Verify): UNIT-645
- Status: completed
- Change: UPDATE
