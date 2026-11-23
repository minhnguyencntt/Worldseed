import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { phaserPinProblems } from '../src/lib/phaserPin';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
const readJson = (rel: string): any =>
  JSON.parse(readFileSync(fileURLToPath(new NodeURL(rel, import.meta.url)), 'utf8'));

describe('phaser version guard', () => {
  const pkg = readJson('../package.json');
  const lock = readJson('../package-lock.json');

  it('reports no pin problems for the real package.json and package-lock.json', () => {
    // Given the real frontend package.json and package-lock.json on disk,
    // when the phaser pin guard inspects them,
    // then it reports no problems (all phaser declarations are 3.90.x and agree).
    expect(phaserPinProblems(pkg, lock)).toEqual([]);
  });

  it('keeps the lockfile root specifier equal to package.json and the installed phaser on 3.90.x', () => {
    // Given the real package.json and package-lock.json,
    // when the phaser specifiers and the node_modules/phaser version are read,
    // then the lockfile root specifier equals package.json and the installed
    // version is 3.90.x, not 4.x.
    const specifier = pkg.dependencies.phaser;
    const rootSpecifier = lock.packages[''].dependencies.phaser;
    const installed: string = lock.packages['node_modules/phaser'].version;

    expect(rootSpecifier).toBe(specifier);
    expect(installed).toMatch(/^3\.90\.\d+$/);
    expect(installed).not.toMatch(/^4\./);
  });
});
