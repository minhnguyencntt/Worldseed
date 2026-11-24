# UNIT-826 — Act: Add destroyEffects and use it in the BootScene shutdown handler

## Summary
Centralise effect teardown

## Description
Export destroyEffects from buildEffects.ts and call it from BootScene SHUTDOWN instead of the inline forEach.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/buildEffects.ts` · `new: destroyEffects` · after L11
- **Do:** Export destroyEffects(handles: EffectHandle[]): void that calls destroy on each handle inside try/catch so one failure does not stop the rest.

```
export function destroyEffects(handles: EffectHandle[]): void {
  for (const h of handles) { try { h.destroy(); } catch { /* keep destroying the rest */ } }
}
```

- **Expected:** Function exported from buildEffects.ts

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN handler` · L7, L88-L89
- **Do:** Import destroyEffects next to buildEffects at L7 and replace this.effects.forEach((handle) => handle.destroy()) with destroyEffects(this.effects).

```
this.effects.forEach((handle) => handle.destroy()); -> destroyEffects(this.effects);
```

- **Expected:** Shutdown destroys effects via the helper and still resets this.effects to []

## Acceptance criteria
- destroyEffects destroys all handles even if one throws
- BootScene shutdown calls it

## Definition of done
- BootScene typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-826.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-167
- Requirement: REQ-414
- Unit (Act): UNIT-826
- Unit (Verify): UNIT-829
- Status: completed
- Change: UPDATE
