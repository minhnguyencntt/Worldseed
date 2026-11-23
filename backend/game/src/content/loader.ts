import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import type { DialogueChoice, GameEvent, SceneDef, WorldDef } from '../state/types';

// A world as loaded from disk: scenes are resolved from scenes/<id>.yaml into full definitions.
export type LoadedWorld = Omit<WorldDef, 'scenes'> & { scenes: SceneDef[] };

function readYaml(file: string): unknown {
  return parse(fs.readFileSync(file, 'utf8'));
}

export function loadWorld(worldDir: string): LoadedWorld {
  const world = readYaml(path.join(worldDir, 'world.yaml')) as WorldDef;

  const scenes = world.scenes.map((sceneId) => {
    const file = path.join(worldDir, 'scenes', `${sceneId}.yaml`);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing scene file for "${sceneId}": expected ${sceneId}.yaml in scenes/`);
    }
    return readYaml(file) as SceneDef;
  });

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
