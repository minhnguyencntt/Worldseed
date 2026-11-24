# UNIT-688 — Act: Add a test id to the history error alert

## Summary
Add data-testid to the history error paragraph

## Description
Edit ContributionSheet.tsx so the history error alert is addressable by test id; Retry button untouched.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (history error paragraph)` · L155
- **Do:** Add data-testid contribution-history-error to the paragraph rendered when historyStatus === 'error'

```
<p role="alert" data-testid="contribution-history-error">{HISTORY_ERROR}</p>
```

- **Expected:** Error paragraph renders with test id contribution-history-error

## Acceptance criteria
- Error paragraph has data-testid contribution-history-error
- Retry button unchanged

## Definition of done
- Attribute added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-688.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-139
- Requirement: REQ-345
- Unit (Act): UNIT-688
- Unit (Verify): UNIT-691
- Status: completed
- Change: UPDATE
