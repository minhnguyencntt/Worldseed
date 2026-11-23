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

  it('force-removes conflicted results.json from the index with a cached-only forced rm', () => {
    // Given a fake git runner that returns empty output,
    // when untrackNodeModules is called with it,
    // then the second call is rm --cached -f --ignore-unmatch -q for node_modules/.vite/vitest/results.json,
    // so a conflicted results.json is removed from the index even when git refuses a plain rm.
    const run = vi.fn((_args: string[]) => '');

    untrackNodeModules(run);

    expect(run).toHaveBeenNthCalledWith(2, [
      'rm',
      '--cached',
      '-f',
      '--ignore-unmatch',
      '-q',
      '--',
      'node_modules/.vite/vitest/results.json',
    ]);
    for (const [args] of run.mock.calls) {
      expect(args).toContain('--cached');
    }
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

  it('deduplicates conflict stage entries', () => {
    // Given git ls-files --stage style output where one path appears at stages 1, 2 and 3,
    // when it is parsed,
    // then the path is returned once with the stage prefixes stripped.
    const output =
      '100644 aaa 1\tnode_modules/.vite/vitest/results.json\n' +
      '100644 bbb 2\tnode_modules/.vite/vitest/results.json\n' +
      '100644 ccc 3\tnode_modules/.vite/vitest/results.json\n';

    expect(parseGitLsFiles(output)).toEqual(['node_modules/.vite/vitest/results.json']);
  });

  it('deduplicates a triplicated NUL-separated plain path to one entry', () => {
    // Given NUL-separated output that lists the same plain path three times,
    // when it is parsed,
    // then the result contains that path exactly once.
    const output = 'node_modules/.vite/vitest/results.json\0node_modules/.vite/vitest/results.json\0node_modules/.vite/vitest/results.json\0';

    expect(parseGitLsFiles(output)).toEqual(['node_modules/.vite/vitest/results.json']);
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

  it('reports a conflicted path once', () => {
    // Given a fake git runner that lists the vitest results cache file three times
    // (a conflicted index entry) plus a source file,
    // when checkTrackedFiles is called with it,
    // then the conflicted path is reported exactly once.
    const conflicted = 'node_modules/.vite/vitest/results.json';
    const run = vi.fn((_a: string[]) => `${conflicted}\0${conflicted}\0${conflicted}\0src/a.ts\0`);

    expect(checkTrackedFiles(run)).toEqual([conflicted]);
  });
});
