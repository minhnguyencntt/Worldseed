export function trackedNodeModulesPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').includes('node_modules'));
}

export function parseGitLsFiles(output: string): string[] {
  return output.split('\0').filter((p) => p.length > 0);
}

export type GitRunner = (args: string[]) => string;

export function checkTrackedFiles(run: GitRunner): string[] {
  const files = parseGitLsFiles(run(['ls-files', '-z']));
  const deps = new Set(trackedNodeModulesPaths(files));
  return files.filter((p) => deps.has(p) || p.includes('.vite/vitest/'));
}

export function untrackNodeModules(run: GitRunner): void {
  run(['rm', '-r', '--cached', '--ignore-unmatch', '-q', '--', 'node_modules']);
  run(['rm', '--cached', '--ignore-unmatch', '-q', '--', 'node_modules/.vite/vitest/results.json']);
}

export function assertNoTrackedNodeModules(paths: string[]): void {
  const bad = trackedNodeModulesPaths(paths);
  if (bad.length > 0) throw new Error(`${bad.length} tracked node_modules paths: ${bad.slice(0, 10).join(', ')}`);
}
