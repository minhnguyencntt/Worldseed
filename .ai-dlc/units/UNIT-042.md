# UNIT-042 — Act: Compose the playing view in App

## Summary
Wire useGame, SceneView, ActionMenu, StoryPanel and GameLayout in App after Begin

## Description
Edit App.tsx so the post-Begin branch renders GameLayout with SceneView plus ActionMenu as scene and StoryPanel as story, driven by useGame and a selectedId state.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App` · L1-L10 (file created by the previous Act)
- **Do:** Add imports for useGame, getActiveNode from '@game/systems/dialogue', SceneView, ActionMenu, StoryPanel and GameLayout. At the top of App, before the begun check, call const game = useGame() and const [selectedId, setSelectedId] = useState<string | undefined>(undefined). Replace the 'return <></>' branch with the GameLayout composition below.

```
const selected = game.view.find((o) => o.id === selectedId);
return (
  <GameLayout
    scene={<>
      <SceneView sceneId={game.scene.id} title={game.scene.title} objects={game.view} selectedId={selectedId} onSelect={setSelectedId} />
      <ActionMenu object={selected} onAction={game.act} />
    </>}
    story={<StoryPanel node={getActiveNode(game.state, game.scene)} history={game.state.history} inventory={game.state.inventory} onChoose={game.choose} />}
  />
);
```

- **Expected:** npx tsc --noEmit passes and npx vite build succeeds in game/frontend

## Acceptance criteria
- Given Begin clicked, then hotspots, Story toggle and dialogue render
- Given a hotspot click and action, then history updates
- Given a dialogue choice click, then it is recorded in history

## Definition of done
- Playing view renders and typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-042.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-008
- Requirement: REQ-022
- Unit (Act): UNIT-042
- Unit (Verify): UNIT-044
- Status: completed
- Change: UPDATE
