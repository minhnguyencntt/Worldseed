import { describe, expect, it } from 'vitest';
import { indexedPaths, missingPaths, missingTerms, staleTextHits, STACK_TERMS } from '../src/lib/docsCheck';

describe('docsCheck', () => {
  it('returns each backticked path from a table row once, and ignores paths outside table rows', () => {
    expect(indexedPaths('| Input | `game/a/b.ts`, `game/a/b.ts` |')).toEqual(['game/a/b.ts']);
    expect(indexedPaths('Plain prose mentioning `game/a/b.ts` outside a table.')).toEqual([]);
  });

  it('reports only the paths the fake exists predicate rejects', () => {
    const known = new Set(['x/a.ts']);
    expect(missingPaths(['x/a.ts', 'x/b.ts'], (p) => known.has(p))).toEqual(['x/b.ts']);
  });

  it('reports only the stack terms that the text does not mention, ignoring case', () => {
    expect(missingTerms('typescript phaser 3.90 react zustand radix', STACK_TERMS)).toEqual(['Vitest']);
  });

  describe('missingTerms', () => {
    it('reports TypeScript when absent', () => {
      expect(missingTerms('Phaser 3.90 React Zustand Radix Vitest', STACK_TERMS)).toEqual(['TypeScript']);
    });

    it('accepts every stack term in any case', () => {
      expect(missingTerms('typescript PHASER 3.90 react zustand radix vitest', STACK_TERMS)).toEqual([]);
    });
  });

  it('staleTextHits finds README-only phrases', () => {
    expect(staleTextHits('hello Worldseed')).toEqual(['hello Worldseed']);
    expect(staleTextHits('## Stack\nTypeScript')).toEqual([]);
  });
});
