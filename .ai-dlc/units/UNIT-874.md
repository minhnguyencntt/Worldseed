# UNIT-874 — Act: Replace GameLayout sidebar with full-screen scene and centered story dialog

## Summary
GameLayout renders a full-viewport main and an overlay centered dialog for story.

## Description
Remove the grid, aside, motion and drawer toggle; render story in a centered overlay.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L1-L34
- **Do:** Remove ChevronUp, motion, useUiStore and Button imports and the drawer code; import Frame; return a div 'relative h-screen w-full overflow-hidden bg-sf-ink-1' containing main 'absolute inset-0' with header and scene, and an overlay div 'pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4' holding <Frame kind='panel' className='sf-dialog pointer-events-auto' data-testid='story-dialog'>{story}</Frame>.

```
<div className="relative h-screen w-full overflow-hidden bg-sf-ink-1"><main className="absolute inset-0">{header}{scene}</main><div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4"><Frame kind="panel" className="sf-dialog pointer-events-auto" data-testid="story-dialog">{story}</Frame></div></div>
```

- **Expected:** Scene fills the viewport and the story dialog is centered over it.

## Acceptance criteria
- No aside exists
- Story is inside [data-testid=story-dialog].sf-dialog

## Definition of done
- Layout implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-874.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-174
- Requirement: REQ-438
- Unit (Act): UNIT-874
- Unit (Verify): UNIT-878
- Status: approved
- Change: UPDATE
