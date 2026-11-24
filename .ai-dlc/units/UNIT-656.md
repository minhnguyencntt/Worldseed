# UNIT-656 — Act: Confirm zero-quota gating in ContributionSheet

## Summary
Check disabled Send, quota message and handleSubmit guard exist

## Description
Context: remaining = MAX_PER_PLAYER minus sent entries. Expected result: three gating points present.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet.handleSubmit` · L72-L74
- **Do:** Check 'if (remaining <= 0) return;' follows event.preventDefault(); add if absent

```
if (remaining <= 0) return;
```

- **Expected:** Zero quota never reaches submitContribution

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet Send button and quota alert` · L130-L138
- **Do:** Check <button type='submit' disabled={remaining <= 0}>Send</button> and {remaining <= 0 && <p id='contribution-idea-quota' role='alert'>You have used all your suggestions this round</p>}; add if absent
- **Expected:** Send disabled and message shown at zero quota

## Acceptance criteria
- handleSubmit returns when remaining <= 0 before reading text
- Send has disabled={remaining <= 0} and the alert id contribution-idea-quota renders when remaining <= 0

## Definition of done
- Gating confirmed present, added only if missing
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-656.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-132
- Requirement: REQ-329
- Unit (Act): UNIT-656
- Unit (Verify): UNIT-659
- Status: approved
- Change: UPDATE
