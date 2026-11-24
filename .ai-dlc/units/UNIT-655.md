# UNIT-655 — Act: Confirm counter and over-limit guard in ContributionSheet

## Summary
Check the counter paragraph and overLimit guard exist as the tests assert

## Description
Context: length uses Array.from(text.trim()).length and overLimit blocks submit. Expected result: guard, counter and alert present.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet.handleSubmit` · L72-L95
- **Do:** Check the line 'if (overLimit) return;' sits after the blank check and before setEntries/submitContribution; add if absent

```
if (overLimit) return;
```

- **Expected:** Over-limit text never reaches submitContribution

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet counter and limit alert` · L125-L137
- **Do:** Check <p id='contribution-idea-count'> renders `${length} / ${MAX_PROMPT_LENGTH}` and {overLimit && <p id='contribution-idea-limit' role='alert'>} renders `Too long: ${length} / ${MAX_PROMPT_LENGTH}`; add if absent
- **Expected:** Counter and over-limit message texts match the tests

## Acceptance criteria
- handleSubmit returns before submitContribution when overLimit is true
- The counter paragraph id contribution-idea-count renders `${length} / ${MAX_PROMPT_LENGTH}` and the alert id contribution-idea-limit renders when overLimit

## Definition of done
- Guard and texts confirmed present, added only if missing
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-655.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-132
- Requirement: REQ-328
- Unit (Act): UNIT-655
- Unit (Verify): UNIT-658
- Status: approved
- Change: UPDATE
