export function trackedNodeModulesPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').includes('node_modules'));
}

export function assertNoTrackedNodeModules(paths: string[]): void {
  const bad = trackedNodeModulesPaths(paths);
  if (bad.length > 0) throw new Error(`${bad.length} tracked node_modules paths: ${bad.slice(0, 10).join(', ')}`);
}

export type GitRunner = (args: string[]) => string;

export function untrackNodeModules(run: GitRunner): void {
  run(['rm', '-r', '--cached', '--ignore-unmatch', '-q', '--', 'node_modules']);
  run(['rm', '--cached', '--ignore-unmatch', '-q', '--', 'node_modules/.vite/vitest/results.json']);
}
