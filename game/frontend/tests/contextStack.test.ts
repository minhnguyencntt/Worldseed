import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contextStackProblems, missingTerms, staleTextHits, STACK_TERMS } from '../src/lib/docsCheck';

describe('context.md stack and stale text', () => {
  // new URL(rel, import.meta.url) resolves to http://localhost under vitest's jsdom env, so build the root from the file path.
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
  const text = readFileSync(join(root, 'context.md'), 'utf8');

  it('names every required stack term in the repo-root context.md', () => {
    expect(missingTerms(text, STACK_TERMS)).toEqual([]);
  });

  it('names Go for the backend in the repo-root context.md', () => {
    expect(text).toMatch(/\bGo\b/);
  });

  it('contains no stale README-only text in the repo-root context.md', () => {
    expect(staleTextHits(text)).toEqual([]);
  });

  it('leaves no UNKNOWN placeholders in the repo-root context.md', () => {
    expect(text).not.toMatch(/UNKNOWN/);
  });

  it('has no stack problems in the repo-root context.md', () => {
    expect(contextStackProblems(text)).toEqual([]);
  });

  it('has no problems when UNKNOWN is absent', () => {
    // Regression guard: the real file must keep reporting no stack problems once UNKNOWN placeholders are gone.
    expect(contextStackProblems(text)).toEqual([]);
  });
});
