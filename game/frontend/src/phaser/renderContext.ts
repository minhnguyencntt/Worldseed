import Phaser from 'phaser';
import type { RenderContext, RenderHandle, RenderSpriteSpec } from '@game/engine/renderContext';

// Phaser-backed implementation of the engine's RenderContext.
export function createPhaserRenderContext(
  scene: Phaser.Scene,
  resolveKey: (id: string) => string,
): RenderContext {
  return {
    createSprite(spec: RenderSpriteSpec): RenderHandle {
      const image = scene.add
        .image(spec.x, spec.y, resolveKey(spec.key))
        .setOrigin(0, 0)
        .setScale(spec.scale)
        .setDepth(spec.depth);
      if (spec.bounds) {
        const b = spec.bounds;
        image.setInteractive(
          new Phaser.Geom.Rectangle(b.x, b.y, b.width, b.height),
          Phaser.Geom.Rectangle.Contains,
        );
      }
      const label = scene.add
        .text(spec.x, spec.y - 12, spec.label ?? '', { fontSize: '10px' })
        .setDepth(spec.depth + 0.5)
        .setVisible(false);
      return {
        setVisible(visible: boolean): void {
          image.setVisible(visible);
          if (!visible) label.setVisible(false);
        },
        setHighlighted(on: boolean): void {
          if (on) image.setTint(0xfff2b0);
          else image.clearTint();
        },
        setLabelVisible(on: boolean): void {
          label.setVisible(on);
        },
        onHover(cb: (over: boolean) => void): void {
          image.on('pointerover', () => cb(true));
          image.on('pointerout', () => cb(false));
        },
        onClick(cb: () => void): void {
          image.on('pointerdown', cb);
        },
        destroy(): void {
          image.destroy();
          label.destroy();
        },
      };
    },
  };
}
