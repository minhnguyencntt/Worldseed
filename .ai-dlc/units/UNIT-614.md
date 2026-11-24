# UNIT-614 — Act: Add sceneTitle and scroll styling to StoryPanel

## Summary
Add sceneTitle prop, heading and independent-scroll pixel styling to StoryPanel and pass the title from App

## Description
Implement the sceneTitle prop in StoryPanel and pass game.scene.title from App. Product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanelProps / StoryPanel` · L3-L15
- **Do:** Add `sceneTitle: string` to StoryPanelProps, destructure it, render `<h1>{sceneTitle}</h1>` as the first child, and change the root div className to the scrolling pixel-art style.

```
className="story-content h-full overflow-y-auto p-3 font-mono text-sm border-l-4 border-amber-900 bg-stone-900 text-amber-100"
```

- **Expected:** StoryPanel shows the scene title heading and its root scrolls on its own

### Step 2 — `game/frontend/src/App.tsx` · `App (story prop)` · L54-L61
- **Do:** Pass `sceneTitle={game.scene.title}` to the StoryPanel element.

```
<StoryPanel sceneTitle={game.scene.title} node={...} />
```

- **Expected:** Typecheck passes and the title reaches the panel

## Acceptance criteria
- StoryPanel accepts a required sceneTitle string and renders it in an h1
- The root element has overflow-y-auto and h-full classes
- App passes game.scene.title as sceneTitle

## Definition of done
- Component compiles and renders the title
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-614.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-124
- Requirement: REQ-307
- Unit (Act): UNIT-614
- Unit (Verify): UNIT-617
- Status: completed
- Change: UPDATE
