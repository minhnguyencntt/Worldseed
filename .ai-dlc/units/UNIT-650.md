# UNIT-650 — Act: Render the zero-quota inline message in ContributionSheet

## Summary
Add inline alert when remaining is 0

## Description
Add a conditional paragraph in ContributionSheet JSX showing the zero-quota message when remaining <= 0.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (return JSX)` · after L131
- **Do:** Insert a conditional paragraph after the over-limit alert line that renders when remaining <= 0, with id 'contribution-idea-quota' and role 'alert'

```
{remaining <= 0 && <p id="contribution-idea-quota" role="alert">You have used all your suggestions this round</p>}
```

- **Expected:** With 5 sent entries the sheet shows 'You have used all your suggestions this round'; with fewer it does not

## Acceptance criteria
- At remaining 0 the paragraph with role alert shows the exact message
- At remaining above 0 no such element renders

## Definition of done
- Message renders only at remaining 0
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-650.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-131
- Requirement: REQ-325
- Unit (Act): UNIT-650
- Unit (Verify): UNIT-652
- Status: completed
- Change: NEW
