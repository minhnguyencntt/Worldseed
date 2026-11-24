import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { parseManifest, type AssetManifest } from '@game/assets/manifest';
import { ART_SOURCES } from '../src/art/sources';
import { generateAssets, mergeManifest } from '../src/lib/generateAssets';

// I/O is injected so the generator can be tested without touching the disk.
export interface ArtIo {
  assetsRoot: string;
  manifestPath: string;
  readText: (path: string) => string;
  write: (path: string, data: Uint8Array | string) => void;
}

const EMPTY_MANIFEST_TEXT = '{"version":1,"assets":[]}';

// Renders every art source to its PNG under assetsRoot and merges the described
// entries into the manifest. Output is deterministic: identical input gives identical bytes.
export function runGenerateArt(io: ArtIo): void {
  const { files, entries } = generateAssets(ART_SOURCES);

  for (const file of files) {
    io.write(`${io.assetsRoot}/${file.path}`, file.bytes);
  }

  const current = JSON.parse(io.readText(io.manifestPath)) as AssetManifest;
  const merged = mergeManifest(current, entries);
  const validated = parseManifest(merged);
  if (!validated.ok) {
    const details = validated.errors.map((e) => `${e.path}: ${e.message}`).join('; ');
    throw new Error(`generated manifest is invalid: ${details}`);
  }

  io.write(io.manifestPath, `${JSON.stringify(merged, null, 2)}\n`);
}

// Entry point: only runs as a CLI (npm run art:generate), not when imported by tests.
if (process.env.VITEST === undefined) {
  const manifestPath = 'public/assets/manifest.json';
  runGenerateArt({
    assetsRoot: 'public/assets',
    manifestPath,
    readText: (path) => (existsSync(path) ? readFileSync(path, 'utf8') : EMPTY_MANIFEST_TEXT),
    write: (path, data) => {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, data);
    },
  });
}
