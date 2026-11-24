# UNIT-687 — Act: Add a test id to the submit success message

## Summary
Add data-testid contribution-success to the success paragraph

## Description
Edit ContributionSheet.tsx so the success paragraph is addressable by test id.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (success paragraph)` · L153
- **Do:** Add data-testid contribution-success to the paragraph rendered when success is set, keeping id and role

```
<p id="contribution-idea-success" role="status" data-testid="contribution-success">{success}</p>
```

- **Expected:** Success paragraph renders with test id contribution-success

## Acceptance criteria
- Success paragraph has data-testid contribution-success
- Id and role are unchanged

## Definition of done
- Attribute added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-687.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-139
- Requirement: REQ-344
- Unit (Act): UNIT-687
- Unit (Verify): UNIT-690
- Status: completed
- Change: UPDATE
