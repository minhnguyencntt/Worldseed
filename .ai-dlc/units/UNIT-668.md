# UNIT-668 — Act: Add history error state and Retry to ContributionSheet

## Summary
Show error and Retry button that reloads history

## Description
Replace the empty catch with an error status, render an alert and Retry button, and increment reloadKey on click.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history useEffect catch` · L62-L64
- **Do:** Replace the empty catch body with a cancelled check followed by setHistoryStatus('error').

```
.catch(() => { if (!cancelled) setHistoryStatus('error'); })
```

- **Expected:** Status becomes error on rejection.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet JSX list` · L141-L147
- **Do:** When historyStatus === 'error', render a role alert paragraph 'Could not load your suggestions' and a button type=button labelled 'Retry' whose onClick calls setReloadKey((k) => k + 1).

```
<button type="button" onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
```

- **Expected:** Error text and Retry visible; clicking Retry re-runs listMine.

## Acceptance criteria
- Rejection sets historyStatus 'error' and renders the alert and Retry
- Retry increments reloadKey causing listMine to be called again

## Definition of done
- Error and Retry implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-668.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-134
- Requirement: REQ-335
- Unit (Act): UNIT-668
- Unit (Verify): UNIT-671
- Status: approved
- Change: UPDATE
