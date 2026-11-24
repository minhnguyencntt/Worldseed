import Phaser from 'phaser';
import { reactToPhaser, type Unsubscribe } from './events';

export const TRANSITION_FADE_MS = 300;

export interface Transitions {
  dispose(): void;
}

// Handles 'transitionTo' requests: fades the camera out, then starts the target scene.
// Overlapping requests are ignored while a fade is running.
export function createTransitions(scene: Phaser.Scene): Transitions {
  let running = false;
  let disposed = false;
  let pendingId = '';
  const onFadeOutComplete = (): void => {
    running = false;
    if (!disposed) scene.scene.start(pendingId);
  };
  const off: Unsubscribe = reactToPhaser.on('transitionTo', ({ sceneId }) => {
    if (disposed || running || !sceneId || !scene.scene.get(sceneId)) return;
    running = true;
    pendingId = sceneId;
    const cam = scene.cameras.main;
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, onFadeOutComplete);
    cam.fadeOut(TRANSITION_FADE_MS);
  });
  return {
    dispose: () => {
      disposed = true;
      off();
      scene.cameras.main.off(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, onFadeOutComplete);
    },
  };
}
