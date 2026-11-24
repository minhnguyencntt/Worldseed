# UNIT-634 — Act: Gate ContributionSheet submit on zero remaining quota

## Summary
Disable submit and show message at zero quota

## Description
Use the existing remaining value to disable input and Send and show a clear message.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (quota)` · L64-L69
- **Do:** Add const outOfQuota = remaining <= 0; at the top of handleSubmit add 'if (outOfQuota) return;' before the blank check.

```
const outOfQuota = remaining <= 0;
```

- **Expected:** No submission possible at zero quota

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `textarea, Send and message markup` · L97-L109
- **Do:** Add disabled={outOfQuota} to the textarea; change Send to disabled={isBlank || tooLong || outOfQuota}; render <p role='status'>No contributions left this round</p> when outOfQuota.

```
{outOfQuota && <p role="status">No contributions left this round</p>}
```

- **Expected:** Message shown and controls disabled at zero quota

## Acceptance criteria
- remaining 0 disables Send and textarea and shows the message
- handleSubmit returns early at zero quota

## Definition of done
- No submit at zero quota
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-634.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-127
- Requirement: REQ-318
- Unit (Act): UNIT-634
- Unit (Verify): UNIT-637
- Status: approved
- Change: UPDATE
