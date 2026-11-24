import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
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

export interface ArtPaths {
  assetsRoot: string;
  manifestPath: string;
}

// Resolves the assets root and app manifest path relative to the script directory.
export function defaultArtPaths(scriptDir: string): ArtPaths {
  const assetsRoot = resolve(scriptDir, '../../public/assets');
  return { assetsRoot, manifestPath: resolve(assetsRoot, 'worlds/the-boys-room/manifest.json') };
}

export interface FsLike {
  readFileSync(p: string, enc: 'utf8'): string;
  writeFileSync(p: string, d: Uint8Array | string): void;
  mkdirSync(p: string, o: { recursive: true }): void;
}

// Builds an ArtIo over an injected fs. readText has no existence fallback: a missing manifest is an error.
export function createFsIo(paths: ArtPaths, fs: FsLike): ArtIo {
  return {
    assetsRoot: paths.assetsRoot,
    manifestPath: paths.manifestPath,
    readText: (path) => fs.readFileSync(path, 'utf8'),
    write: (path, data) => {
      fs.mkdirSync(dirname(path), { recursive: true });
      fs.writeFileSync(path, data);
    },
  };
}

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
  runGenerateArt(createFsIo(defaultArtPaths(dirname(fileURLToPath(import.meta.url))), { readFileSync, writeFileSync, mkdirSync }));
}
