import { describe, expect, it, vi } from 'vitest';
import {
  assertNoTrackedNodeModules,
  checkTrackedFiles,
  parseGitLsFiles,
  trackedNodeModulesPaths,
  untrackNodeModules,
} from '../src/lib/trackedNodeModules';

describe('trackedNodeModulesPaths', () => {
  it('keeps only paths with a node_modules segment and ignores look-alike names', () => {
    // Given a mixed list of tracked paths,
    // when it is filtered for node_modules,
    // then only the node_modules path is returned and my_node_modules_note.ts is not matched.
    const input = ['node_modules/phaser/a.js', 'src/a.ts', 'src/my_node_modules_note.ts'];

    expect(trackedNodeModulesPaths(input)).toEqual(['node_modules/phaser/a.js']);
  });

  it('returns an empty list when given no paths', () => {
    // Given an empty path list,
    // when it is filtered for node_modules,
    // then the result is an empty list.
    expect(trackedNodeModulesPaths([])).toEqual([]);
  });
});

describe('assertNoTrackedNodeModules', () => {
  it('throws and names the tracked node_modules path when one is present', () => {
    // Given a tracked file list containing a node_modules path,
    // when the guard asserts no tracked node_modules paths,
    // then it throws an error that names the offending path.
    expect(() => assertNoTrackedNodeModules(['node_modules/phaser/x.js', 'src/a.ts'])).toThrow(
      /node_modules\/phaser\/x.js/,
    );
  });

  it('does not throw when no tracked path is under node_modules', () => {
    // Given a tracked file list with no node_modules path,
    // when the guard asserts no tracked node_modules paths,
    // then it completes without throwing.
    expect(() => assertNoTrackedNodeModules(['src/a.ts'])).not.toThrow();
  });
});

describe('untrackNodeModules', () => {
  it('removes node_modules from the git index recursively using a cached-only rm', () => {
    // Given a fake git runner that returns empty output,
    // when untrackNodeModules is called with it,
    // then one call removes the node_modules directory with rm -r --cached.
    const run = vi.fn((_args: string[]) => '');

    untrackNodeModules(run);

    const calls = run.mock.calls.map(([args]) => args);
    expect(calls).toEqual(
      expect.arrayContaining([expect.arrayContaining(['rm', '-r', '--cached', 'node_modules'])]),
    );
  });

  it('only ever uses the --cached flag so working-tree files are never deleted', () => {
    // Given a fake git runner that returns empty output,
    // when untrackNodeModules is called with it,
    // then every git call carries --cached.
    const run = vi.fn((_args: string[]) => '');

    untrackNodeModules(run);

    expect(run.mock.calls.length).toBeGreaterThan(0);
    for (const [args] of run.mock.calls) {
      expect(args).toContain('--cached');
    }
  });

  it('also untracks the vitest results cache file under node_modules', () => {
    // Given a fake git runner that returns empty output,
    // when untrackNodeModules is called with it,
    // then one call untracks node_modules/.vite/vitest/results.json.
    const run = vi.fn((_args: string[]) => '');

    untrackNodeModules(run);

    const calls = run.mock.calls.map(([args]) => args);
    expect(calls).toEqual(
      expect.arrayContaining([expect.arrayContaining(['node_modules/.vite/vitest/results.json'])]),
    );
  });
});

describe('parseGitLsFiles', () => {
  it('splits NUL-separated git output into individual paths', () => {
    // Given NUL-terminated git ls-files output with two paths,
    // when it is parsed,
    // then the result is the two paths in order.
    expect(parseGitLsFiles('a\0b\0')).toEqual(['a', 'b']);
  });

  it('returns an empty list when the git output is empty', () => {
    // Given empty git ls-files output,
    // when it is parsed,
    // then the result is an empty list.
    expect(parseGitLsFiles('')).toEqual([]);
  });
});

describe('checkTrackedFiles', () => {
  it('returns only the tracked dependency and vitest cache paths, reading with ls-files -z', () => {
    // Given a fake git runner that lists a source file, a root node_modules file,
    // and a nested vitest results cache file,
    // when checkTrackedFiles is called with it,
    // then only the last two paths are returned and git is queried with ls-files -z.
    const run = vi.fn((_a: string[]) =>
      'src/a.ts\0node_modules/x.js\0game/frontend/node_modules/.vite/vitest/results.json\0',
    );

    expect(checkTrackedFiles(run)).toEqual([
      'node_modules/x.js',
      'game/frontend/node_modules/.vite/vitest/results.json',
    ]);
    expect(run).toHaveBeenCalledWith(['ls-files', '-z']);
  });

  it('returns an empty list when no tracked path is a dependency or vitest cache file', () => {
    // Given a fake git runner that lists only a source file,
    // when checkTrackedFiles is called with it,
    // then the result is an empty list.
    const run = vi.fn((_a: string[]) => 'src/a.ts\0');

    expect(checkTrackedFiles(run)).toEqual([]);
  });
});
