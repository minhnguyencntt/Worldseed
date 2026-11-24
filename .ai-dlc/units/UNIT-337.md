# UNIT-337 — Act: Wire round loading/error state and HeaderOverlay into App

## Summary
Track loading and error in App and render HeaderOverlay through the header slot.

## Description
Edit App.tsx: add loading and error state, replace the silent catch, and pass HeaderOverlay to GameLayout header.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App useState/useEffect` · L14-L24
- **Do:** Add const [loading, setLoading] = useState(true) and const [roundError, setRoundError] = useState<string | undefined>(undefined). Rewrite the effect so getCurrentRound().then(setRound).catch((e: unknown) => setRoundError(e instanceof Error ? e.message : 'Round request failed')).finally(() => setLoading(false)), removing the silent .catch(() => setRound(undefined)).

```
getCurrentRound().then(setRound).catch((e: unknown) => setRoundError(e instanceof Error ? e.message : 'Round request failed')).finally(() => setLoading(false));
```

- **Expected:** State reflects pending, resolved and rejected round fetch.

### Step 2 — `game/frontend/src/App.tsx` · `App return JSX / HeaderOverlay import` · L1-L12, L30-L35
- **Do:** Import HeaderOverlay from './components/HeaderOverlay' and pass header={<HeaderOverlay worldTitle={world.title} round={round} loading={loading} error={roundError} />} to GameLayout, importing world from './runtime/content' (the same export useGame uses).

```
<GameLayout header={<HeaderOverlay worldTitle={world.title} round={round} loading={loading} error={roundError} />} scene={...}
```

- **Expected:** HeaderOverlay renders inside the layout main area.

## Acceptance criteria
- Header shows loading, round, or error
- No silent catch remains

## Definition of done
- App passes round, loading, error to HeaderOverlay in header slot
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-337.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-067
- Requirement: REQ-169
- Unit (Act): UNIT-337
- Unit (Verify): UNIT-340
- Status: completed
- Change: NEW
