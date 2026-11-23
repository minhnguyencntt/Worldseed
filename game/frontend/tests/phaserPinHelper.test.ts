import { describe, expect, it } from 'vitest';
import { phaserPinProblems } from '../src/lib/phaserPin';

// In-memory objects shaped like package.json and package-lock.json (lockfileVersion 3).
const makePkg = (phaser: string) => ({ dependencies: { phaser } });
const makeLock = (rootPhaser: string, installed: string | undefined) => ({
  lockfileVersion: 3,
  packages: {
    '': { dependencies: { phaser: rootPhaser } },
    ...(installed === undefined ? {} : { 'node_modules/phaser': { version: installed } }),
  },
});

describe('phaserPinProblems', () => {
  it('returns no problems for 3.90.x', () => {
    // Given package.json and the lockfile both pin phaser to ~3.90.0 and the installed version is 3.90.0,
    // when the pin guard inspects them,
    // then it reports no problems.
    const pkg = makePkg('~3.90.0');
    const lock = {
      lockfileVersion: 3,
      packages: {
        '': { dependencies: { phaser: '~3.90.0' } },
        'node_modules/phaser': { version: '3.90.0' },
      },
    };
    expect(phaserPinProblems(pkg, lock)).toEqual([]);
  });

  it('reports 4.x in the package.json field', () => {
    // Given package.json declares phaser ^4.2.1 while the lockfile is 3.90.x,
    // when the pin guard inspects them,
    // then it reports a problem naming package.json.
    const problems = phaserPinProblems(makePkg('^4.2.1'), makeLock('~3.90.0', '3.90.0'));
    expect(problems.length).toBeGreaterThanOrEqual(1);
    expect(problems.some((p) => p.includes('package.json'))).toBe(true);
  });

  it('reports 4.x in the lockfile root specifier field', () => {
    // Given the lockfile root specifier is ^4.2.1 while package.json is 3.90.x,
    // when the pin guard inspects them,
    // then it reports a problem naming the lockfile root.
    const problems = phaserPinProblems(makePkg('~3.90.0'), makeLock('^4.2.1', '3.90.0'));
    expect(problems.length).toBeGreaterThanOrEqual(1);
    expect(problems.some((p) => p.includes('lockfile root'))).toBe(true);
  });

  it('reports 4.x in the node_modules/phaser version field', () => {
    // Given the installed node_modules/phaser version is 4.2.1 while the specifiers are 3.90.x,
    // when the pin guard inspects them,
    // then it reports a problem naming node_modules/phaser.
    const problems = phaserPinProblems(makePkg('~3.90.0'), makeLock('~3.90.0', '4.2.1'));
    expect(problems.length).toBeGreaterThanOrEqual(1);
    expect(problems.some((p) => p.includes('node_modules/phaser'))).toBe(true);
  });

  it('reports a problem when the node_modules/phaser entry is missing', () => {
    // Given the lockfile has no node_modules/phaser entry,
    // when the pin guard inspects them,
    // then it reports at least one problem.
    const problems = phaserPinProblems(makePkg('~3.90.0'), makeLock('~3.90.0', undefined));
    expect(problems.length).toBeGreaterThanOrEqual(1);
  });
});
