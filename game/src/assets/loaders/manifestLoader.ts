import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseManifest, type ParseResult, type ManifestIssue, type AssetManifest } from '../manifest';

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
