import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks over the on-disk UI asset tree.
// Nothing is written, no app is started, and there is no network access.
const uiRoot = fileURLToPath(new URL('../public/assets/ui', import.meta.url));
const uiDirs = ['icons', 'frames', 'cursors'] as const;

function svgFiles(dir: string): string[] {
  return readdirSync(join(uiRoot, dir)).filter((name) => name.endsWith('.svg'));
}

describe('ui asset folders', () => {
  it.each(uiDirs)('%s folder holds at least one non-empty svg', (dir) => {
    const files = svgFiles(dir);

    expect(files.length).toBeGreaterThanOrEqual(1);
    for (const file of files) {
      expect(statSync(join(uiRoot, dir, file)).size, `${dir}/${file}`).toBeGreaterThan(0);
    }
  });

  it.each(uiDirs)('%s svgs are crisp svg with width, height and crispEdges', (dir) => {
    for (const file of svgFiles(dir)) {
      const content = readFileSync(join(uiRoot, dir, file), 'utf8');

      expect(content, `${dir}/${file} <svg`).toContain('<svg');
      expect(content, `${dir}/${file} width`).toMatch(/\swidth="\d+"/);
      expect(content, `${dir}/${file} height`).toMatch(/\sheight="\d+"/);
      expect(content, `${dir}/${file} crispEdges`).toContain('shape-rendering="crispEdges"');
    }
  });
});
