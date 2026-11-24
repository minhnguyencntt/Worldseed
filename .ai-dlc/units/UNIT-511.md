# UNIT-511 — Act: Resolve texture keys and generate fallback in BootScene

## Summary
Wire resolveTextureKey and fallback texture

## Description
Add resolver param to createPhaserEffectContext, generate the fallback texture in preload, track failed ids.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `createPhaserEffectContext` · L7-L40
- **Do:** Add second parameter `resolveKey: (id: string) => string` and replace `spec.asset` in scene.add.particles with `resolveKey(spec.asset)`.

```
createPhaserEffectContext(scene, resolveKey) ... .particles(area.x, area.y, resolveKey(spec.asset), {
```

- **Expected:** Particles use the resolved key

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload / resolveKey / create` · L22-L30
- **Do:** In preload, call this.textures.generate? no: use make.graphics to draw a 8x8 magenta/black checker and generateTexture('fallback:missing',8,8); register this.load.on('loaderror', f => this.failed.add(f.key)). Add private failed=new Set<string>() and resolveKey(id)=> this.failed.has(id) ? 'fallback:missing' : resolveTextureKey(id, manifest, 'fallback:missing'). In create pass (id)=>this.resolveKey(id) to createPhaserEffectContext.

```
const g = this.make.graphics({ x: 0, y: 0 }, false); g.fillStyle(0xff00ff).fillRect(0,0,8,8).fillStyle(0x000000).fillRect(0,0,4,4).fillRect(4,4,4,4); g.generateTexture('fallback:missing', 8, 8); g.destroy();
```

- **Expected:** Fallback texture exists and resolveKey returns it for unknown or failed ids

## Acceptance criteria
- dust uses resolved key
- loaderror ids map to fallback

## Definition of done
- resolver used for every texture key
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-511.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-103
- Requirement: REQ-256
- Unit (Act): UNIT-511
- Unit (Verify): UNIT-513
- Status: completed
- Change: UPDATE
