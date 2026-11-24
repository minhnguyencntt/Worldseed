# UNIT-651 — Act: Disable Send and guard handleSubmit at zero quota

## Summary
Disable Send and return early in handleSubmit at remaining 0

## Description
Add disabled prop to the Send button and an early return in handleSubmit when remaining <= 0.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L71-L73
- **Do:** After event.preventDefault(), add an early return when remaining <= 0 before the prompt is read

```
event.preventDefault();
if (remaining <= 0) return;
```

- **Expected:** Submitting at remaining 0 does not call submitContribution or change entries

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet Send button` · L127
- **Do:** Add the disabled prop to the Send submit button, driven by remaining <= 0

```
<button type="submit" disabled={remaining <= 0}>Send</button>
```

- **Expected:** Send has the disabled attribute at remaining 0 and is enabled above 0

## Acceptance criteria
- Send button is disabled at remaining 0
- handleSubmit returns before submitContribution at remaining 0

## Definition of done
- No backend call at zero quota
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-651.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-131
- Requirement: REQ-326
- Unit (Act): UNIT-651
- Unit (Verify): UNIT-653
- Status: completed
- Change: NEW
