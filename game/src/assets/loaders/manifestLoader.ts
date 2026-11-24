import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseManifest, type ParseResult, type ManifestIssue, type AssetManifest, type AssetEntry } from '../manifest';

// Reads a manifest JSON file from disk, validates its shape, then checks that
// every asset's file exists under assetsRoot. Never throws.
export function loadManifestFile(manifestPath: string, assetsRoot: string): ParseResult<AssetManifest> {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch {
    return { ok: false, errors: [{ path: 'manifest', message: `cannot read manifest: ${manifestPath}` }] };
  }

  const parsed = parseManifest(raw);
  if (!parsed.ok) {
    return parsed;
  }

  const errors: ManifestIssue[] = [];
  parsed.data.assets.forEach((asset, index) => {
    if (!existsSync(join(assetsRoot, asset.path))) {
      errors.push({ path: `assets.${index}.path`, message: `missing asset file: ${asset.path}` });
    }
  });

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, data: parsed.data };
}

export const FALLBACK_ASSET_ID = 'fallback:missing';

export type FallbackLoadResult = {
  manifest: AssetManifest;
  missing: { id: string; path: string }[];
  errors: ManifestIssue[];
  fallbackAssetId: string;
};

// Never throws. Keeps assets whose files exist, reports the rest as missing,
// and falls back to an empty manifest when the file is unreadable or invalid.
export function loadManifestWithFallback(manifestPath: string, assetsRoot: string): FallbackLoadResult {
  const empty: AssetManifest = { version: 1, assets: [] };

  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch {
    return {
      manifest: empty,
      missing: [],
      errors: [{ path: 'manifest', message: `cannot read manifest: ${manifestPath}` }],
      fallbackAssetId: FALLBACK_ASSET_ID,
    };
  }

  const parsed = parseManifest(raw);
  if (!parsed.ok) {
    return { manifest: empty, missing: [], errors: parsed.errors, fallbackAssetId: FALLBACK_ASSET_ID };
  }

  const present: AssetEntry[] = [];
  const missing: { id: string; path: string }[] = [];
  for (const asset of parsed.data.assets) {
    if (existsSync(join(assetsRoot, asset.path))) {
      present.push(asset);
    } else {
      missing.push({ id: asset.id, path: asset.path });
    }
  }

  return {
    manifest: { version: parsed.data.version, assets: present },
    missing,
    errors: [],
    fallbackAssetId: FALLBACK_ASSET_ID,
  };
}

// Returns one issue per ref that does not match any asset id in the manifest.
export function checkAssetRefs(manifest: AssetManifest, refs: readonly string[]): ManifestIssue[] {
  const ids = new Set(manifest.assets.map((a) => a.id));
  return refs.flatMap((ref, index) => (ids.has(ref) ? [] : [{ path: `refs.${index}`, message: `unknown asset ref: ${ref}` }]));
}

// Returns the manifest asset paths that are not present in presentFiles.
export function findMissingAssetPaths(manifest: AssetManifest, presentFiles: readonly string[]): string[] {
  const present = new Set(presentFiles);
  return manifest.assets.map((a) => a.path).filter((p) => !present.has(p));
}
