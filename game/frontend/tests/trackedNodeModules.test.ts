import { describe, expect, it } from 'vitest';
import { trackedNodeModulesPaths } from '../src/lib/trackedNodeModules';

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
