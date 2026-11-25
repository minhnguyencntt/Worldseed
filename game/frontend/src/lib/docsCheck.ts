/** docsCheck owns STACK_TERMS, STALE_TEXT, staleTextHits and contextStackProblems; contextStackProblems checks STACK_TERMS, the \bGo\b rule, STALE_TEXT and the UNKNOWN ban against the repo-root context.md, and the repo-root context.md must pass contextStackProblems with []. (imported by docsCheck.test.ts and contextStack.test.ts) */

/** Stack terms required in repo-root context.md (case-insensitive). Go is checked separately by /\bGo\b/; no UNKNOWN token is allowed. */
export const STACK_TERMS = ['TypeScript', 'Phaser 3.90', 'React', 'Zustand', 'Radix', 'Vitest'];

const PATH_RE = /`([^`\s]+\/[^`\s]+\.[a-z]+)`/g;

/** Returns the de-duplicated backticked file paths in table rows (lines starting with '|'), in first-seen order. */
export function indexedPaths(md: string): string[] {
  const seen = new Set<string>();
  for (const line of md.split('\n')) {
    if (!line.startsWith('|')) continue;
    for (const m of line.matchAll(PATH_RE)) seen.add(m[1]);
  }
  return [...seen];
}

/** Returns the paths for which exists(p) is false; applied to contextModulePaths(md) with exists = existsSync from the repo root, so every context.md module-table path (game/src/, game/frontend/src/, game/docs/GDD.md, backend/) must exist. */
export function missingPaths(paths: string[], exists: (p: string) => boolean): string[] {
  return paths.filter((p) => !exists(p));
}

/** Returns the terms not found in text (case-insensitive). */
export function missingTerms(text: string, terms: string[]): string[] {
  const t = text.toLowerCase();
  return terms.filter((x) => !t.includes(x.toLowerCase()));
}

/**
 * Strings the repo-root context.md must not contain (stale README-only text).
 * The repo-root context.md must have none of these strings and no UNKNOWN placeholder.
 * Note: 'Frameworks: UNKNOWN' is not in this list; it is checked by the test regex instead.
 * The rewritten context.md must also contain no UNKNOWN placeholder.
 * 'no application', 'echo no build' and 'echo no test' are README-only text that must not appear in the repo-root context.md.
 */
export const STALE_TEXT = ['hello Worldseed', 'Traceability index', 'Bidirectional links', 'Executable / server / CLI `main` | UNKNOWN', 'no application', 'echo no build', 'echo no test'];

/** Returns the STALE_TEXT entries found in md (case-sensitive substring match); an empty array means no stale text. */
export function staleTextHits(md: string): string[] {
  return STALE_TEXT.filter((s) => md.includes(s));
}

/** Returns, in order: 'missing term: <t>' per missing STACK_TERMS entry, 'missing Go', 'stale text: <s>' per STALE_TEXT hit, 'UNKNOWN placeholder'; [] means the text passes. */
export function contextStackProblems(md: string): string[] {
  const out = missingTerms(md, STACK_TERMS).map((t) => `missing term: ${t}`);
  if (!/\bGo\b/.test(md)) out.push('missing Go');
  out.push(...staleTextHits(md).map((s) => `stale text: ${s}`));
  if (/UNKNOWN/.test(md)) out.push('UNKNOWN placeholder');
  return out;
}
