# UNIT-540 — Act: Export SceneObjectSpec type from runtime content

## Summary
Add SceneObjectSpec alias for sceneSpec objects

## Description
Export a SceneObjectSpec type derived from SceneSpec so callers can type object callbacks.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/runtime/content.ts` · `new: SceneObjectSpec` · after L38
- **Do:** Add the exported type alias directly after the sceneSpec export.

```
export type SceneObjectSpec = SceneSpec['objects'][number];
```

- **Expected:** The alias compiles and is importable

## Acceptance criteria
- Given content.ts, When imported, Then SceneObjectSpec equals SceneSpec['objects'][number]
- Given runtime, When loaded, Then sceneSpec is unchanged

## Definition of done
- Alias exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-540.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-109
- Requirement: REQ-271
- Unit (Act): UNIT-540
- Unit (Verify): UNIT-543
- Status: approved
- Change: UPDATE
