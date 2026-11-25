/**
 * Returns the de-duplicated backticked `game/` and `backend/` paths found in markdown table rows (lines starting with '|'), in first-seen order.
 *
 * The context.md module table must list these four required rows:
 * - `game/src/`
 * - `game/frontend/src/`
 * - `game/docs/GDD.md`
 * - `backend/`
 *
 * Paths are returned exactly as written, trailing slash kept, so each resolves against the repo root.
 * `backend/` is the Go service and is listed as out of scope; every returned path must exist at the repo root.
 * The `game/docs/GDD.md` row is required: that file must exist on disk.
 * Only table rows (lines starting with |) are read; other lines are ignored. Each returned path is passed to missingPaths against the repo root.
 */
export function contextModulePaths(md: string): string[] {
  const out = new Set<string>();
  for (const l of md.split('\n')) {
    if (!l.startsWith('|')) continue;
    for (const m of l.matchAll(/`((?:game|backend)\/[^`\s]*)`/g)) out.add(m[1]);
  }
  return [...out];
}
