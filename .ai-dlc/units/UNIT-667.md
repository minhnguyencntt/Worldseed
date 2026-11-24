# UNIT-667 — Act: Render the empty history state in ContributionSheet

## Summary
Show empty message when ready with no entries

## Description
Render 'No suggestions yet this round' when historyStatus is 'ready' and entries is empty.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet JSX list` · L141-L147
- **Do:** Add a paragraph rendered when historyStatus === 'ready' && entries.length === 0 with id contribution-history-empty and the text 'No suggestions yet this round'.

```
{historyStatus === 'ready' && entries.length === 0 && <p id="contribution-history-empty">No suggestions yet this round</p>}
```

- **Expected:** Empty message shows for an empty history and hides after a submit.

## Acceptance criteria
- Empty message shown only when ready and entries.length === 0
- Message disappears once an entry exists

## Definition of done
- Empty state implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-667.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-134
- Requirement: REQ-334
- Unit (Act): UNIT-667
- Unit (Verify): UNIT-670
- Status: approved
- Change: UPDATE
