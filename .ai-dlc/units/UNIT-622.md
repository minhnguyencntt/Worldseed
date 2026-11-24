# UNIT-622 — Act: Add loading, empty and error states to the contribution history

## Summary
History state UI driven by listMine

## Description
Track history load status in ContributionSheet and render loading, empty and error messages.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet state` · L33-L35
- **Do:** Add `const [historyState, setHistoryState] = useState<'idle' | 'loading' | 'loaded' | 'failed'>('idle')`.
- **Expected:** historyState exists

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `history useEffect` · L38-L60
- **Do:** Before listMine call setHistoryState('loading'). In the then callback (after the cancelled check) call setHistoryState('loaded'). Replace the empty catch body with `if (!cancelled) setHistoryState('failed');` keeping the merge logic unchanged.
- **Expected:** historyState reflects pending, success and failure of listMine

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `history list markup` · L106-L112
- **Do:** Above the ul render <p>Loading suggestions…</p> when historyState === 'loading'; <p role="alert">Could not load your suggestions</p> when 'failed'; and <p>No suggestions yet</p> when historyState === 'loaded' and entries.length === 0. Keep the ul aria-label='Your suggestions'.
- **Expected:** Each history outcome shows its message and entries still render in the list

## Acceptance criteria
- Loading, empty and error messages render
- Submitting works after a history failure

## Definition of done
- History states implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-622.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-125
- Requirement: REQ-312
- Unit (Act): UNIT-622
- Unit (Verify): UNIT-625
- Status: approved
- Change: UPDATE
