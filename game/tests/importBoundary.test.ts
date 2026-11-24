import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontendImports } from '../frontend/src/lib/importBoundary';

// Import boundary: game/src must never import from a frontend path segment.
const SRC = fileURLToPath(new URL('../src', import.meta.url));

// Recursively collects every .ts file path under dir.
function walkTs(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTs(full));
    else if (entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

describe('frontendImports', () => {
  it('reports a static import that reaches into frontend', () => {
    // Given a static import of a frontend module
    const text = "import x from '../../frontend/src/a'";
    // When its import specifiers are read
    // Then the frontend specifier is reported
    expect(frontendImports(text)).toEqual(['../../frontend/src/a']);
  });

  it('ignores a relative import that stays inside src', () => {
    // Given a relative import of a sibling module
    const text = "import y from './b'";
    // When its import specifiers are read
    // Then nothing is reported
    expect(frontendImports(text)).toEqual([]);
  });

  it('reports a dynamic import that reaches into frontend', () => {
    // Given a dynamic import of a frontend module
    const text = "const m = await import('../frontend/z')";
    // When its import specifiers are read
    // Then exactly one frontend specifier is reported
    expect(frontendImports(text)).toHaveLength(1);
  });

  it('finds no frontend import in any .ts file under src', () => {
    // Given every .ts file beneath game/src
    const files = walkTs(SRC);
    // When each file's text is scanned for frontend imports
    // Then no file reports one, and a failure names the offending file
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(frontendImports(readFileSync(file, 'utf8')), file).toEqual([]);
    }
  });
});
