# UNIT-695 — Act: Add a test id to the contribution Close button

## Summary
Add data-testid to the Close button

## Description
Add data-testid=contribution-close to the Close button in ContributionSheet.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (Close button)` · L169-L171
- **Do:** Add data-testid="contribution-close" to the <button type="button" onClick={onClose}> element.

```
<button type="button" onClick={onClose} data-testid="contribution-close">
```

- **Expected:** Close button queryable by test id

## Acceptance criteria
- Close button renders data-testid contribution-close
- Its onClick still calls onClose

## Definition of done
- Attribute present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-695.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-140
- Requirement: REQ-349
- Unit (Act): UNIT-695
- Unit (Verify): UNIT-699
- Status: approved
- Change: UPDATE
