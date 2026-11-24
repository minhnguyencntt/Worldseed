# UNIT-686 — Act: Add test ids to the history loading and empty messages

## Summary
Add data-testid to loading and empty paragraphs

## Description
Edit ContributionSheet.tsx so the loading and empty history paragraphs have data-testid attributes while keeping role and text.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (loading paragraph)` · L154
- **Do:** Add the data-testid attribute contribution-history-loading to the paragraph rendered when historyStatus === 'loading'

```
<p role="status" data-testid="contribution-history-loading">{HISTORY_LOADING}</p>
```

- **Expected:** Loading paragraph renders with test id contribution-history-loading

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (empty paragraph)` · L159
- **Do:** Add the data-testid attribute contribution-history-empty to the paragraph rendered when historyStatus is ready and entries is empty

```
<p role="status" data-testid="contribution-history-empty">{HISTORY_EMPTY}</p>
```

- **Expected:** Empty paragraph renders with test id contribution-history-empty

## Acceptance criteria
- Loading paragraph has data-testid contribution-history-loading
- Empty paragraph has data-testid contribution-history-empty

## Definition of done
- Attributes added; component compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-686.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-139
- Requirement: REQ-343
- Unit (Act): UNIT-686
- Unit (Verify): UNIT-689
- Status: completed
- Change: UPDATE
