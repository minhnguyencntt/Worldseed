# Worldseed GDD

## Premise

A boy's room, explored by pointing, focusing and acting. The player moves through the room, focuses on objects, and acts on them. Players suggest what happens next.

## Core loop

1. **Intro**: the intro screen opens the game.
2. **Scene**: the room is drawn from the world content, with its layers, effects and characters.
3. **Focus an object**: the player points at an object; focusing it shows its overlay.
4. **Act**: the player acts on the focused object.
5. **Dialogue and inventory update**: the act runs dialogue, events and conditions, and may change inventory.
6. **Transitions**: the scene changes through its transitions.
7. **Save and reload**: state is saved and can be reloaded.

## Feature index

| Feature | Code files |
| --- | --- |
| World content and loader | `game/src/content/loader.ts`, `game/src/content/schema.ts`, `game/src/content/worlds/the-boys-room/world.yaml` |
| Asset manifest | `game/src/assets/manifest/schema.ts`, `game/src/assets/loaders/manifestLoader.ts` |
| Scene build and layers | `game/src/engine/buildScene.ts`, `game/src/engine/layers.ts`, `game/src/entities/SceneObject.ts`, `game/frontend/src/phaser/buildScene.ts` |
| Effects and transitions | `game/src/engine/buildEffects.ts`, `game/src/engine/playSceneTransition.ts`, `game/frontend/src/phaser/effectContext.ts`, `game/frontend/src/phaser/transitions.ts` |
| Asset preload | `game/src/engine/planPreload.ts`, `game/frontend/src/phaser/preload.ts` |
| Characters and animation | `game/src/engine/characterAnimation.ts`, `game/frontend/src/phaser/characters.ts` |
| Input and focus | `game/frontend/src/phaser/input.ts`, `game/frontend/src/phaser/menuKeys.ts`, `game/src/systems/interaction.ts` |
| Dialogue, conditions, events, inventory | `game/src/systems/runner.ts`, `game/src/systems/dialogue.ts`, `game/src/systems/conditions.ts`, `game/src/systems/events.ts`, `game/src/systems/inventory.ts`, `game/frontend/src/runtime/useGame.ts` |
| State and save | `game/src/state/gameState.ts`, `game/src/state/persistence.ts`, `game/frontend/src/store/gameStore.ts`, `game/frontend/src/runtime/storage.ts` |
| Phaser-React event bridge | `game/frontend/src/phaser/events.ts`, `game/frontend/src/components/PhaserHost.tsx` |
| Game overlays | `game/frontend/src/components/ObjectOverlay.tsx`, `game/frontend/src/components/StoryPanel.tsx`, `game/frontend/src/components/HeaderOverlay.tsx`, `game/frontend/src/components/IntroScreen.tsx`, `game/frontend/src/lib/anchor.ts` |
| Suggest What Happens Next | `game/frontend/src/components/ContributionSheet.tsx`, `game/frontend/src/components/contribution/HistoryList.tsx`, `game/frontend/src/api/client.ts` |
| Admin console | `game/frontend/src/components/AdminApp.tsx`, `game/frontend/src/components/admin/AdminControls.tsx` |
| Art and asset generation | `game/frontend/src/lib/generateAssets.ts`, `game/frontend/scripts/generateArt.ts`, `game/frontend/src/art/sources.ts` |
| Repo guards | `game/frontend/src/lib/importBoundary.ts`, `game/frontend/src/lib/sourceSize.ts`, `game/frontend/src/lib/trackedNodeModules.ts` |
