import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { countLines, overLimit } from '../frontend/src/lib/sourceSize';

// Source size rule: no hand-written .ts/.tsx source file may exceed 200 lines.
const ROOTS = [
  fileURLToPath(new URL('../src', import.meta.url)),
  fileURLToPath(new URL('../frontend/src', import.meta.url)),
];

// Recursively collects .ts and .tsx file paths under dir, skipping node_modules.
function walkSource(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkSource(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe('sourceSize', () => {
  it('flags files over the limit', () => {
    // Given files at 200 and 201 lines, When checked against a 200-line limit,
    // Then only the 201-line file is reported.
    expect(overLimit([{ path: 'a', lines: 200 }, { path: 'b', lines: 201 }], 200)).toEqual(['b']);
  });

  it('countLines', () => {
    // Given a two-line text with a trailing newline, Then it counts 2 lines.
    expect(countLines('a\nb\n')).toBe(2);
  });

  it('no source file exceeds 200 lines', () => {
    // Given every .ts/.tsx file under src and frontend/src,
    // When each file's line count is checked against 200,
    // Then no file is reported over the limit.
    const files = ROOTS.flatMap(walkSource).map((path) => ({
      path,
      lines: countLines(readFileSync(path, 'utf8')),
    }));
    expect(files.length).toBeGreaterThan(0);
    expect(overLimit(files, 200)).toEqual([]);
  });
});
