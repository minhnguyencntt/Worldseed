# UNIT-673 — Act: Add reload counter and Retry button to the history effect

## Summary
reloadKey in effect deps with a Retry button in the error state

## Description
Add reloadKey state, include it in the effect deps, and render Retry calling only setReloadKey.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet state` · after L41
- **Do:** Add const [reloadKey, setReloadKey] = useState(0);

```
const [reloadKey, setReloadKey] = useState(0);
```

- **Expected:** Counter exists

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history effect deps` · L66
- **Do:** Change the dependency array to include reloadKey.

```
[open, roundId] -> [open, roundId, reloadKey]
```

- **Expected:** Incrementing reloadKey re-runs the effect

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet render error block` · after the HISTORY_ERROR paragraph added by A1
- **Do:** Inside the historyStatus === 'error' branch add a button type="button" labelled Retry with onClick={() => setReloadKey((k) => k + 1)}.

```
<button type="button" onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
```

- **Expected:** Retry visible only on error

## Acceptance criteria
- Retry triggers a new listMine call
- Retry only appears in error state

## Definition of done
- Retry re-runs the effect
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-673.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-135
- Requirement: REQ-337
- Unit (Act): UNIT-673
- Unit (Verify): UNIT-676
- Status: completed
- Change: UPDATE
