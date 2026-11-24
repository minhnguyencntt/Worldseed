// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('package.json UI stack manifest', () => {
  it('package.json lists the UI stack', () => {
    // Given the frontend package.json on disk,
    // when it is parsed,
    // then runtime dependencies and styling dev dependencies for the UI stack are declared.
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    ) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };

    const deps = Object.keys(pkg.dependencies ?? {});
    const devDeps = Object.keys(pkg.devDependencies ?? {});

    for (const name of [
      'lucide-react',
      'motion',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
    ]) {
      expect(deps).toContain(name);
    }

    for (const name of ['tailwindcss', 'postcss', 'autoprefixer']) {
      expect(devDeps).toContain(name);
    }
  });
});
