import Phaser from 'phaser';

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 270;

export function computeZoom(w: number, h: number, dpr: number): number {
  const ratio = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
  return Math.max(1, Math.floor(Math.min((w * ratio) / GAME_WIDTH, (h * ratio) / GAME_HEIGHT)));
}

export function buildGameConfig(
  parent: HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[],
  zoom: number = 1,
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
      zoom,
    },
    scene: scenes,
  };
}
