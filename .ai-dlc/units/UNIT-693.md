# UNIT-693 — Act: Add a test id to the contribution history list

## Summary
Add data-testid to the suggestions ul

## Description
Add data-testid=contribution-history-list to the ul labelled Your suggestions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (suggestions list)` · L161
- **Do:** Add data-testid="contribution-history-list" to the <ul aria-label="Your suggestions"> element.

```
<ul aria-label="Your suggestions" data-testid="contribution-history-list">
```

- **Expected:** List is queryable by test id

## Acceptance criteria
- The ul renders data-testid contribution-history-list
- The aria-label is unchanged

## Definition of done
- Attribute present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-693.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-140
- Requirement: REQ-347
- Unit (Act): UNIT-693
- Unit (Verify): UNIT-697
- Status: approved
- Change: UPDATE
