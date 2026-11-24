import { describe, it, expect } from 'vitest';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks against the real asset tree. Nothing is written or started.
// Vite serves the app assets from game/public (Act UNIT-814 pointed publicDir there and
// UNIT-815 removed the stale game/frontend/public copies), so that is the root used here.
const root = fileURLToPath(new URL('../public/assets', import.meta.url));

// Folders that exist in the real tree. The old backgrounds/furniture/icons/frames folders
// were removed with the placeholder assets, so they are no longer expected.
const FOLDERS = [
  'worlds/the-boys-room/room',
  'worlds/the-boys-room/objects',
  'worlds/the-boys-room/characters',
  'worlds/the-boys-room/effects',
  'worlds/the-boys-room/audio',
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
