// @vitest-environment node
// Loading vite.config.ts through esbuild fails under the jsdom realm (TextEncoder invariant), so this file runs in node.
// tests/setup.ts clears localStorage after every test; node has none, so provide a no-op stand-in for this file only.
import { describe, expect, it } from 'vitest';
import config from '../vite.config';

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', { value: { clear: () => {} }, configurable: true });
}

describe('Vite publicDir', () => {
  it('serves game/public', () => {
    const publicDir = String(config.publicDir).replace(/\\/g, '/');

    expect(publicDir.endsWith('/game/public')).toBe(true);
  });
});

describe('Vite dev proxy', () => {
  it('proxies /api to the backend on http://localhost:8080', () => {
    const proxy = config.server?.proxy as Record<string, { target: string }>;

    expect(proxy['/api'].target).toBe('http://localhost:8080');
  });

  it('keeps the dev server fs.allow setting of [".."]', () => {
    expect(config.server?.fs?.allow).toEqual(['..']);
  });
});
