/**
 * Terms the repo-root context.md Stack section must contain (case-insensitive):
 * TypeScript, Phaser 3.90, React, Zustand, Radix and Vitest.
 * The repo-root context.md must contain every STACK_TERMS entry above.
 * context.md Stack must also name Go for backend/, checked by /\bGo\b/ and not a STACK_TERMS entry.
 */
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
 */
export const STALE_TEXT = ['hello Worldseed', 'Traceability index', 'Executable / server / CLI `main` | UNKNOWN'];

/** Returns the STALE_TEXT entries found in md (case-sensitive substring match); an empty array means no stale text. */
export function staleTextHits(md: string): string[] {
  return STALE_TEXT.filter((s) => md.includes(s));
}
