# UNIT-503 — Act: Wire preload and fallback texture into BootScene

## Summary
Add BootScene.preload and bundled manifest export

## Description
Export the parsed manifest from runtime/content.ts and add preload() to BootScene using planPreload and a generated fallback texture on loaderror.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/runtime/content.ts` · `new: manifest` · after L35
- **Do:** Add an eager import.meta.glob with query '?raw' of '../../../public/assets/worlds/the-boys-room/manifest.json', JSON.parse the single result, run parseManifest from '@game/assets/manifest'; export const manifest as the data when ok, otherwise {version:1, assets:[]}.
- **Expected:** manifest is exported and typed AssetManifest

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload` · after L18
- **Do:** Add preload(): compute plan = planPreload(manifest, scene); for each entry call this.load.image(id, '/assets/' + path) or this.load.spritesheet(id, url, {frameWidth, frameHeight}) from entry.frames; on this.load.on('loaderror', f => this.failed.add(f.key)); add private failed = new Set<string>() and in create() generate the fallback texture with this.textures.generateTexture or graphics under FALLBACK_ASSET_ID when absent.
- **Expected:** Entries queued; failed keys recorded; fallback texture present

## Acceptance criteria
- preload queues planned entries
- loaderror registers a fallback texture

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-503.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-101
- Requirement: REQ-252
- Unit (Act): UNIT-503
- Unit (Verify): UNIT-505
- Status: approved
- Change: UPDATE
