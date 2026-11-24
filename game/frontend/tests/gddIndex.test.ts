import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { indexedPaths, missingPaths } from '../src/lib/docsCheck';

const root = fileURLToPath(new NodeURL('../../../', import.meta.url));
const md = readFileSync(join(root, 'game/docs/GDD.md'), 'utf8');

const HEADER = '| Feature | Code files |';

function featureRows(text: string): string[] {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => l.trim() === HEADER);
  if (start < 0) return [];
  const rows: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('| ')) rows.push(line);
  }
  // Drop the markdown separator row (| --- | --- |) if it was captured.
  return rows.filter((l) => !/^\|\s*-{3,}/.test(l));
}

describe('GDD feature index', () => {
  it('lists at least 14 feature rows under the Feature | Code files header', () => {
    expect(featureRows(md).length).toBeGreaterThanOrEqual(14);
  });

  it('references only code paths that exist in the repository', () => {
    const paths = indexedPaths(md);
    expect(paths.length).toBeGreaterThan(0);
    expect(missingPaths(paths, (p) => existsSync(join(root, p)))).toEqual([]);
  });
});
