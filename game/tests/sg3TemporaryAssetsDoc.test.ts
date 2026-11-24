import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks of the replacement document against the real manifest.
// Nothing is written, no app is started, and there is no network access.
const gameRoot = fileURLToPath(new URL('..', import.meta.url));
const docPath = join(gameRoot, 'docs/temporary-assets.md');
const manifestPath = join(gameRoot, 'public/assets/worlds/the-boys-room/manifest.json');

const doc = readFileSync(docPath, 'utf8');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
  assets: Array<{ id: string }>;
};

const DOC_ID_PREFIXES = ['background:', 'furniture:', 'character:', 'effect:', 'objects/'];

describe('temporary assets doc', () => {
  it('states that the assets are temporary and not production-quality', () => {
    expect(doc).toMatch(/temporary/i);
    expect(doc).toMatch(/not production/i);
  });

  it('does not claim the artwork is production-ready', () => {
    expect(doc).not.toMatch(/production-ready|production quality artwork is included/i);
  });

  it.each(['Backgrounds', 'Furniture', 'Objects', 'Characters', 'Effects'])(
    'has a "%s" section heading',
    (heading) => {
      expect(doc).toMatch(new RegExp(`^#{1,6}\\s+${heading}\\s*$`, 'm'));
    },
  );

  it('lists every manifest id for backgrounds, furniture, characters, effects and objects', () => {
    const ids = manifest.assets
      .map((asset) => asset.id)
      .filter((id) => DOC_ID_PREFIXES.some((prefix) => id.startsWith(prefix)));

    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      expect(doc, `doc is missing manifest id ${id}`).toContain(`\`${id}\``);
    }
  });
});
