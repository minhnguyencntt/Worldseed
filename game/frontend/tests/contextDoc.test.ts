import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contextModulePaths } from '../src/lib/contextDoc';
import { missingPaths, missingTerms, STACK_TERMS } from '../src/lib/docsCheck';

describe('context.md', () => {
  it('extracts only game/ and backend/ paths from table rows, in first-seen order', () => {
    const md = '| a | `game/src/` and `backend/x` |\n| b | `README.md` |';
    expect(contextModulePaths(md)).toEqual(['game/src/', 'backend/x']);
  });

  it('names the stack and references only existing module paths in the repo-root context.md', () => {
    // new URL(rel, import.meta.url) resolves to http://localhost under vitest's jsdom env, so build the root from the file path.
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
    const text = readFileSync(join(root, 'context.md'), 'utf8');
    expect(missingTerms(text, STACK_TERMS)).toEqual([]);
    expect(missingPaths(contextModulePaths(text), (p) => existsSync(join(root, p)))).toEqual([]);
    expect(text).not.toMatch(/Frameworks: UNKNOWN/);
  });
});
