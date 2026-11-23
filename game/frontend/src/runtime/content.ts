import { parse } from 'yaml';
import type { SceneDef, WorldDef } from '@game/state/types';
import manifestJson from '../../../public/assets/worlds/the-boys-room/manifest.json';
import { parseManifest } from '@game/assets/manifest';

// Content is bundled at build time from game/src/content (three levels up from src/runtime).
const worldFiles = import.meta.glob('../../../src/content/worlds/the-boys-room/**/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function fileFor(suffix: string): string {
  const key = Object.keys(worldFiles).find((path) => path.endsWith(suffix));
  if (key === undefined) {
    throw new Error(`missing bundled content file: ${suffix}`);
  }
  return worldFiles[key];
}

function parseYaml<T>(suffix: string): T {
  return parse(fileFor(suffix)) as T;
}

const worldRaw = parseYaml<WorldDef>('the-boys-room/world.yaml');

export const world: WorldDef = {
  id: worldRaw.id,
  title: worldRaw.title,
  startScene: worldRaw.startScene,
  scenes: worldRaw.scenes,
  characters: worldRaw.characters,
  flags: worldRaw.flags,
};

export const scene: SceneDef = parseYaml<SceneDef>('scenes/bedroom.yaml');

const parsedManifest = parseManifest(manifestJson);
if (!parsedManifest.ok) {
  throw new Error('invalid manifest: ' + JSON.stringify(parsedManifest.errors));
}
export const manifest = parsedManifest.data;
