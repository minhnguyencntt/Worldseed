# UNIT-545 — Act: Confirm BootScene.create passes sceneSpec to buildScene

## Summary
BootScene.create uses imported sceneSpec

## Description
BootScene.create calls buildScene(createPhaserRenderContext(...), sceneSpec) using the imported value. Confirm; no change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L56-L56
- **Do:** Confirm line 56 calls buildScene with createPhaserRenderContext and sceneSpec and leave it unchanged

```
this.sceneObjects = buildScene(createPhaserRenderContext(this, (id) => this.resolveKey(id)), sceneSpec);
```

- **Expected:** Line 56 is unchanged

## Acceptance criteria
- create() passes the imported sceneSpec to buildScene
- No scene ids are hardcoded

## Definition of done
- Call confirmed unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-545.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-110
- Requirement: REQ-273
- Unit (Act): UNIT-545
- Unit (Verify): UNIT-548
- Status: completed
- Change: UPDATE
