# UNIT-666 — Act: Add historyStatus state and loading message to ContributionSheet

## Summary
Track history load status and render loading text

## Description
Add a historyStatus state ('loading'|'ready'|'error') set by the history effect and render a loading status message in the history area.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (state declarations)` · after L42
- **Do:** Add a historyStatus state typed 'loading' | 'ready' | 'error' initialised to 'loading', and a reloadKey number state initialised to 0.

```
const [historyStatus, setHistoryStatus] = useState<'loading' | 'ready' | 'error'>('loading');
const [reloadKey, setReloadKey] = useState(0);
```

- **Expected:** Component compiles with the two new states.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history useEffect` · L44-L69
- **Do:** Call setHistoryStatus('loading') right after the early return guard, call setHistoryStatus('ready') inside the then handler after the cancelled check, and add reloadKey to the dependency array.

```
[open, roundId] -> [open, roundId, reloadKey]
```

- **Expected:** Status is loading while listMine is pending and ready after it resolves.

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet JSX list` · L141-L147
- **Do:** Before the ul, render a loading paragraph when historyStatus === 'loading', and render the ul only when historyStatus !== 'loading'.

```
{historyStatus === 'loading' && <p role="status">Loading your suggestions…</p>}
```

- **Expected:** Loading text visible while pending, list shown after.

## Acceptance criteria
- historyStatus is 'loading' when the effect starts and 'ready' after listMine resolves
- 'Loading your suggestions…' renders while loading and the list renders only when not loading

## Definition of done
- Loading state implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-666.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-134
- Requirement: REQ-333
- Unit (Act): UNIT-666
- Unit (Verify): UNIT-669
- Status: approved
- Change: UPDATE
