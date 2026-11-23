import Phaser from 'phaser';
import type { RenderContext, RenderHandle, RenderSpriteSpec } from '@game/engine/renderContext';

// Phaser-backed implementation of the engine's RenderContext for scene objects.
export function createPhaserRenderContext(
  scene: Phaser.Scene,
  resolveKey: (id: string) => string,
): RenderContext {
  return {
    createSprite(spec: RenderSpriteSpec): RenderHandle {
      const image = scene.add
        .image(spec.x, spec.y, resolveKey(spec.key))
        .setOrigin(0)
        .setScale(spec.scale)
        .setDepth(spec.depth);
      if (spec.bounds) {
        const { x, y, width, height } = spec.bounds;
        image.setInteractive(new Phaser.Geom.Rectangle(x, y, width, height), Phaser.Geom.Rectangle.Contains);
      } else {
        image.setInteractive({ useHandCursor: true });
      }

      const label = scene.add
        .text(spec.x, spec.y - 12, spec.label ?? '', { fontSize: '10px', color: '#ffffff', backgroundColor: '#000000' })
        .setDepth(spec.depth + 1)
        .setVisible(false);

      let hoverCb: ((over: boolean) => void) | undefined;
      let clickCb: (() => void) | undefined;
      image.on(Phaser.Input.Events.POINTER_OVER, () => hoverCb?.(true));
      image.on(Phaser.Input.Events.POINTER_OUT, () => hoverCb?.(false));
      image.on(Phaser.Input.Events.POINTER_DOWN, () => clickCb?.());

      return {
        setVisible: (visible) => image.setVisible(visible),
        setHighlighted: (on) => (on ? image.setTint(0xffff66) : image.clearTint()),
        setLabelVisible: (on) => label.setVisible(on),
        onHover: (cb) => {
          hoverCb = cb;
        },
        onClick: (cb) => {
          clickCb = cb;
        },
        destroy: () => {
          image.destroy();
          label.destroy();
        },
      };
    },
  };
}
