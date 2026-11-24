# UNIT-338 — Act: Remove RoundBadge and Countdown usage from App

## Summary
Delete the RoundBadge and Countdown imports and JSX from App.

## Description
Remove standalone RoundBadge and Countdown from App.tsx scene content.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `imports` · L4, L6
- **Do:** Delete the import lines for Countdown from './components/Countdown' and RoundBadge from './components/RoundBadge'.
- **Expected:** No unused imports remain.

### Step 2 — `game/frontend/src/App.tsx` · `App scene JSX` · L38-L39
- **Do:** Delete the <RoundBadge status={round?.status} /> line and the {round && <Countdown endsAt={round.ends_at} />} line from the scene fragment.
- **Expected:** Scene fragment begins with <SceneView ... />.

## Acceptance criteria
- App.tsx has no RoundBadge or Countdown reference
- App.tsx scene fragment begins with SceneView and still renders without the removed elements

## Definition of done
- No RoundBadge/Countdown in App.tsx
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-338.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-067
- Requirement: REQ-170
- Unit (Act): UNIT-338
- Unit (Verify): UNIT-341
- Status: completed
- Change: NEW
