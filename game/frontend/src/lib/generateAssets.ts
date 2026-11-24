import { parseAsset, type AssetEntry } from '@game/assets/manifest';
import type { ArtSource } from '../art/sources';
import { encodePng } from './pngEncode';
import { gridToRgba } from './gridToRgba';
import { PALETTE } from './palette';
import { buildSpriteSheet } from './spriteSheet';

export type ManifestEntry = AssetEntry;

export interface GeneratedFile {
  path: string;
  bytes: Uint8Array;
}

export interface GeneratedAssets {
  files: GeneratedFile[];
  entries: ManifestEntry[];
}

// Renders every source to a PNG (one frame, or a horizontal sprite sheet for several frames)
// and describes each output as a manifest entry. Pure: no I/O, no clock.
export function generateAssets(sources: readonly ArtSource[], palette: readonly string[] = PALETTE): GeneratedAssets {
  const files: GeneratedFile[] = [];
  const entries: ManifestEntry[] = [];

  // Validates a built entry with parseAsset and throws a readable error on failure.
  const accept = (entry: ManifestEntry): ManifestEntry => {
    const result = parseAsset(entry);
    if (!result.ok) {
      throw new Error(
        `invalid manifest entry ${entry.id}: ` +
          result.errors.map((e) => `${e.path}: ${e.message}`).join('; '),
      );
    }
    return result.data;
  };

  for (const source of sources) {
    const sheet = buildSpriteSheet(source.frames.map((grid) => gridToRgba(grid, palette)));
    const dimensions = { width: sheet.width, height: sheet.height };
    files.push({ path: source.path, bytes: encodePng(sheet) });

    if (sheet.frameCount > 1) {
      entries.push(
        accept({
          id: source.id,
          path: source.path,
          type: 'spritesheet',
          dimensions,
          frames: {
            frameWidth: sheet.frameWidth,
            frameHeight: sheet.frameHeight,
            frameCount: sheet.frameCount,
          },
          ...(source.animations ? { animations: source.animations } : {}),
          ...(source.origin ? { origin: source.origin } : {}),
        }),
      );
    } else {
      entries.push(
        accept({
          id: source.id,
          path: source.path,
          type: 'image',
          dimensions,
          ...(source.animations ? { animations: source.animations } : {}),
          ...(source.origin ? { origin: source.origin } : {}),
        }),
      );
    }
  }

  return { files, entries };
}

// Returns a new manifest: an entry whose id matches an existing asset replaces it in place,
// unmatched entries are appended in order, and all other assets are kept unchanged.
export function mergeManifest<M extends { version: number; assets: ManifestEntry[] }>(
  manifest: M,
  entries: readonly ManifestEntry[],
): M {
  const incoming = new Map<string, ManifestEntry>();
  for (const entry of entries) incoming.set(entry.id, entry);

  const existingIds = new Set(manifest.assets.map((asset) => asset.id));
  const replaced = manifest.assets.map((asset) => incoming.get(asset.id) ?? asset);
  const appended = [...incoming.values()].filter((entry) => !existingIds.has(entry.id));

  return { ...manifest, assets: [...replaced, ...appended] };
}
