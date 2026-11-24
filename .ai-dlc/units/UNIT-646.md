# UNIT-646 — Act: Render the zero-quota inline message in ContributionSheet

## Summary
Add quota message element to ContributionSheet

## Description
Add a QUOTA_MESSAGE constant and render it as an alert paragraph when remaining <= 0, in game/frontend/src/components/ContributionSheet.tsx.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `QUOTA_MESSAGE` · after L26
- **Do:** Add a module constant QUOTA_MESSAGE holding the exact message text next to BLANK_MESSAGE.

```
const QUOTA_MESSAGE = 'You have used all your suggestions this round';
```

- **Expected:** Constant exists and is used by the component.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet` · L130-L131
- **Do:** After the overLimit alert paragraph add a paragraph with id contribution-idea-quota and role alert, rendered only when `remaining <= 0`, containing QUOTA_MESSAGE.

```
{remaining <= 0 && <p id="contribution-idea-quota" role="alert">{QUOTA_MESSAGE}</p>}
```

- **Expected:** With 5 sent entries the message is in the DOM; with fewer it is not.

## Acceptance criteria
- The paragraph with text 'You have used all your suggestions this round' renders when remaining <= 0
- The paragraph is absent when remaining > 0

## Definition of done
- Message renders only at zero quota
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-646.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-130
- Requirement: REQ-323
- Unit (Act): UNIT-646
- Unit (Verify): UNIT-648
- Status: approved
- Change: UPDATE
