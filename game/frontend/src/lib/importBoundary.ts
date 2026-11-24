const RE = /(?:from\s+|import\s*\(?\s*)['"]([^'"]+)['"]/g;

/** Returns the import specifiers in `t` that reach into a `frontend` path segment. */
export function frontendImports(t: string): string[] {
  return [...t.matchAll(RE)].map((m) => m[1]).filter((s) => /(^|\/)frontend(\/|$)/.test(s));
}
