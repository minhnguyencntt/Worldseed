# UNIT-017 — Act: Implement state model and pure runtime systems

## Summary
Create game package config, types, state, conditions, inventory, events, dialogue and scene engine

## Description
Create the game TypeScript package under backend/game and the pure runtime modules. Context: backend/game does not exist. Desired behavior: types define content and state shapes; systems operate immutably. Expected result: modules importable by loader and tests.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/package.json` · `new: package manifest` · new
- **Do:** Create package.json with type module, scripts test='vitest run' and typecheck='tsc --noEmit', dependency yaml, devDependencies typescript and vitest; also create tsconfig.json (strict true, module ESNext, moduleResolution Bundler, target ES2022, include src and tests) and vitest.config.ts using defineConfig with test.include ['tests/**/*.test.ts'].

```
{"name":"worldseed-game","private":true,"type":"module","scripts":{"test":"vitest run","typecheck":"tsc --noEmit"},"dependencies":{"yaml":"^2.5.0"},"devDependencies":{"typescript":"^5.5.0","vitest":"^2.0.0"}}
```

- **Expected:** npm install in backend/game succeeds and vitest/tsc binaries exist.

### Step 2 — `backend/game/tsconfig.json` · `new: tsconfig` · new
- **Do:** Create tsconfig.json with compilerOptions strict true, module ESNext, moduleResolution Bundler, target ES2022, noEmit true, types [] and include ['src','tests'].

```
{"compilerOptions":{"strict":true,"module":"ESNext","moduleResolution":"Bundler","target":"ES2022","noEmit":true,"skipLibCheck":true},"include":["src","tests"]}
```

- **Expected:** tsc --noEmit runs in strict mode.

### Step 3 — `backend/game/vitest.config.ts` · `new: vitest config` · new
- **Do:** Create vitest.config.ts exporting default defineConfig({test:{include:['tests/**/*.test.ts']}}) imported from 'vitest/config'.

```
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] } });
```

- **Expected:** vitest discovers only files under tests/.

### Step 4 — `backend/game/src/state/types.ts` · `new: Condition, GameEvent, ActionDef, ObjectDef, DialogueNode, SceneDef, WorldDef, GameState` · new
- **Do:** Export types: Condition = {flag:string;equals?:boolean}|{hasItem:string}; GameEvent = set_flag{flag,value}|add_item{item}|remove_item{item}|goto_scene{scene}|say{character,text}|show_text{text}|discover{object}; ActionDef{id:'inspect'|'push'|'search'|'leave';label;conditions?:Condition[];events:GameEvent[]}; ObjectDef{id,name,description,actions,openWhenFlag?}; DialogueNode{id,speaker,text,choices:{text;next?;events?}[]}; SceneDef{id,title,objects,openingDialogue?:string(node id),dialogue:DialogueNode[]}; WorldDef{id,title,startScene,scenes:string[],characters:{id,name}[],flags:string[]}; GameState{currentScene,inventory:string[],discoveredObjects:string[],completedQuests:string[],relationships:Record<string,number>,flags:Record<string,boolean>,history:string[],activeDialogue:string|null}.
- **Expected:** File compiles; types exported.

### Step 5 — `backend/game/src/state/gameState.ts` · `new: createInitialState, setFlag, addHistory` · new
- **Do:** Implement createInitialState(world:WorldDef,scene:SceneDef):GameState with currentScene=world.startScene, empty collections, activeDialogue=scene.openingDialogue??null; setFlag(state,flag,value) returning {...state,flags:{...state.flags,[flag]:value}}; addHistory(state,line) returning a new state with line appended.
- **Expected:** Functions return new objects; inputs unchanged.

### Step 6 — `backend/game/src/systems/conditions.ts` · `new: evaluateCondition, evaluateAll` · new
- **Do:** evaluateCondition(state,c) returns state.flags[c.flag]===(c.equals??true) for flag conditions and state.inventory.includes(c.hasItem) for hasItem conditions; evaluateAll(state,conds?) returns true when conds is undefined/empty or every condition passes.
- **Expected:** Boolean results per state.

### Step 7 — `backend/game/src/systems/inventory.ts` · `new: addItem, removeItem, hasItem` · new
- **Do:** addItem returns state with item appended only if absent; removeItem returns state with item filtered out; hasItem returns state.inventory.includes(item).
- **Expected:** Duplicates are never added.

### Step 8 — `backend/game/src/systems/events.ts` · `new: applyEvent, applyEvents` · new
- **Do:** applyEvent switches on event.type: set_flag->setFlag, add_item->addItem, remove_item->removeItem, goto_scene->{...state,currentScene:event.scene,activeDialogue:null} with history 'Went to <scene>', say->addHistory '<character>: <text>', show_text->addHistory text, discover->add object id to discoveredObjects once; applyEvents reduces a list in order.
- **Expected:** Events applied in order, immutably.

### Step 9 — `backend/game/src/systems/dialogue.ts` · `new: getActiveNode, chooseOption` · new
- **Do:** getActiveNode(state,scene) returns the DialogueNode matching state.activeDialogue or undefined; chooseOption(state,scene,index) applies the choice's events via applyEvents, appends history of the choice text, and sets activeDialogue to choice.next??null; returns state unchanged when node or index is invalid.
- **Expected:** Choice advances dialogue and records history.

### Step 10 — `backend/game/src/engine/scene.ts` · `new: getSceneView, performAction` · new
- **Do:** getSceneView(state,scene) returns objects each with only the actions whose conditions pass, plus an open:boolean computed from openWhenFlag in state.flags; performAction(state,scene,objectId,actionId) finds the action, returns state unchanged if object/action missing or evaluateAll fails, otherwise returns applyEvents(state,action.events).
- **Expected:** Failed conditions leave state identical.

## Acceptance criteria
- Given the package, when tsc --noEmit runs, then it compiles with strict mode.
- Given any system function, when called, then the input state is not mutated.

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-017.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-004
- Requirement: REQ-009
- Unit (Act): UNIT-017
- Unit (Verify): UNIT-021
- Status: completed
- Change: UPDATE
