import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { runGuard } from '../scripts/assertNoTrackedNodeModules';

describe('runGuard', () => {
  it('returns 1 and logs the offending path when a node_modules file is tracked', () => {
    // Given a fake git runner that reports one tracked node_modules file,
    // when the guard runs,
    // then it returns 1 and logs the offending path.
    const run = vi.fn((_a: string[]) => 'node_modules/x.js\0');
    const log = vi.fn();

    expect(runGuard(run, log)).toBe(1);
    expect(log).toHaveBeenCalledWith('node_modules/x.js');
  });

  it('returns 0 and logs nothing when no node_modules file is tracked', () => {
    // Given a fake git runner that reports only source files,
    // when the guard runs,
    // then it returns 0 and does not log.
    const run = vi.fn((_a: string[]) => 'src/a.ts\0');
    const log = vi.fn();

    expect(runGuard(run, log)).toBe(0);
    expect(log).not.toHaveBeenCalled();
  });
});

describe('guard script', () => {
  it('guard script exists', () => {
    // Given the guard script on disk,
    // when its source is read,
    // then it defines runGuard and exits the process with an explicit status.
    const source = readFileSync(join(import.meta.dirname, '../scripts/assertNoTrackedNodeModules.ts'), 'utf8');

    expect(source).toContain('runGuard');
    expect(source).toContain('process.exit');
  });
});
