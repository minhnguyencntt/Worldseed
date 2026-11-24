# UNIT-680 — Act: Render the empty history message in ContributionSheet

## Summary
Add a conditional empty-state paragraph above the suggestions list

## Description
Add a paragraph rendered only when historyStatus === 'ready' and entries.length === 0, with the text 'No suggestions yet this round'. Product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `const HISTORY_ERROR` · after L22
- **Do:** Add a module constant HISTORY_EMPTY holding the empty-state text, next to HISTORY_LOADING and HISTORY_ERROR.

```
const HISTORY_EMPTY = 'No suggestions yet this round';
```

- **Expected:** HISTORY_EMPTY is defined with the exact text 'No suggestions yet this round'.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (JSX)` · L153-L159
- **Do:** After the historyStatus === 'error' Retry button block and before the <ul aria-label="Your suggestions">, add a conditional paragraph shown only when historyStatus is 'ready' and entries.length is 0.

```
{historyStatus === 'ready' && entries.length === 0 && <p role="status">{HISTORY_EMPTY}</p>}
```

- **Expected:** After an empty successful load the sheet shows 'No suggestions yet this round'; it disappears once any entry is in entries.

## Acceptance criteria
- The message renders when status is ready and entries is empty.
- The message is absent when status is loading or error, or entries is non-empty.

## Definition of done
- Empty message renders per condition
- TypeScript compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-680.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-137
- Requirement: REQ-340
- Unit (Act): UNIT-680
- Unit (Verify): UNIT-681
- Status: completed
- Change: UPDATE
