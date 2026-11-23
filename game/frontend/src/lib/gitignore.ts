export function isIgnoredByDirRule(ignoreText: string, path: string): boolean {
  const dirs = path.split('/').slice(0, -1);
  for (const raw of ignoreText.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || !line.endsWith('/')) continue;
    const rule = line.slice(0, -1);
    if (rule.includes('/') ? path.startsWith(rule + '/') : dirs.includes(rule)) return true;
  }
  return false;
}
