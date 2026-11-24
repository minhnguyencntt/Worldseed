# UNIT-331 — Act: Wire round loading/error state and HeaderOverlay into App

## Summary
Add loading/error state and header prop in App.

## Description
Track loading and error, pass HeaderOverlay to GameLayout header.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App state and effect` · L14-L24
- **Do:** Add useState<boolean> loading initialised true and useState<string|undefined> error. Replace the effect body so it calls getCurrentRound().then(setRound).catch((e) => setError(e instanceof Error ? e.message : String(e))).finally(() => setLoading(false)). Import HeaderOverlay from './components/HeaderOverlay' and world from './runtime/content'.

```
getCurrentRound().then(setRound).catch((e) => setError(e instanceof Error ? e.message : String(e))).finally(() => setLoading(false));
```

- **Expected:** State tracks loading and error.

### Step 2 — `game/frontend/src/App.tsx` · `GameLayout usage` · L32-L33
- **Do:** Pass header={<HeaderOverlay worldTitle={world.title} round={round} loading={loading} error={error} />} to GameLayout.

```
<GameLayout header={<HeaderOverlay worldTitle={world.title} round={round} loading={loading} error={error} />} scene={...}
```

- **Expected:** Header renders through the slot.

## Acceptance criteria
- Header receives round, loading and error.
- ContributionSheet still gets round id.

## Definition of done
- App renders HeaderOverlay in header slot
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-331.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-066
- Requirement: REQ-166
- Unit (Act): UNIT-331
- Unit (Verify): UNIT-334
- Status: completed
- Change: UPDATE
