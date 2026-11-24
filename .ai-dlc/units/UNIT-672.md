# UNIT-672 — Act: Add HistoryStatus state and loading/error messages to ContributionSheet

## Summary
Introduce the HistoryStatus type and status writer in the history effect

## Description
Add type HistoryStatus and a single useState written only inside the history effect; render loading and error messages.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `new: HistoryStatus` · after L18
- **Do:** Add the exported type HistoryStatus and constants for the two messages used by the render.

```
export type HistoryStatus = 'loading' | 'ready' | 'error';
const HISTORY_LOADING = 'Loading your suggestions…';
const HISTORY_ERROR = 'Could not load your suggestions';
```

- **Expected:** Type and constants compile

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history effect` · L37-L66
- **Do:** Add const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('loading'); in the effect call setHistoryStatus('loading') after the early return, setHistoryStatus('ready') after the setEntries merge in .then, and setHistoryStatus('error') in .catch replacing the best-effort comment.

```
if (!open || roundId === '') return;
setHistoryStatus('loading');
// .then: ...setEntries(...); setHistoryStatus('ready');
// .catch: setHistoryStatus('error');
```

- **Expected:** Status changes only inside the effect

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet render` · before L144
- **Do:** Render <p role="status">{HISTORY_LOADING}</p> when historyStatus === 'loading' and <p role="alert">{HISTORY_ERROR}</p> when historyStatus === 'error', placed above the <ul aria-label="Your suggestions">.
- **Expected:** Messages appear in the dialog above the list

## Acceptance criteria
- Loading message shown while pending
- Error message shown in role=alert on rejection

## Definition of done
- Component renders loading, ready and error states
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-672.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-135
- Requirement: REQ-336
- Unit (Act): UNIT-672
- Unit (Verify): UNIT-675
- Status: completed
- Change: UPDATE
