import { describe, it, expect } from 'vitest';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks against the real asset tree. Nothing is written or started.
// The asset folders live under game/frontend/public/assets (the step's
// game/public/assets only holds the manifest), so that is the root used here.
const root = fileURLToPath(new URL('../frontend/public/assets', import.meta.url));

const FOLDERS = [
  'worlds/the-boys-room/backgrounds',
  'worlds/the-boys-room/furniture',
  'worlds/the-boys-room/objects',
  'worlds/the-boys-room/characters',
  'worlds/the-boys-room/effects',
  'worlds/the-boys-room/audio',
  'ui/icons',
  'ui/frames',
  'ui/cursors',
];

describe('asset folders', () => {
  it.each(FOLDERS)('%s holds a real file', (dir) => {
    // Given an asset folder in the real tree
    // When its entries are listed
    const files = readdirSync(join(root, dir));
    // Then it holds at least one entry, and every entry is non-empty
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) expect(statSync(join(root, dir, f)).size).toBeGreaterThan(0);
  });
});
