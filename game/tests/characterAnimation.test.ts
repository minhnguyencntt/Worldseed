import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { ZodError } from 'zod';
import { parseManifest } from '../src/assets/manifest';
import { resolveCharacterAnimation } from '../src/engine/characterAnimation';
import { planPreload } from '../src/engine/planPreload';
import { sceneSchema, type CharacterSpec } from '../src/content/schema';

// Read-only fixtures: the real the-boys-room manifest and bedroom scene. Nothing is started or written.
const manifestPath = fileURLToPath(
  new URL('../public/assets/worlds/the-boys-room/manifest.json', import.meta.url),
);
const scenePath = fileURLToPath(
  new URL('../src/content/worlds/the-boys-room/scenes/bedroom.yaml', import.meta.url),
);

const parsedManifest = parseManifest(JSON.parse(readFileSync(manifestPath, 'utf8')));
if (!parsedManifest.ok) throw new Error(`manifest failed to parse: ${JSON.stringify(parsedManifest.errors)}`);
const manifest = parsedManifest.data;

const rawScene = parse(readFileSync(scenePath, 'utf8')) as unknown;
const boy = (sceneSchema.parse(rawScene).characters ?? [])[0] as CharacterSpec;

describe('resolveCharacterAnimation and sceneSchema characters', () => {
  it('walk: resolves the boy walk state to the boy-walk asset and walk animation', () => {
    // Given the boy character from bedroom.yaml, whose walk asset is character:boy-walk
    // When resolving the walk state against the real manifest
    const ref = resolveCharacterAnimation(boy, 'walk', manifest);
    // Then the walk reference points at character:boy-walk / walk
    expect(ref).toEqual({ asset: 'character:boy-walk', animation: 'walk' });
  });

  it('interact: resolves the boy interact state to the boy-interact asset and interact animation', () => {
    // Given the boy character from bedroom.yaml
    // When resolving the interact state against the real manifest
    const ref = resolveCharacterAnimation(boy, 'interact', manifest);
    // Then the interact reference points at character:boy-interact / interact
    expect(ref).toEqual({ asset: 'character:boy-interact', animation: 'interact' });
  });

  it('falls back to idle when the spec has no walk entry', () => {
    // Given a character spec with only an idle animation
    const spec: CharacterSpec = { ...boy, animations: { idle: boy.animations.idle } };
    // When resolving the walk state
    const ref = resolveCharacterAnimation(spec, 'walk', manifest);
    // Then the idle reference is returned
    expect(ref).toEqual(boy.animations.idle);
  });

  it('falls back to idle when the walk asset is not in the manifest', () => {
    // Given a character whose walk entry points at an asset id absent from the manifest
    const spec: CharacterSpec = {
      ...boy,
      animations: { ...boy.animations, walk: { asset: 'character:missing', animation: 'walk' } },
    };
    // When resolving the walk state
    const ref = resolveCharacterAnimation(spec, 'walk', manifest);
    // Then the idle reference is returned
    expect(ref).toEqual(boy.animations.idle);
  });

  it('accepts the boy character in sceneSchema.parse', () => {
    // Given the raw bedroom scene YAML, which declares the boy character with idle, walk and interact
    // When parsing it with sceneSchema
    const scene = sceneSchema.parse(rawScene);
    // Then the boy character is present with all three animation states
    expect(scene.characters?.map((c) => c.id)).toEqual(['boy']);
    expect(Object.keys(scene.characters?.[0]?.animations ?? {}).sort()).toEqual(['idle', 'interact', 'walk']);
  });

  it('rejects a character without animations.idle with a ZodError at characters.0.animations.idle', () => {
    // Given the bedroom scene with the boy character's idle animation removed
    const broken = structuredClone(rawScene) as { characters: Array<{ animations: Record<string, unknown> }> };
    delete broken.characters[0]!.animations.idle;
    // When parsing it with sceneSchema
    let caught: unknown;
    try {
      sceneSchema.parse(broken);
    } catch (err) {
      caught = err;
    }
    // Then a ZodError is thrown whose issue path includes characters.0.animations.idle
    expect(caught).toBeInstanceOf(ZodError);
    const paths = (caught as ZodError).issues.map((i) => i.path.join('.'));
    expect(paths).toContain('characters.0.animations.idle');
  });

  it('planPreload loads all three boy asset ids exactly once', () => {
    // Given the parsed bedroom scene, whose boy references idle, walk and interact assets
    const scene = sceneSchema.parse(rawScene);
    // When planning the preload against the real manifest
    const plan = planPreload(scene as unknown as Parameters<typeof planPreload>[0], manifest);
    // Then each boy asset id is in the load list exactly once
    for (const id of ['character:boy', 'character:boy-walk', 'character:boy-interact']) {
      expect(plan.load.filter((x) => x === id)).toHaveLength(1);
    }
    expect(plan.unknown).not.toContain('character:boy');
  });
});
