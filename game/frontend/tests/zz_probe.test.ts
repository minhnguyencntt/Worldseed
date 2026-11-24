import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { it } from 'vitest';
it('probe', () => { const r = resolve(dirname(fileURLToPath(import.meta.url)), '../../..'); console.log('ROOT', r); });
