import type { ZodError } from 'zod';
import { assetSchema, manifestSchema, type AssetEntry, type AssetManifest } from './schema';

export type ManifestIssue = { path: string; message: string };

export type ParseResult<T> = { ok: true; data: T } | { ok: false; errors: ManifestIssue[] };

// Joins a zod issue path such as ['assets', 0, 'dimensions', 'width'] into
// 'assets.0.dimensions.width' so callers can point at the failing field.
const formatPath = (path: readonly PropertyKey[]): string => path.map(String).join('.');

const fromZodError = (error: ZodError): ManifestIssue[] =>
  error.issues.map((issue) => ({ path: formatPath(issue.path), message: issue.message }));

// Validates untrusted input against the manifest schema without throwing, then
// checks that every asset id is unique within the manifest.
export function parseManifest(input: unknown): ParseResult<AssetManifest> {
  const parsed = manifestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: fromZodError(parsed.error) };
  }

  const seen = new Set<string>();
  const errors: ManifestIssue[] = [];
  parsed.data.assets.forEach((asset, index) => {
    if (seen.has(asset.id)) {
      errors.push({ path: `assets.${index}.id`, message: `duplicate asset id: ${asset.id}` });
    }
    seen.add(asset.id);
  });

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, data: parsed.data };
}

// Validates a single asset entry without throwing.
export function parseAsset(input: unknown): ParseResult<AssetEntry> {
  const parsed = assetSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: fromZodError(parsed.error) };
  }
  return { ok: true, data: parsed.data };
}

export * from './schema';
