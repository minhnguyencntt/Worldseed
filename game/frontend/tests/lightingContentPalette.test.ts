import { describe, it, expect } from 'vitest';
import { scene } from '../src/runtime/content';
import { PALETTE } from '../src/lib/palette';

type EffectLike = { type: string; color?: string };

const effects = (scene as unknown as { effects: EffectLike[] }).effects;

describe('bedroom lighting content', () => {
  it('declares moonlightShaft, lampGlow, doorLight, vignette, dust, ambientLight effects on the bedroom scene', () => {
    // Given the bedroom scene loaded from the bundled content
    // When its effect types are collected
    const types = effects.map((e) => e.type);
    // Then every lighting effect type named in the spec is present
    expect(types).toEqual(
      expect.arrayContaining(['moonlightShaft', 'lampGlow', 'doorLight', 'vignette', 'dust', 'ambientLight']),
    );
  });

  it('uses only palette colours for every effect that declares a colour', () => {
    // Given the bedroom scene effects
    // When each effect with a colour is checked against the shared palette
    const coloured = effects.filter((e) => typeof e.color === 'string');
    // Then the scene has coloured effects and each colour is in PALETTE
    expect(coloured.length).toBeGreaterThan(0);
    for (const effect of coloured) {
      expect(PALETTE).toContain(effect.color);
    }
  });
});
