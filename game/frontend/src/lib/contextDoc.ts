/**
 * Returns de-duplicated repo-root-relative `game/` and `backend/` backticked paths in table rows, first-seen order; each must exist on disk.
 *
 * The context.md module table must list these required rows:
 * - `game/src/`
 * - `game/frontend/src/`
 * - `game/docs/GDD.md`
 * - `backend/`
 */
export function contextModulePaths(md: string): string[] {
  const out = new Set<string>();
  for (const l of md.split('\n')) {
    if (!l.startsWith('|')) continue;
    for (const m of l.matchAll(/`((?:game|backend)\/[^`\s]*)`/g)) out.add(m[1]);
  }
  return [...out];
}
