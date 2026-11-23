import { describe, it, expect } from 'vitest';
import config from '../vitest.config';

// Reads the config object only: no test run, no filesystem or server access.
describe('vitest config', () => {
  it('maps the @game alias to the src directory', () => {
    // Given the exported vitest config
    // When the @game alias is read
    const alias = config.resolve?.alias as Record<string, string>;
    // Then it points at the src directory
    expect(alias['@game'].endsWith('/src')).toBe(true);
  });

  it('includes tests/**/*.test.ts in the test file glob', () => {
    // Given the exported vitest config
    // When the test include list is read
    const include = config.test?.include as string[];
    // Then it contains the tests glob
    expect(include).toContain('tests/**/*.test.ts');
  });
});
