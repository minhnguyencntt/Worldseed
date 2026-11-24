# UNIT-678 — Act: Do not report loading when no history request is made

## Summary
Initialise and reset historyStatus to ready when there is no round id or the sheet is closed

## Description
In ContributionSheet, make historyStatus 'ready' whenever the history effect does not fire a request (roundId === '' or !open), and keep 'loading' only while listMine is in flight.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (historyStatus useState)` · L47
- **Do:** Change the initial state so it is 'loading' only when a request will be made: derive it from open and roundId instead of the constant 'loading'.

```
useState<HistoryStatus>('loading') -> useState<HistoryStatus>(open && roundId !== '' ? 'loading' : 'ready')
```

- **Expected:** First render with roundId '' has historyStatus 'ready' so no loading paragraph renders

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history useEffect` · L50-L53
- **Do:** Replace the early return with a branch that sets status 'ready' before returning, so reopening with an empty round id or closing never leaves 'loading'.

```
if (!open || roundId === '') return; -> if (!open || roundId === '') { setHistoryStatus('ready'); return; }
```

- **Expected:** Status is 'ready' whenever no listMine request is issued; request path still sets 'loading' at L53

## Acceptance criteria
- With roundId '' the status is 'ready' on first render
- With roundId set the status is 'loading' until listMine settles

## Definition of done
- Loading message absent when roundId is ''
- Product code compiles with tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-678.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-136
- Requirement: REQ-339
- Unit (Act): UNIT-678
- Unit (Verify): UNIT-679
- Status: approved
- Change: UPDATE
