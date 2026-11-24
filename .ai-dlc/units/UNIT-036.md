# UNIT-036 — Act: Compose GameLayout, App, styles and entry point

## Summary
Act: Compose GameLayout, App, styles and entry point

## Description
Compose components into the 80/20 responsive game screen.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `new: GameLayout` · new
- **Do:** Export GameLayout({scene: ReactNode, story: ReactNode}) with useState drawerOpen=false; render main.scene-area with scene, a button 'Story' with aria-expanded={drawerOpen} toggling it, and aside.story-panel with className drawer-open when drawerOpen.
- **Expected:** Toggle flips aria-expanded

### Step 2 — `game/frontend/src/App.tsx` · `new: App` · new
- **Do:** Export default App using useGame; useState started=false; show IntroScreen when state.history.length===0 && !started (onBegin sets started true); otherwise GameLayout with SceneView, ActionMenu for the selected object and StoryPanel using getActiveNode(state, scene).
- **Expected:** App plays the opening scene

### Step 3 — `game/frontend/src/styles.css` · `new: layout rules` · new
- **Do:** Define .game-layout grid 4fr 1fr, .story-panel overflow-y auto height 100vh, and @media (max-width: 768px) rules making .story-panel position fixed bottom 0 max-height 50vh transform translateY(calc(100% - 3rem)) with .drawer-open translateY(0).
- **Expected:** Desktop 80/20; mobile drawer

### Step 4 — `game/frontend/index.html` · `new: html shell` · new
- **Do:** Create index.html with div#root and script type=module src=/src/main.tsx.
- **Expected:** Vite serves the app

### Step 5 — `game/frontend/src/main.tsx` · `new: entry` · new
- **Do:** Import './styles.css' and render <App/> into #root with createRoot.
- **Expected:** App mounts

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria

## Definition of done
- Files in code_paths implemented and type-check passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-036.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-007
- Requirement: REQ-020
- Unit (Act): UNIT-036
- Unit (Verify): UNIT-040
- Status: completed
- Change: UPDATE
