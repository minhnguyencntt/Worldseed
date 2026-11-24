import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only guard over the two asset roots. Nothing is written, started or fetched.
const ROOTS = [
  fileURLToPath(new URL('../public/assets', import.meta.url)),
  fileURLToPath(new URL('../frontend/public/assets', import.meta.url)),
];

// Recursively collects file paths under dir. A missing dir yields no files.
function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

describe('no placeholder svgs', () => {
  it('holds no .svg file under any asset root', () => {
    // Given both asset roots (missing roots are skipped)
    // When every file beneath them is listed
    const svgs = ROOTS.flatMap(walkFiles).filter((f) => f.endsWith('.svg'));
    // Then no svg file remains
    expect(svgs).toEqual([]);
  });

  it('keeps every manifest.json free of .svg references', () => {
    // Given every manifest.json beneath the asset roots
    const manifests = ROOTS.flatMap(walkFiles).filter((f) => f.endsWith('manifest.json'));
    // Then each manifest's text does not mention '.svg'
    for (const file of manifests) {
      expect(readFileSync(file, 'utf8'), file).not.toContain('.svg');
    }
  });
});
