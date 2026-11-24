/** Terms the repo-root context.md Stack section must contain (case-insensitive); the Go backend is listed there as out of scope. */
export const STACK_TERMS = ['Phaser 3.90', 'React', 'Zustand', 'Radix', 'Vitest'];

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

/** Returns the paths for which exists(p) is false. */
export function missingPaths(paths: string[], exists: (p: string) => boolean): string[] {
  return paths.filter((p) => !exists(p));
}

/** Returns the terms not found in text (case-insensitive). */
export function missingTerms(text: string, terms: string[]): string[] {
  const t = text.toLowerCase();
  return terms.filter((x) => !t.includes(x.toLowerCase()));
}
