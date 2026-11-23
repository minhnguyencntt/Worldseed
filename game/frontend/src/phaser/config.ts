import Phaser from 'phaser';

export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 360;

export function computeZoom(w: number, h: number, dpr: number): number {
  return Math.max(1, Math.floor(Math.min((w * dpr) / GAME_WIDTH, (h * dpr) / GAME_HEIGHT)));
}

export function buildGameConfig(
  parent: HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[],
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    render: {
      pixelArt: true,
      roundPixels: true,
      antialias: false,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: scenes,
  };
}
