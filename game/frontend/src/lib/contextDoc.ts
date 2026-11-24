/**
 * Returns de-duplicated repo-root-relative `game/` and `backend/` backticked paths in table rows, first-seen order; each must exist on disk.
 *
 * The context.md module table must list these required rows:
 * - `game/src/`
 * - `game/frontend/src/`
 * - `game/docs/GDD.md`
 * - `backend/`
 * Each returned path is checked with missingPaths against the repo root.
 * Paths are returned exactly as written in the table, trailing slash kept, so each resolves against the repo root.
 * It returns backticked paths from table rows starting with '|', keeping the trailing slash on directories such as game/src/ and backend/.
 */
export function contextModulePaths(md: string): string[] {
  const out = new Set<string>();
  for (const l of md.split('\n')) {
    if (!l.startsWith('|')) continue;
    for (const m of l.matchAll(/`((?:game|backend)\/[^`\s]*)`/g)) out.add(m[1]);
  }
  return [...out];
}
