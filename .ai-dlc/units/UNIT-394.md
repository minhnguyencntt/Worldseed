# UNIT-394 — Act: Add phaser dependency, createGame factory, game config and PhaserHost

## Summary
Install Phaser 3.90 and add the host component, config builder and factory.

## Description
Context: no Phaser code exists. Implement the dependency, a testable factory, config with pixel-art settings and a lifecycle-safe host component. Expected result: PhaserHost renders a div container and owns one game instance.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L11-L23
- **Do:** Add the dependency "phaser": "^3.90.0" to the dependencies object, then run npm install in game/frontend to update package-lock.json.

```
"phaser": "^3.90.0",
```

- **Expected:** package.json lists phaser ^3.90.0 and node_modules/phaser/package.json version starts with 3.90.

### Step 2 — `game/frontend/src/phaser/config.ts` · `new: GAME_WIDTH, GAME_HEIGHT, computeZoom, buildGameConfig` · new
- **Do:** Create the file. Export GAME_WIDTH=640 and GAME_HEIGHT=360. Export computeZoom(w:number,h:number,dpr:number):number returning Math.max(1, Math.floor(Math.min(w*dpr/GAME_WIDTH, h*dpr/GAME_HEIGHT))). Export buildGameConfig(parent:HTMLElement, scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig with type Phaser.AUTO, parent, width GAME_WIDTH, height GAME_HEIGHT, render {pixelArt:true, roundPixels:true, antialias:false}, scale {mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH}, scene scenes.

```
import Phaser from 'phaser';
```

- **Expected:** buildGameConfig returns a config with render.pixelArt true and scale.mode Phaser.Scale.FIT.

### Step 3 — `game/frontend/src/phaser/createGame.ts` · `new: createGame` · new
- **Do:** Create the file exporting createGame(parent:HTMLElement, scenes): Phaser.Game that returns new Phaser.Game(buildGameConfig(parent, scenes)). This is the single seam tests mock.
- **Expected:** createGame is the only place new Phaser.Game is called.

### Step 4 — `game/frontend/src/components/PhaserHost.tsx` · `new: PhaserHost` · new
- **Do:** Create PhaserHost with props {scenes?: Phaser.Types.Scenes.SceneType[]}. Use containerRef (div) and gameRef (useRef<Phaser.Game|null>(null)). In a useEffect with [] deps: if gameRef.current is null and containerRef.current exists, set gameRef.current = createGame(containerRef.current, scenes ?? []). Create a ResizeObserver on the container whose callback calls gameRef.current?.scale.refresh(). The cleanup disconnects the observer, calls gameRef.current?.destroy(true), and sets gameRef.current = null. Render <div ref={containerRef} className="h-full w-full" data-testid="phaser-host" />.
- **Expected:** Mounting creates one game, unmounting destroys it and nulls the ref.

## Acceptance criteria
- Given the package manifest, When read, Then phaser is ^3.90.0.
- Given PhaserHost source, When read, Then it guards creation with a ref and destroys in effect cleanup.

## Definition of done
- Files exist and tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-394.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-078
- Requirement: REQ-197
- Unit (Act): UNIT-394
- Unit (Verify): UNIT-397
- Status: completed
- Change: UPDATE
