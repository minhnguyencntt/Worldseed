# UNIT-356 — Act: Apply visibleWhen and persistentState in scene view and validator

## Summary
Update getSceneView and validateWorld

## Description
Filter by visibleWhen, derive open from persistentState, validate referenced flags.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/scene.ts` · `getSceneView` · L12-L19
- **Do:** Insert .filter((obj) => evaluateAll(state, obj.visibleWhen)) before .map; compute open as: persistentState ? (state.flags[persistentState.flag] ?? persistentState.initial ?? false) : openWhenFlag===undefined ? true : state.flags[openWhenFlag]===true.

```
const flag = obj.persistentState; open = flag ? (state.flags[flag.flag] ?? flag.initial ?? false) : ...
```

- **Expected:** View reflects visibility and persistent flag

### Step 2 — `game/src/content/loader.ts` · `validateWorld object loop` · L131-L146
- **Do:** Inside for (const obj of scene.objects), add a check pushing `unknown flag: ${obj.persistentState.flag}` when persistentState is set and flags lacks it, and for each cond in obj.visibleWhen ?? [] push unknown flag for undeclared 'flag' conditions.

```
if (obj.persistentState && !flags.has(obj.persistentState.flag)) errors.push(...)
```

- **Expected:** Undeclared flags reported

## Acceptance criteria
- Hidden objects omitted
- open follows persistent flag

## Definition of done
- Implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-356.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-070
- Requirement: REQ-179
- Unit (Act): UNIT-356
- Unit (Verify): UNIT-359
- Status: completed
- Change: UPDATE
