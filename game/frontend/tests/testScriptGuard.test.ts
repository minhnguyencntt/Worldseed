import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
describe('package.json test script', () => {
  it('test script runs the guard before vitest', () => {
    const pkg = JSON.parse(
      readFileSync(fileURLToPath(new NodeURL('../package.json', import.meta.url)), 'utf8'),
    ) as {
      scripts: Record<string, string>;
    };
    const testScript = pkg.scripts.test;
    const guard = 'scripts/assertNoTrackedNodeModules.ts';

    expect(testScript).toContain(guard);
    expect(testScript.indexOf(guard)).toBeLessThan(testScript.indexOf('vitest run'));
    expect(testScript).toContain('&&');
  });
});
