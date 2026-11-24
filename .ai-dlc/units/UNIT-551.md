# UNIT-551 — Act: Export SceneObjectSpec type from runtime content

## Summary
Expose the scene object type

## Description
Export SceneObjectSpec derived from SceneSpec in content.ts so tests can annotate callbacks.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/runtime/content.ts` · `new: SceneObjectSpec` · after L38
- **Do:** Add an exported type alias for one scene object below the sceneSpec export

```
export type SceneObjectSpec = SceneSpec['objects'][number];
```

- **Expected:** import type { SceneObjectSpec } from '../src/runtime/content' type-checks

## Acceptance criteria
- Given content.ts, When imported as a type, Then SceneObjectSpec equals SceneSpec['objects'][number]
- Given content.ts runtime exports, When loaded, Then unchanged

## Definition of done
- SceneObjectSpec exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-551.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-111
- Requirement: REQ-276
- Unit (Act): UNIT-551
- Unit (Verify): UNIT-555
- Status: approved
- Change: NEW
