import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import type { DialogueChoice, GameEvent, SceneDef, WorldDef } from '../state/types';

// A world as loaded from disk: scenes are resolved from scenes/<id>.yaml into full definitions.
export type LoadedWorld = Omit<WorldDef, 'scenes'> & { scenes: SceneDef[] };

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
 * Throws when world.yaml is malformed or a listed scene file is missing or mismatched.
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

  const scenes: SceneDef[] = [];
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
    scenes.push(sceneRaw as unknown as SceneDef);
  }

  return { ...world, scenes };
}

function checkEvents(
  events: GameEvent[] | undefined,
  ctx: { scenes: Set<string>; characters: Set<string>; flags: Set<string>; objects: Set<string> },
  errors: string[],
): void {
  for (const event of events ?? []) {
    switch (event.type) {
      case 'goto_scene':
        if (!ctx.scenes.has(event.scene)) errors.push(`unknown scene: ${event.scene}`);
        break;
      case 'say':
        if (!ctx.characters.has(event.character)) errors.push(`unknown character: ${event.character}`);
        break;
      case 'set_flag':
        if (!ctx.flags.has(event.flag)) errors.push(`unknown flag: ${event.flag}`);
        break;
      case 'discover':
        if (!ctx.objects.has(event.object)) errors.push(`unknown object: ${event.object}`);
        break;
      default:
        break;
    }
  }
}

function checkChoice(choice: DialogueChoice, dialogueIds: Set<string>, ctx: Parameters<typeof checkEvents>[1], errors: string[]): void {
  if (choice.next !== undefined && !dialogueIds.has(choice.next)) {
    errors.push(`unknown dialogue: ${choice.next}`);
  }
  checkEvents(choice.events, ctx, errors);
}

// Returns human-readable reference errors; an empty array means every reference resolves.
export function validateWorld(world: LoadedWorld): string[] {
  const errors: string[] = [];
  const sceneIds = new Set(world.scenes.map((s) => s.id));
  const characters = new Set(world.characters.map((c) => c.id));
  const flags = new Set(world.flags);

  if (!sceneIds.has(world.startScene)) {
    errors.push(`unknown scene: ${world.startScene}`);
  }

  for (const scene of world.scenes) {
    const objectIds = new Set(scene.objects.map((o) => o.id));
    const dialogueIds = new Set(scene.dialogue.map((d) => d.id));
    const ctx = { scenes: sceneIds, characters, flags, objects: objectIds };

    if (scene.openingDialogue !== undefined && !dialogueIds.has(scene.openingDialogue)) {
      errors.push(`unknown dialogue: ${scene.openingDialogue}`);
    }

    for (const node of scene.dialogue) {
      if (!characters.has(node.speaker)) errors.push(`unknown character: ${node.speaker}`);
      for (const choice of node.choices) checkChoice(choice, dialogueIds, ctx, errors);
    }

    for (const obj of scene.objects) {
      if (obj.openWhenFlag !== undefined && !flags.has(obj.openWhenFlag)) {
        errors.push(`unknown flag: ${obj.openWhenFlag}`);
      }
      if (obj.persistentState && !flags.has(obj.persistentState.flag)) {
        errors.push(`unknown flag: ${obj.persistentState.flag}`);
      }
      for (const cond of obj.visibleWhen ?? []) {
        if ('flag' in cond && !flags.has(cond.flag)) errors.push(`unknown flag: ${cond.flag}`);
      }
      for (const action of obj.actions) {
        for (const cond of action.conditions ?? []) {
          if ('flag' in cond && !flags.has(cond.flag)) errors.push(`unknown flag: ${cond.flag}`);
        }
        checkEvents(action.events, ctx, errors);
      }
    }
  }

  return errors;
}
