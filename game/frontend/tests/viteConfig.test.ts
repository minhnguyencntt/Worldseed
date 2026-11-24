import { describe, expect, it } from 'vitest';
import config from '../vite.config';

describe('Vite publicDir', () => {
  it('serves game/public', () => {
    const publicDir = String(config.publicDir).replace(/\\/g, '/');

    expect(publicDir.endsWith('/game/public')).toBe(true);
  });
});
