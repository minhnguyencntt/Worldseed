import { describe, it, expect, vi } from 'vitest';
import { buildEffects } from '../src/engine/buildEffects';
import { layerDepth } from '../src/engine/layers';
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

const dust = { type: 'dust', asset: 'effect:dust', count: 20, area: { x: 0, y: 0, width: 320, height: 180 } };
const ambientLight = { type: 'ambientLight', color: '#ffd9a0', alpha: 0.15 };
const fade = { type: 'transition', kind: 'fade', durationMs: 400 };

function sceneWith(effects?: unknown[]): SceneDef {
  return {
    ...validScene,
    ...(effects === undefined ? {} : { effects }),
  } as unknown as SceneDef;
}

describe('buildEffects', () => {
  it('creates one non-transition effect per authored spec on the effects layer and skips the transition', () => {
    // Given a fake effect context and a scene with dust, ambientLight and fade effects
    const { ctx, createEffect, playTransition } = makeFakeContext();
    const scene = sceneWith([dust, ambientLight, fade]);
    // When buildEffects runs against the scene
    const handles = buildEffects(ctx, scene);
    // Then createEffect is called twice with the effects-layer depth
    expect(createEffect).toHaveBeenCalledTimes(2);
    for (const call of createEffect.mock.calls) {
      expect((call[0] as { depth: number }).depth).toBe(layerDepth('effects'));
    }
    expect(createEffect.mock.calls[0][0]).toMatchObject({ type: 'dust', depth: 400 });
    expect(createEffect.mock.calls[1][0]).toMatchObject({ type: 'ambientLight', depth: 400 });
    // And buildEffects does not play the transition itself (transitions are played by the caller)
    expect(playTransition).not.toHaveBeenCalled();
    // And two handles are returned
    expect(handles).toHaveLength(2);
  });

  it('returns no handles and makes no calls when the scene has no effects', () => {
    // Given a fake effect context and a scene with no effects key
    const { ctx, createEffect, playTransition } = makeFakeContext();
    const scene = sceneWith();
    // When buildEffects runs against the scene
    const handles = buildEffects(ctx, scene);
    // Then no handles are returned and neither context method is called
    expect(handles).toHaveLength(0);
    expect(createEffect).not.toHaveBeenCalled();
    expect(playTransition).not.toHaveBeenCalled();
  });

  it('exposes a destroy function on every created handle that can be torn down', () => {
    // Given a fake context whose created handles each carry a destroy spy
    const { ctx, createEffect } = makeFakeContext();
    const scene = sceneWith([dust, ambientLight, fade]);
    // When buildEffects creates the handles and every handle is destroyed
    const handles = buildEffects(ctx, scene);
    handles.forEach((h) => h.destroy());
    // Then each underlying destroy spy was called exactly once
    const results = createEffect.mock.results.map((r) => r.value as { destroy: ReturnType<typeof vi.fn> });
    expect(results).toHaveLength(2);
    for (const result of results) {
      expect(result.destroy).toHaveBeenCalledTimes(1);
    }
  });
});
