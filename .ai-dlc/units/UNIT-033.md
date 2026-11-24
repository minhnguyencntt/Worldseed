# UNIT-033 — Act: Scaffold frontend and implement useGame with safe storage

## Summary
Act: Scaffold frontend and implement useGame with safe storage

## Description
Create the frontend module under game/frontend and the runtime hook layer that loads content, restores and saves state safely.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `new: package manifest` · new
- **Do:** Create manifest named worldseed-frontend with scripts dev=vite, build=vite build, test=vitest run, typecheck=tsc --noEmit; dependencies react, react-dom, yaml; devDependencies vite, @vitejs/plugin-react, typescript, vitest, jsdom, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, @types/react, @types/react-dom.

```
{"name":"worldseed-frontend","private":true,"type":"module","scripts":{"dev":"vite","build":"vite build","test":"vitest run","typecheck":"tsc --noEmit"}}
```

- **Expected:** npm install in game/frontend/ succeeds

### Step 2 — `game/frontend/tsconfig.json` · `new: compiler options` · new
- **Do:** Create tsconfig with strict true, jsx react-jsx, module ESNext, moduleResolution Bundler, target ES2022, noEmit true, skipLibCheck true, types [vite/client, vitest/globals], include [src, tests, ../src].
- **Expected:** tsc --noEmit resolves game/src imports

### Step 3 — `game/frontend/vite.config.ts` · `new: default config` · new
- **Do:** Export defineConfig with plugins [react()], resolve.alias '@game' -> path to ../src (game/src), server.fs.allow ['..'], and test {environment:'jsdom', globals:true, setupFiles:['./tests/setup.ts'], include:['tests/**/*.test.{ts,tsx}']}.
- **Expected:** vitest picks up jsdom and the alias

### Step 4 — `game/frontend/src/runtime/content.ts` · `new: loadBedroom` · new
- **Do:** Use import.meta.glob('../../../content/worlds/the-boys-room/**/*.yaml',{query:'?raw',import:'default',eager:true}) and yaml.parse to build a WorldDef and a SceneDef for 'bedroom'; export const world, export const scene (types from @game/state/types).
- **Expected:** scene.id === 'bedroom' and scene.objects has 6 entries

### Step 5 — `game/frontend/src/runtime/storage.ts` · `new: STORAGE_KEY, readSaved, writeSaved` · new
- **Do:** Export STORAGE_KEY='worldseed:game-state:v1'. readSaved(): GameState|null wraps window.localStorage.getItem and deserializeState (from @game/state/persistence) in try/catch, returning null on any throw or null value. writeSaved(state): boolean wraps setItem(serializeState(state)) in try/catch returning false on throw.
- **Expected:** readSaved returns null on corrupt JSON; writeSaved returns false when setItem throws

### Step 6 — `game/frontend/src/runtime/useGame.ts` · `new: useGame` · new
- **Do:** Export useGame(): initial state from readSaved() cast to GameState else createInitialState(world, scene); useState holds it; a useEffect calls writeSaved(state) on each change; return {state, scene, view: getSceneView(state, scene), act(objectId, actionId) using performAction, choose(index) using chooseOption}.
- **Expected:** Hook returns state, view, act and choose; storage failure never throws

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria

## Definition of done
- Files in code_paths implemented and type-check passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-033.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-007
- Requirement: REQ-017
- Unit (Act): UNIT-033
- Unit (Verify): UNIT-037
- Status: completed
- Change: UPDATE
