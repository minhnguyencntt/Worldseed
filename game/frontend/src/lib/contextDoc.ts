/** Returns de-duplicated `game/` and `backend/` backticked paths in table rows, first-seen order. */
export function contextModulePaths(md: string): string[] {
  const out = new Set<string>();
  for (const l of md.split('\n')) {
    if (!l.startsWith('|')) continue;
    for (const m of l.matchAll(/`((?:game|backend)\/[^`\s]*)`/g)) out.add(m[1]);
  }
  return [...out];
}
