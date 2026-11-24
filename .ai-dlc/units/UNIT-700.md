# UNIT-700 — Act: Render PhaserHost with BootScene in the App scene slot

## Summary
Replace SceneView with PhaserHost in App.tsx.

## Description
Edit game/frontend/src/App.tsx so the GameLayout scene slot mounts PhaserHost with BootScene instead of SceneView, keeping ActionMenu, the Suggest button and ContributionSheet.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `imports` · L5-L8
- **Do:** Remove the SceneView import on L8 and add imports for PhaserHost from './components/PhaserHost' and BootScene from './phaser/BootScene'.

```
import { SceneView } from './components/SceneView';  ->  import { PhaserHost } from './components/PhaserHost';
import { BootScene } from './phaser/BootScene';
```

- **Expected:** App.tsx no longer imports SceneView and imports PhaserHost and BootScene.

### Step 2 — `game/frontend/src/App.tsx` · `App (scene prop JSX)` · L62-L69
- **Do:** Replace the <SceneView ... /> element (sceneId, title, objects, selectedId, onSelect props) with an absolutely positioned full-size wrapper containing <PhaserHost scenes={[BootScene]} />, leaving ActionMenu, the Suggest button and ContributionSheet untouched.

```
<SceneView sceneId=... />  ->  <div className="absolute inset-0"><PhaserHost scenes={[BootScene]} /></div>
```

- **Expected:** The scene slot renders the phaser-host element and no img or hotspot buttons.

## Acceptance criteria
- Given Begin is clicked, when App renders, then PhaserHost is rendered and SceneView is not.
- Given the App file is read, when imports are inspected, then SceneView is no longer imported by App.tsx.

## Definition of done
- App.tsx compiles with tsc --noEmit
- No SceneView usage in App.tsx
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-700.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-141
- Requirement: REQ-350
- Unit (Act): UNIT-700
- Unit (Verify): UNIT-702
- Status: completed
- Change: UPDATE
