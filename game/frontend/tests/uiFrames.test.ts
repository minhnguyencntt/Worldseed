import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { FRAME_KIT, buildFrameGrid } from '../src/art/uiFrames';
import { PALETTE } from '../src/lib/palette';
import { readPngSize } from '../src/lib/pngEncode';

const PUBLIC_DIR = resolve(__dirname, '../../public');
const MANIFEST_PATH = join(PUBLIC_DIR, 'assets/worlds/the-boys-room/manifest.json');

interface ManifestEntry {
  id: string;
  path: string;
  type?: string;
  dimensions?: { width: number; height: number };
}

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

describe('interface frame kit art', () => {
  it('grids: every frame is h rows of w integer palette indices with a valid slice', () => {
    for (const spec of FRAME_KIT) {
      const grid = buildFrameGrid(spec);
      expect(grid, spec.id).toHaveLength(spec.h);
      for (const row of grid) {
        expect(row, spec.id).toHaveLength(spec.w);
        for (const v of row) {
          expect(Number.isInteger(v), spec.id).toBe(true);
          expect(v >= 0 && v < PALETTE.length, spec.id).toBe(true);
        }
      }
      expect(spec.slice * 2 < Math.min(spec.w, spec.h), spec.id).toBe(true);
    }
  });

  it('ids: include bar, panel, plaque, parchment, slot and the four button states', () => {
    const ids = FRAME_KIT.map((f) => f.id);
    for (const id of [
      'ui/frame-bar',
      'ui/frame-panel',
      'ui/frame-plaque',
      'ui/frame-parchment',
      'ui/frame-slot',
      'ui/frame-button-normal',
      'ui/frame-button-hover',
      'ui/frame-button-pressed',
      'ui/frame-button-disabled',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('determinism: two builds of each frame produce equal grids', () => {
    for (const spec of FRAME_KIT) {
      expect(buildFrameGrid(spec), spec.id).toEqual(buildFrameGrid(spec));
    }
  });

  it('manifest and files match', () => {
    const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as { assets: ManifestEntry[] };
    const entries = manifest.assets ?? (manifest as unknown as ManifestEntry[]);

    for (const spec of FRAME_KIT) {
      const entry = entries.find((e) => e.id === spec.id);
      expect(entry, `manifest entry for ${spec.id}`).toBeDefined();
      expect(entry!.dimensions, spec.id).toEqual({ w: spec.w, h: spec.h } as unknown as ManifestEntry['dimensions']);
      const bytes = new Uint8Array(readFileSync(join(PUBLIC_DIR, 'assets', entry!.path)));
      expect(readPngSize(bytes), spec.id).toEqual({ width: spec.w, height: spec.h });
    }

    expect(entries.some((e) => e.id === 'ui/cursor-hand')).toBe(true);
  });

  it('no old SVG panel-frame, sound or pointer files remain under game/public', () => {
    const offenders = walk(PUBLIC_DIR).filter((p) => /panel-frame|sound|pointer/.test(p.split('/').pop() ?? '') && p.endsWith('.svg'));
    expect(offenders).toEqual([]);
  });
});
