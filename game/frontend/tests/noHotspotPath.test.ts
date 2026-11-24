import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Scans the frontend and engine source trees with node:fs so that the retired
// hotspot path (HOTSPOTS / ASSET_PATHS / ActionMenu / SceneView) cannot creep back.
const here = resolve(__dirname);
const frontendSrc = resolve(here, '..', 'src');
const gameSrc = resolve(here, '..', '..', 'src');
const scanRoots = [frontendSrc, gameSrc];

const FORBIDDEN: Array<{ label: string; pattern: RegExp }> = [
  { label: 'HOTSPOTS', pattern: /HOTSPOTS/ },
  { label: 'ASSET_PATHS', pattern: /ASSET_PATHS/ },
  { label: 'ActionMenu', pattern: /ActionMenu/ },
  { label: 'SceneView', pattern: /\bSceneView\b/ },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

describe('no hotspot path', () => {
  const files = scanRoots.flatMap((root) => walk(root));

  it('Given the frontend and engine source trees, when every file is scanned, then no file contains HOTSPOTS, ASSET_PATHS, ActionMenu or SceneView', () => {
    const matches: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const { label, pattern } of FORBIDDEN) {
        if (pattern.test(text)) {
          matches.push(`${relative(resolve(here, '..', '..'), file)} contains ${label}`);
        }
      }
    }
    expect(matches).toEqual([]);
  });

  it('Given the components directory, when it is checked, then components/ActionMenu.tsx does not exist', () => {
    const actionMenuPath = join(frontendSrc, 'components', 'ActionMenu.tsx');
    expect(existsSync(actionMenuPath)).toBe(false);
  });
});
