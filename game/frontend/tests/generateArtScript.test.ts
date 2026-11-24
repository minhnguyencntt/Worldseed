import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { ART_SOURCES } from '../src/art/sources';
import { readPngSize } from '../src/lib/pngEncode';
// Planned Act module: the CLI wrapper around generateAssets/mergeManifest. Not present yet.
import { runGenerateArt } from '../scripts/generateArt';

const ASSETS_ROOT = 'public/assets';
const MANIFEST_PATH = 'public/assets/manifest.json';
const MANIFEST_TEXT = '{"version":1,"assets":[]}';

// Fake io: every write lands in a Map keyed by path; reads come from the seeded manifest text.
// Assumed contract (no Atlas spec defines it yet): io = { assetsRoot, manifestPath, readText, write }.
function fakeIo() {
  const writes = new Map<string, Uint8Array | string>();
  const io = {
    assetsRoot: ASSETS_ROOT,
    manifestPath: MANIFEST_PATH,
    readText: (path: string): string => {
      if (path !== MANIFEST_PATH) throw new Error(`unexpected read: ${path}`);
      return MANIFEST_TEXT;
    },
    write: (path: string, data: Uint8Array | string): void => {
      writes.set(path, data);
    },
  };
  return { io, writes };
}

describe('runGenerateArt', () => {
  // Given the same manifest input, two runs must write byte-identical binary outputs.
  describe('when it runs twice on the same input', () => {
    it('writes every binary entry with identical bytes on the second run', async () => {
      const first = fakeIo();
      const second = fakeIo();
      await runGenerateArt(first.io);
      await runGenerateArt(second.io);

      const binaryPaths = [...first.writes.keys()].filter((path) => path.endsWith('.png'));
      expect(binaryPaths.length).toBeGreaterThan(0);
      for (const path of binaryPaths) {
        expect(second.writes.get(path)).toEqual(first.writes.get(path));
      }
    });
  });

  // Given the generated PNGs, each manifest entry must declare the size its PNG header actually has.
  describe('when it writes the manifest', () => {
    it('declares dimensions equal to the PNG header of each ART_SOURCES file and ends with a newline', async () => {
      const { io, writes } = fakeIo();
      await runGenerateArt(io);

      const manifestText = writes.get(MANIFEST_PATH);
      expect(typeof manifestText).toBe('string');
      const text = manifestText as string;
      expect(text.endsWith('\n')).toBe(true);

      const manifest = JSON.parse(text) as {
        assets: { id: string; path: string; dimensions: { width: number; height: number } }[];
      };
      for (const source of ART_SOURCES) {
        const entry = manifest.assets.find((asset) => asset.id === source.id);
        expect(entry, `manifest entry for ${source.id}`).toBeDefined();
        const png = writes.get(`${ASSETS_ROOT}/${source.path}`);
        expect(png).toBeInstanceOf(Uint8Array);
        expect(entry!.dimensions).toEqual(readPngSize(png as Uint8Array));
      }
    });
  });

  // Given package.json, the art:generate script must run the generator through vite-node.
  describe('when package.json is read', () => {
    it('registers art:generate as vite-node scripts/generateArt.ts', () => {
      const pkg = JSON.parse(
        // process.cwd() is the frontend root (npm scripts run there); import.meta.url is not a file URL under jsdom.
        readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
      ) as { scripts: Record<string, string> };
      expect(pkg.scripts['art:generate']).toBe('vite-node scripts/generateArt.ts');
    });
  });
});
