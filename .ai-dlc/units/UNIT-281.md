# UNIT-281 — Act: Add HeaderOverlay and compose it in App

## Summary
Create the header and wire App to it and the store

## Description
Create HeaderOverlay and replace the loose RoundBadge/Countdown in App, moving the contribution sheet flag to the store and tracking the round error.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `new: HeaderOverlay({ worldName, round, error })` · new
- **Do:** Create component rendering a header (absolute top-0 inset-x-0 z-10 flex items-center gap-3 px-3 py-1 text-sm) with a Lucide BookOpen icon plus text 'StoryForge', worldName, round?.id, <RoundBadge status={round?.status}/> when round exists, <Countdown endsAt={round.ends_at}/> when round exists, and when !round && error a span role='alert' with the error text; add a button aria-label 'Toggle sound' with aria-pressed={soundEnabled} calling toggleSound (Volume2 or VolumeX icon) and a button aria-label 'Settings' calling setSettingsOpen(true) (Settings icon); wrap in motion.header with initial {opacity:0} animate {opacity:1}
- **Expected:** Header renders all required items

### Step 2 — `game/frontend/src/App.tsx` · `App` · L14-L63
- **Do:** Replace useState sheetOpen with useUiStore modal/openModal/closeModal (open when modal === 'contribution'); add useState roundError set in the getCurrentRound catch to the Error message; remove the inline RoundBadge and Countdown from the scene fragment and render <HeaderOverlay worldName={game.scene.title} round={round} error={roundError} /> first in the scene; Suggest button onClick openModal('contribution'); ContributionSheet onClose closeModal
- **Expected:** App shows the header and opens the sheet via the store

## Acceptance criteria
- HeaderOverlay exists with required content
- App uses it and the store modal flag

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-281.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-056
- Requirement: REQ-142
- Unit (Act): UNIT-281
- Unit (Verify): UNIT-285
- Status: completed
- Change: UPDATE
