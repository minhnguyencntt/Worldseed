# UNIT-319 — Act: Track round loading/error in App and render HeaderOverlay

## Summary
Wire HeaderOverlay in App

## Description
Replace round useState with loading/error state, remove loose RoundBadge/Countdown, pass header prop to GameLayout.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App state and effect` · L14-L24
- **Do:** Add const [roundError, setRoundError] = useState<string | undefined>(undefined) and const [roundLoading, setRoundLoading] = useState(true). Change the effect to: getCurrentRound().then(setRound).catch((e) => setRoundError(`Round status unavailable: ${e instanceof Error ? e.message : 'request failed'}`)).finally(() => setRoundLoading(false)).

```
getCurrentRound().then(setRound).catch(e => setRoundError(`Round status unavailable: ${e instanceof Error ? e.message : 'request failed'}`)).finally(() => setRoundLoading(false))
```

- **Expected:** State reflects pending, success and failure

### Step 2 — `game/frontend/src/App.tsx` · `App return JSX` · L27-L48
- **Do:** Delete the RoundBadge and Countdown lines and their imports. Import HeaderOverlay. Pass to GameLayout header={<HeaderOverlay worldTitle="The Boy's Room" round={round} loading={roundLoading} error={roundError} />}.
- **Expected:** Header appears via GameLayout slot; no 'Round unavailable' text in App

## Acceptance criteria
- Given each of loading, error and ready round states, when App renders, then HeaderOverlay receives matching loading, error and round props
- Given the GameLayout header slot, when App renders, then the header is passed through the header prop and no loose RoundBadge or Countdown remains

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-319.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-064
- Requirement: REQ-160
- Unit (Act): UNIT-319
- Unit (Verify): UNIT-322
- Status: completed
- Change: UPDATE
