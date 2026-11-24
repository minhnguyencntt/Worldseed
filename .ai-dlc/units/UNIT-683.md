# UNIT-683 — Act: Confirm Retry increments reloadKey and the effect resets to loading

## Summary
Verify the Retry handler and effect behavior

## Description
Confirm onClick calls setReloadKey((k) => k + 1), reloadKey is in the effect deps, and the effect begins with setHistoryStatus('loading') before listMine.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history useEffect` · L51-L77
- **Do:** Read the effect: confirm setHistoryStatus('loading') runs before listMine(roundId) and the dependency array is [open, roundId, reloadKey]; make no change when it matches.

```
}, [open, roundId, reloadKey]);
```

- **Expected:** Effect re-runs on reloadKey change and sets loading first

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet Retry button onClick` · L156-L158
- **Do:** Confirm onClick is () => setReloadKey((k) => k + 1) and the button label is 'Retry'.

```
<button type="button" onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
```

- **Expected:** Retry click triggers a re-run of the history effect

## Acceptance criteria
- Retry click changes reloadKey
- Effect sets status 'loading' before calling listMine

## Definition of done
- Retry flow confirmed to reload and show loading
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-683.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-138
- Requirement: REQ-342
- Unit (Act): UNIT-683
- Unit (Verify): UNIT-685
- Status: approved
- Change: UPDATE
