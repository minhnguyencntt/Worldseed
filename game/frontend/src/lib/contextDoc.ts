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

export const REQUIRED_MODULE_PATHS = ['game/src/', 'game/frontend/src/', 'game/docs/GDD.md', 'backend/'];

/** Returns 'missing required path: <p>' for each REQUIRED_MODULE_PATHS entry absent from the table, then 'path not found: <p>' for each listed path with exists(p) false; [] means the table passes. The repo-root context.md must return [] here, so every table path exists. */
export function contextModuleProblems(md: string, exists: (p: string) => boolean): string[] {
  const paths = contextModulePaths(md);
  return [
    ...REQUIRED_MODULE_PATHS.filter((p) => !paths.includes(p)).map((p) => `missing required path: ${p}`),
    ...paths.filter((p) => !exists(p)).map((p) => `path not found: ${p}`),
  ];
}
