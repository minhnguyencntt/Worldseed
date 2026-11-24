import { describe, it, expect, vi } from 'vitest';
import { buildEffects, destroyEffects } from '../src/engine/buildEffects';
import { layerDepth } from '../src/engine/layers';
import type { EffectHandle, EffectRenderContext } from '../src/engine/renderContext';
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
const moonlightShaft = { type: 'moonlightShaft', color: '#c8d8ff', alpha: 0.3, area: { x: 40, y: 0, width: 80, height: 180 } };
const lampGlow = { type: 'lampGlow', color: '#ffb866', alpha: 0.5, x: 160, y: 90, radius: 60 };
const doorLight = { type: 'doorLight', color: '#fff2c0', alpha: 0.25, area: { x: 260, y: 60, width: 40, height: 120 } };
const vignette = { type: 'vignette', color: '#000000', alpha: 0.4 };
const fade = { type: 'transition', kind: 'fade', durationMs: 400 };

const lightingSpecs = [dust, ambientLight, moonlightShaft, lampGlow, doorLight, vignette];

function sceneWith(effects?: unknown[]): SceneDef {
  return {
    ...validScene,
    ...(effects === undefined ? {} : { effects }),
  } as unknown as SceneDef;
}

describe('buildEffects lighting', () => {
  it('calls createEffect once per non-transition lighting spec, each on the effects layer depth', () => {
    // Given a fake context and a scene with dust, ambientLight, moonlightShaft, lampGlow, doorLight, vignette and a transition
    const { ctx, createEffect, playTransition } = makeFakeContext();
    const scene = sceneWith([...lightingSpecs, fade]);
    // When buildEffects runs against the scene
    const handles = buildEffects(ctx, scene);
    // Then createEffect is called 6 times, every call carrying the effects-layer depth
    expect(createEffect).toHaveBeenCalledTimes(6);
    for (const call of createEffect.mock.calls) {
      expect((call[0] as { depth: number }).depth).toBe(layerDepth('effects'));
    }
    // And the calls keep the authored order of the non-transition specs
    expect(createEffect.mock.calls.map((c) => (c[0] as { type: string }).type)).toEqual([
      'dust',
      'ambientLight',
      'moonlightShaft',
      'lampGlow',
      'doorLight',
      'vignette',
    ]);
    // And the transition is not played by buildEffects and six handles are returned
    expect(playTransition).not.toHaveBeenCalled();
    expect(handles).toHaveLength(6);
  });
});

describe('destroyEffects', () => {
  it('still calls destroy on the remaining handles when the first destroy throws', () => {
    // Given three handles where the first destroy throws
    const first = { destroy: vi.fn(() => { throw new Error('boom'); }) };
    const second = { destroy: vi.fn() };
    const third = { destroy: vi.fn() };
    const handles: EffectHandle[] = [first, second, third];
    // When destroyEffects tears every handle down
    // Then it does not throw
    expect(() => destroyEffects(handles)).not.toThrow();
    // And the failing handle was attempted once and the others were still destroyed once each
    expect(first.destroy).toHaveBeenCalledTimes(1);
    expect(second.destroy).toHaveBeenCalledTimes(1);
    expect(third.destroy).toHaveBeenCalledTimes(1);
  });
});
