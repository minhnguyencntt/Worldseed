# UNIT-692 — Act: Add test ids to the submit error and quota alerts

## Summary
Add data-testid to two alerts in ContributionSheet

## Description
Add data-testid=contribution-error to the submit error paragraph and data-testid=contribution-quota to the zero-quota paragraph without changing text or roles.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (quota paragraph)` · L150
- **Do:** Add the attribute data-testid="contribution-quota" to the <p id="contribution-idea-quota"> element.

```
<p id="contribution-idea-quota" role="alert" data-testid="contribution-quota">
```

- **Expected:** Zero-quota message is queryable by test id contribution-quota

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (error paragraph)` · L152
- **Do:** Add the attribute data-testid="contribution-error" to the <p role="alert">{error}</p> element.

```
{error && <p role="alert" data-testid="contribution-error">{error}</p>}
```

- **Expected:** Submit failure message is queryable by test id contribution-error

## Acceptance criteria
- The error paragraph renders data-testid contribution-error
- The quota paragraph renders data-testid contribution-quota

## Definition of done
- Both attributes present in the JSX
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-692.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-140
- Requirement: REQ-346
- Unit (Act): UNIT-692
- Unit (Verify): UNIT-696
- Status: approved
- Change: UPDATE
