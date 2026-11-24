# UNIT-395 — Act: Add the typed event bus module

## Summary
Create events.ts with event maps and a generic typed emitter.

## Description
Implement a dependency-free typed bus and two exported instances.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/events.ts` · `new: PhaserToReactEvents, ReactToPhaserEvents, createEventBus, phaserToReact, reactToPhaser` · new
- **Do:** Declare interface PhaserToReactEvents {objectHover:{id:string|null}; objectClick:{id:string}; sceneReady:{sceneId:string}} and interface ReactToPhaserEvents {highlightObject:{id:string|null}; playAnimation:{target:string;name:string}; transitionTo:{sceneId:string}}. Implement createEventBus<T extends object>() using a Map<keyof T, Set<handler>> returning {on(event, handler): () => void, off(event, handler), emit(event, payload), clear()}. Export const phaserToReact = createEventBus<PhaserToReactEvents>() and reactToPhaser = createEventBus<ReactToPhaserEvents>().
- **Expected:** Typed on/emit compile; emit with a wrong payload fails tsc.

## Acceptance criteria
- Given the module, When read, Then it declares both event maps and createEventBus.
- Given the module, When read, Then it has no phaser import.

## Definition of done
- events.ts typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-395.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-078
- Requirement: REQ-198
- Unit (Act): UNIT-395
- Unit (Verify): UNIT-398
- Status: completed
- Change: UPDATE
