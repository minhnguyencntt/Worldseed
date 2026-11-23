import Phaser from 'phaser';
import { buildGameConfig } from './config';

// Single seam for constructing the Phaser game; tests mock this module.
export function createGame(
  parent: HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[],
): Phaser.Game {
  return new Phaser.Game(buildGameConfig(parent, scenes));
}
