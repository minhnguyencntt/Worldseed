# UNIT-332 — Act: Remove RoundBadge and Countdown usage from App

## Summary
Delete the imports and JSX in App.

## Description
Remove RoundBadge and Countdown from App scene slot.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `imports` · L5,L7
- **Do:** Delete the import lines for Countdown from './components/Countdown' and RoundBadge from './components/RoundBadge'.
- **Expected:** No unused imports.

### Step 2 — `game/frontend/src/App.tsx` · `scene fragment` · L36-L37
- **Do:** Delete the JSX lines <RoundBadge status={round?.status} /> and {round && <Countdown endsAt={round.ends_at} />} from the scene fragment.
- **Expected:** Scene fragment begins with SceneView.

## Acceptance criteria
- App.tsx has no RoundBadge or Countdown references.
- The scene fragment in App.tsx begins with SceneView.

## Definition of done
- Imports and JSX removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-332.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-066
- Requirement: REQ-167
- Unit (Act): UNIT-332
- Unit (Verify): UNIT-335
- Status: completed
- Change: UPDATE
