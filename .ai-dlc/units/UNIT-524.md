# UNIT-524 — Act: Add createPhaserRenderContext

## Summary
Implement the Phaser RenderContext

## Description
Create game/frontend/src/phaser/renderContext.ts exporting createPhaserRenderContext(scene, resolveKey) that returns a RenderContext whose createSprite builds a Phaser image, label text and RenderHandle.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/renderContext.ts` · `new: createPhaserRenderContext` · new
- **Do:** Create the file importing Phaser, RenderContext, RenderHandle and RenderSpriteSpec from '@game/engine/renderContext'. Export createPhaserRenderContext(scene: Phaser.Scene, resolveKey: (id: string) => string): RenderContext whose createSprite(spec) does: image = scene.add.image(spec.x, spec.y, resolveKey(spec.key)).setOrigin(0,0).setScale(spec.scale).setDepth(spec.depth); if spec.bounds, image.setInteractive(new Phaser.Geom.Rectangle(b.x,b.y,b.width,b.height), Phaser.Geom.Rectangle.Contains); label = scene.add.text(spec.x, spec.y - 12, spec.label ?? '', {fontSize:'10px'}).setDepth(spec.depth+0.5).setVisible(false).

```
export function createPhaserRenderContext(scene: Phaser.Scene, resolveKey: (id: string) => string): RenderContext { return { createSprite(spec) { /* as described */ } }; }
```

- **Expected:** Function exported and returns an object with createSprite

### Step 2 — `game/frontend/src/phaser/renderContext.ts` · `createSprite returned RenderHandle` · new
- **Do:** Return a RenderHandle: setVisible(v) calls image.setVisible(v) and, when v is false, label.setVisible(false); setHighlighted(on) calls image.setTint(0xfff2b0) when on else image.clearTint(); setLabelVisible(on) calls label.setVisible(on); onHover(cb) registers image.on('pointerover', () => cb(true)) and image.on('pointerout', () => cb(false)); onClick(cb) registers image.on('pointerdown', cb); destroy() calls image.destroy() and label.destroy().
- **Expected:** All six RenderHandle methods exist and delegate to Phaser objects

## Acceptance criteria
- createSprite places an image using the spec position, scale, depth and resolved key
- The handle implements highlight, label, visibility, hover, click and destroy

## Definition of done
- createPhaserRenderContext compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-524.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-106
- Requirement: REQ-262
- Unit (Act): UNIT-524
- Unit (Verify): UNIT-527
- Status: completed
- Change: NEW
