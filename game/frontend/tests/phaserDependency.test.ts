import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
const readJson = (): any =>
  JSON.parse(readFileSync(fileURLToPath(new NodeURL('../package.json', import.meta.url)), 'utf8'));

describe('phaser dependency declaration', () => {
  const pkg = readJson();

  it('pins phaser to 3.90.x', () => {
    // Given the frontend package.json on disk,
    // when the phaser dependency is read,
    // then it is pinned to the 3.90.x line (optionally with ~).
    expect(pkg.dependencies.phaser).toMatch(/^~?3\.90\.\d+$/);
  });

  it('has no caret range that could resolve to 4.x', () => {
    // Given the frontend package.json on disk,
    // when the phaser dependency is read,
    // then it is not a caret range and does not reference a 4.x version.
    expect(pkg.dependencies.phaser.startsWith('^')).toBe(false);
    expect(pkg.dependencies.phaser).not.toMatch(/^\D*4\./);
  });
});
