# UNIT-324 — Act: Create HeaderOverlay with logo, world, round ID, status and countdown

## Summary
Create HeaderOverlay.tsx rendering identity and round info

## Description
Create the HeaderOverlay component with props and the ready-state layout.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `new: HeaderOverlayProps` · new
- **Do:** Create the file and export interface HeaderOverlayProps with worldTitle: string, round?: Round (type imported from '../api/client'), loading?: boolean, error?: string.

```
export interface HeaderOverlayProps { worldTitle: string; round?: Round; loading?: boolean; error?: string }
```

- **Expected:** Props interface compiles

### Step 2 — `game/frontend/src/components/HeaderOverlay.tsx` · `new: HeaderOverlay` · new
- **Do:** Export function HeaderOverlay returning <header className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-3 py-2"> with a <span>StoryForge</span> logo, a <span> with worldTitle, and when round is defined a <span> with round.id, a <span> with round.status and <Countdown endsAt={round.ends_at} /> imported from './Countdown'.

```
{round && (<><span>{round.id}</span><span data-status={round.status}>{round.status}</span><Countdown endsAt={round.ends_at} /></>)}
```

- **Expected:** Rendering with a round shows all five items

## Acceptance criteria
- HeaderOverlay exported with props worldTitle, round, loading, error
- Ready state shows logo, title, id, status and Countdown

## Definition of done
- Component compiles with tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-324.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-065
- Requirement: REQ-162
- Unit (Act): UNIT-324
- Unit (Verify): UNIT-327
- Status: completed
- Change: UPDATE
