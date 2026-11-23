import { describe, it, expect, vi } from 'vitest';
import { playSceneTransition } from '../src/engine/playSceneTransition';
import type { EffectRenderContext } from '../src/engine/renderContext';
import type { SceneDef } from '../src/state/types';
import { validScene } from './fixtures/valid-world';

// Fake EffectRenderContext: every external effect dependency is a vi.fn.
function makeFakeContext() {
  const createEffect = vi.fn((_spec: unknown) => ({ destroy: vi.fn() }));
  const playTransition = vi.fn((_durationMs: number) => {});
  const ctx: EffectRenderContext = { createEffect, playTransition };
  return { ctx, createEffect, playTransition };
}

const fade = { type: 'transition', kind: 'fade', durationMs: 400 };
const ambientLight = { type: 'ambientLight', color: '#1a2b3c', alpha: 0.4 };

function sceneWith(effects?: unknown[]): SceneDef {
  return {
    ...validScene,
    ...(effects === undefined ? {} : { effects }),
  } as unknown as SceneDef;
}

describe('playSceneTransition', () => {
  it('plays the authored fade with the content duration', () => {
    // Given a fake effect context and a scene with a fade transition of 400ms
    const { ctx, playTransition } = makeFakeContext();
    const scene = sceneWith([fade]);
    // When playSceneTransition runs against the scene
    playSceneTransition(ctx, scene);
    // Then playTransition is called once with the authored duration
    expect(playTransition).toHaveBeenCalledTimes(1);
    expect(playTransition).toHaveBeenCalledWith(400);
  });

  it('does not play when the scene has no transition entry', () => {
    // Given a fake effect context and scenes without a transition entry
    const { ctx, playTransition } = makeFakeContext();
    // When playSceneTransition runs against a scene with only an ambientLight effect
    playSceneTransition(ctx, sceneWith([ambientLight]));
    // And again against a scene with no effects key
    playSceneTransition(ctx, sceneWith());
    // Then playTransition is never called
    expect(playTransition).not.toHaveBeenCalled();
  });
});
