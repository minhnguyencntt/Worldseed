import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseManifest } from '../src/assets/manifest';

// Read-only checks over the real the-boys-room manifest and the ui SVG files.
// Nothing is written, no app is started, and there is no network access.
const publicRoot = fileURLToPath(new URL('../public/assets', import.meta.url));
const manifestPath = join(publicRoot, 'worlds/the-boys-room/manifest.json');

const uiIds = ['ui:icon-sound', 'ui:panel-frame', 'ui:cursor-pointer'] as const;

const raw: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'));

function findEntry(id: string) {
  const parsed = parseManifest(raw);
  if (!parsed.ok) throw new Error('manifest failed validation');
  return parsed.data.assets.find((asset) => asset.id === id);
}

describe('ui manifest entries', () => {
  it('the-boys-room manifest passes parseManifest validation', () => {
    const result = parseManifest(raw);

    expect(result.ok, JSON.stringify(result.ok ? null : result.errors)).toBe(true);
  });

  it.each(uiIds)('%s entry exists in the manifest', (id) => {
    expect(findEntry(id), id).toBeDefined();
  });

  it.each(uiIds)('%s path resolves to an existing file under public/assets', (id) => {
    const entry = findEntry(id);

    expect(entry).toBeDefined();
    expect(existsSync(join(publicRoot, entry!.path)), entry!.path).toBe(true);
  });

  it.each(uiIds)('%s svg width and height attributes match manifest dimensions', (id) => {
    const entry = findEntry(id);
    expect(entry).toBeDefined();

    const content = readFileSync(join(publicRoot, entry!.path), 'utf8');
    const width = Number(/<svg[^>]*\swidth="(\d+)"/.exec(content)?.[1]);
    const height = Number(/<svg[^>]*\sheight="(\d+)"/.exec(content)?.[1]);

    expect(entry!.dimensions, `${id} dimensions`).toBeDefined();
    expect({ width, height }, id).toEqual(entry!.dimensions);
  });
});
