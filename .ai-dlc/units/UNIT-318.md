# UNIT-318 — Act: Create HeaderOverlay component

## Summary
Implement HeaderOverlay with store-bound toggles

## Description
Create src/components/HeaderOverlay.tsx exporting HeaderOverlay with props worldTitle, round, loading, error; compose Countdown and RoundBadge; read soundEnabled/settingsOpen and toggles from useUiStore.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `new: HeaderOverlayProps` · new
- **Do:** Declare exported interface HeaderOverlayProps with worldTitle: string, round?: Round (type imported from ../api/client), loading?: boolean, error?: string.

```
export interface HeaderOverlayProps { worldTitle: string; round?: Round; loading?: boolean; error?: string }
```

- **Expected:** Type exists and imports Round from ../api/client

### Step 2 — `game/frontend/src/components/HeaderOverlay.tsx` · `new: HeaderOverlay` · new
- **Do:** Export function HeaderOverlay. Read soundEnabled, settingsOpen, toggleSound, toggleSettings via useUiStore selectors. Render <header> with Tailwind classes 'absolute inset-x-0 top-0 z-10 flex flex-wrap items-center gap-2 px-3 py-1 text-sm'. Children: <span>StoryForge</span>, <span>{worldTitle}</span>; if loading render <span>Loading round…</span>; else if error render <span role="alert">{error}</span>; else if round render <span>{round.id}</span>, <RoundBadge status={round.status} />, <Countdown endsAt={round.ends_at} />. Then two Button (variant ghost) elements: aria-label 'Sound' aria-pressed={soundEnabled} onClick={toggleSound} with Volume2 or VolumeX icon; aria-label 'Settings' aria-pressed={settingsOpen} onClick={toggleSettings} with Settings icon.
- **Expected:** Header shows all elements for the matching state

## Acceptance criteria
- Component renders all six elements for a ready round
- Loading and error states render explanatory text

## Definition of done
- Component compiles with tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-318.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-064
- Requirement: REQ-159
- Unit (Act): UNIT-318
- Unit (Verify): UNIT-321
- Status: completed
- Change: UPDATE
