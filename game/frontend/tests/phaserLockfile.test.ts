import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
const readLock = (): any =>
  JSON.parse(readFileSync(fileURLToPath(new NodeURL('../package-lock.json', import.meta.url)), 'utf8'));

// Integrity hash of the phaser 4.2.1 entry that the lockfile used to pin.
const PHASER_4_2_1_INTEGRITY =
  'sha512-WUNwCPJpdjvZiuT6SgCfYVW8Qw/3j0jJ4ws7P2QkhFLFu74sbGuyHJcbFueGkY/AYO4Pi47bNQXn1OCJeLX//w==';

describe('lockfile node_modules/phaser entry', () => {
  const lock = readLock();
  const entry = lock.packages['node_modules/phaser'];

  it('pins the locked phaser version to the 3.90.x line', () => {
    // Given the frontend package-lock.json on disk,
    // when the node_modules/phaser entry is read,
    // then its version is 3.90.x.
    expect(entry.version).toMatch(/^3\.90\.\d+$/);
  });

  it('resolves the tarball from the npm registry for the locked version', () => {
    // Given the node_modules/phaser entry,
    // when its resolved URL is read,
    // then it points at the registry tarball for that exact version.
    expect(entry.resolved).toBe(`https://registry.npmjs.org/phaser/-/phaser-${entry.version}.tgz`);
  });

  it('records a sha512 integrity hash that is not the 4.2.1 hash', () => {
    // Given the node_modules/phaser entry,
    // when its integrity is read,
    // then it is a sha512 SRI value distinct from the old 4.2.1 entry.
    expect(entry.integrity).toMatch(/^sha512-[A-Za-z0-9+/]+=*$/);
    expect(entry.integrity).not.toBe(PHASER_4_2_1_INTEGRITY);
  });

  it("depends on eventemitter3 '^5.0.1'", () => {
    // Given the node_modules/phaser entry,
    // when its dependencies are read,
    // then eventemitter3 is declared as '^5.0.1'.
    expect(entry.dependencies.eventemitter3).toBe('^5.0.1');
  });
});
