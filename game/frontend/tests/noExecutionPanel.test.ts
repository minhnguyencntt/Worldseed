import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';

it('ExecutionPanel.tsx is deleted', () => {
  expect(existsSync(join(process.cwd(), 'src/components/ExecutionPanel.tsx'))).toBe(false);
});
