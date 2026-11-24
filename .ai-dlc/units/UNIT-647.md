# UNIT-647 — Act: Disable Send and guard handleSubmit at zero quota

## Summary
Disable Send button and early-return in handleSubmit when remaining <= 0

## Description
In ContributionSheet.tsx add a disabled attribute on the Send button and an early return in handleSubmit when remaining is 0 or less.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L71-L73
- **Do:** After event.preventDefault() add an early return when remaining is 0 or less so nothing is submitted, no entry added and text is kept.

```
if (remaining <= 0) return;
```

- **Expected:** Submitting at zero quota never calls submitContribution.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet Send button` · L128
- **Do:** Add the disabled attribute bound to remaining <= 0 on the submit button.

```
<button type="submit">Send</button> -> <button type="submit" disabled={remaining <= 0}>Send</button>
```

- **Expected:** Send is disabled with 5 sent entries and enabled otherwise.

## Acceptance criteria
- Send button is disabled when remaining <= 0
- handleSubmit makes no submitContribution call when remaining <= 0

## Definition of done
- Send disabled and submit blocked at zero quota
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-647.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-130
- Requirement: REQ-324
- Unit (Act): UNIT-647
- Unit (Verify): UNIT-649
- Status: approved
- Change: UPDATE
