# UNIT-507 — Act: Add resolveTextureKey to the engine

## Summary
Add resolveTextureKey to game/src/engine/planPreload.ts.

## Description
Add a pure function that returns the id when the manifest knows it, and the fallback id otherwise.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/planPreload.ts` · `new: resolveTextureKey` · after the end of planPreload
- **Do:** Append export function resolveTextureKey(id: string | undefined, manifest: AssetManifest, fallbackId: string): string. Return id when it is defined and some manifest.assets entry has that id; otherwise return fallbackId.

```
export function resolveTextureKey(id: string | undefined, manifest: AssetManifest, fallbackId: string): string {
  return id !== undefined && manifest.assets.some((a) => a.id === id) ? id : fallbackId;
}
```

- **Expected:** npx tsc --noEmit in game/ passes and resolveTextureKey is importable

## Acceptance criteria
- Known id returns itself
- Unknown or undefined id returns the fallback id

## Definition of done
- resolveTextureKey is exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-507.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-102
- Requirement: REQ-254
- Unit (Act): UNIT-507
- Unit (Verify): UNIT-509
- Status: completed
- Change: UPDATE
