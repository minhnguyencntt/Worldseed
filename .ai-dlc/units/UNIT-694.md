# UNIT-694 — Act: Add test ids to the blank and over-limit validation alerts

## Summary
Add data-testid to two validation paragraphs

## Description
Add data-testid contribution-validation-blank and contribution-validation-limit to the validation paragraphs.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (blank alert)` · L148
- **Do:** Add data-testid="contribution-validation-blank" to <p id="contribution-idea-error">.

```
<p id="contribution-idea-error" role="alert" data-testid="contribution-validation-blank">
```

- **Expected:** Blank message queryable

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (limit alert)` · L149
- **Do:** Add data-testid="contribution-validation-limit" to <p id="contribution-idea-limit">.

```
<p id="contribution-idea-limit" role="alert" data-testid="contribution-validation-limit">
```

- **Expected:** Limit message queryable

## Acceptance criteria
- Blank alert has contribution-validation-blank
- Limit alert has contribution-validation-limit

## Definition of done
- Attributes present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-694.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-140
- Requirement: REQ-348
- Unit (Act): UNIT-694
- Unit (Verify): UNIT-698
- Status: approved
- Change: UPDATE
