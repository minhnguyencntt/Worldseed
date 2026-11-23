// World content loader and reference validator.
// Repository baseline: AI-DLC scan v1, tip 9cda5131c65b08541fc685d8a0898d39a0e9e9fa.

import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import type { GameEvent, SceneDef, WorldDef } from '../state/types';

export type LoadedWorld = Omit<WorldDef, 'scenes'> & {
  scenes: Record<string, SceneDef>;
};

function readYaml(file: string): unknown {
  let source: string;
  try {
    source = fs.readFileSync(file, 'utf8');
  } catch {
    throw new Error(`missing content file: ${file}`);
  }
  return parse(source);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== 'string' || value === '') {
    throw new Error(`${file} missing string field: ${key}`);
  }
  return value;
}

function requireStringArray(data: Record<string, unknown>, key: string, file: string): string[] {
  const value = data[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new Error(`${file} field must be a list of strings: ${key}`);
  }
  return value as string[];
}

/**
 * Loads a world directory: reads world.yaml and every scene it lists from scenes/<id>.yaml.
 * Throws when world.yaml is malformed or a listed scene file is missing.
 */
export function loadWorld(worldDir: string): LoadedWorld {
  const worldFile = path.join(worldDir, 'world.yaml');
  const raw = readYaml(worldFile);
  if (!isRecord(raw)) {
    throw new Error(`${worldFile} must be a YAML mapping`);
  }

  if (!Array.isArray(raw.characters)) {
    throw new Error('world.yaml field must be a list: characters');
  }

  const world: WorldDef = {
    id: requireString(raw, 'id', 'world.yaml'),
    title: requireString(raw, 'title', 'world.yaml'),
    startScene: requireString(raw, 'startScene', 'world.yaml'),
    scenes: requireStringArray(raw, 'scenes', 'world.yaml'),
    characters: raw.characters as WorldDef['characters'],
    flags: requireStringArray(raw, 'flags', 'world.yaml'),
  };

  const scenes: Record<string, SceneDef> = {};
  for (const sceneId of world.scenes) {
    const relPath = path.join('scenes', `${sceneId}.yaml`);
    const sceneRaw = readYaml(path.join(worldDir, relPath));
    if (!isRecord(sceneRaw)) {
      throw new Error(`${relPath} must be a YAML mapping`);
    }
    const id = requireString(sceneRaw, 'id', relPath);
    if (id !== sceneId) {
      throw new Error(`${relPath} declares id ${id}, expected ${sceneId}`);
    }
    scenes[id] = sceneRaw as unknown as SceneDef;
  }

  return { ...world, scenes };
}

function checkEvent(
  event: GameEvent,
  world: WorldDef,
  scene: SceneDef,
  errors: string[],
): void {
  switch (event.type) {
    case 'goto_scene':
      if (!world.scenes.includes(event.scene)) {
        errors.push(`unknown scene: ${event.scene}`);
      }
      break;
    case 'say':
      if (!world.characters.some((c) => c.id === event.character)) {
        errors.push(`unknown character: ${event.character}`);
      }
      break;
    case 'set_flag':
      if (!world.flags.includes(event.flag)) {
        errors.push(`unknown flag: ${event.flag}`);
      }
      break;
    case 'discover':
      if (!scene.objects.some((o) => o.id === event.object)) {
        errors.push(`unknown object: ${event.object}`);
      }
      break;
    default:
      break;
  }
}

/**
 * Returns human-readable reference errors for a world and its scenes.
 * An empty array means every reference resolves inside the world.
 */
export function validateWorld(world: WorldDef, scenes: SceneDef[]): string[] {
  const errors: string[] = [];

  if (!world.scenes.includes(world.startScene)) {
    errors.push(`unknown start scene: ${world.startScene}`);
  }

  for (const sceneId of world.scenes) {
    if (!scenes.some((s) => s.id === sceneId)) {
      errors.push(`missing scene: ${sceneId}`);
    }
  }

  for (const scene of scenes) {
    for (const obj of scene.objects) {
      if (obj.openWhenFlag !== undefined && !world.flags.includes(obj.openWhenFlag)) {
        errors.push(`unknown flag: ${obj.openWhenFlag}`);
      }
      for (const action of obj.actions) {
        for (const condition of action.conditions ?? []) {
          if ('flag' in condition && !world.flags.includes(condition.flag)) {
            errors.push(`unknown flag: ${condition.flag}`);
          }
        }
        for (const event of action.events) {
          checkEvent(event, world, scene, errors);
        }
      }
    }

    for (const node of scene.dialogue) {
      if (!world.characters.some((c) => c.id === node.speaker)) {
        errors.push(`unknown character: ${node.speaker}`);
      }
      for (const choice of node.choices) {
        if (choice.next !== undefined && !scene.dialogue.some((n) => n.id === choice.next)) {
          errors.push(`unknown dialogue: ${choice.next}`);
        }
        for (const event of choice.events ?? []) {
          checkEvent(event, world, scene, errors);
        }
      }
    }
  }

  return errors;
}
