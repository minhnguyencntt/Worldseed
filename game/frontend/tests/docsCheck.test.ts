import { describe, expect, it } from 'vitest';
import { contextStackProblems, indexedPaths, missingPaths, missingTerms, staleTextHits, STACK_TERMS } from '../src/lib/docsCheck';

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

  it('flags no application, echo no build and echo no test', () => {
    expect(staleTextHits('There is no application here')).toEqual(['no application']);
    expect(staleTextHits('echo no build\necho no test')).toEqual(['echo no build', 'echo no test']);
    expect(staleTextHits('# Real stack')).toEqual([]);
  });

  it('missingTerms is empty when every STACK_TERMS entry is named', () => {
    const text = STACK_TERMS.join(' ');
    expect(missingTerms(text, STACK_TERMS)).toEqual([]);
    expect(missingTerms('React only', STACK_TERMS)).toContain('Zustand');
  });
});

describe('contextStackProblems', () => {
  it('reports missing stack terms, missing Go, stale text and UNKNOWN placeholders', () => {
    expect(contextStackProblems('Phaser 3.90 React Zustand Radix')).toEqual([
      'missing term: TypeScript',
      'missing term: Vitest',
      'missing Go',
    ]);
    expect(contextStackProblems('TypeScript Phaser 3.90 React Zustand Radix Vitest Go hello Worldseed UNKNOWN')).toEqual([
      'stale text: hello Worldseed',
      'UNKNOWN placeholder',
    ]);
  });

  it('yields no problems for a complete text', () => {
    expect(contextStackProblems('TypeScript Phaser 3.90 React Zustand Radix Vitest Go')).toEqual([]);
  });
});
