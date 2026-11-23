import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadWorld, validateWorld } from '../src/content/loader';
import { invalidWorld, invalidScene } from './fixtures/invalid-world';
import { validWorld, validScene } from './fixtures/valid-world';

function makeWorldDir(files: Record<string, string>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'worldseed-'));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, 'utf8');
  }
  return dir;
}

describe('validateWorld invalid reference detection', () => {
  it('reports unknown scene, character, flag and object references for an invalid world', () => {
    const errors = validateWorld({ ...invalidWorld, scenes: [invalidScene] });

    expect(errors).toContain('unknown scene: nowhere');
    expect(errors).toContain('unknown character: ghost');
    expect(errors).toContain('unknown flag: zzz');
    expect(errors).toContain('unknown object: nope');
  });

  it('reports unknown start scene and unknown dialogue next', () => {
    const world = {
      ...validWorld,
      startScene: 'missing',
      scenes: [
        {
          ...validScene,
          dialogue: [
            {
              id: 'd1',
              speaker: 'boy',
              text: 'Hi',
              choices: [{ text: 'Go', next: 'nope' }],
            },
          ],
        },
      ],
    };

    const errors = validateWorld(world);

    expect(errors).toContain('unknown scene: missing');
    expect(errors).toContain('unknown dialogue: nope');
  });
});

describe('loadWorld and validateWorld with a valid world', () => {
  it('loadWorld returns the scene keyed by its id from scenes/s.yaml', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes:',
        '  - s',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': ['id: s', 'title: S', 'objects: []', 'dialogue: []', ''].join('\n'),
    });

    const loaded = loadWorld(dir);

    expect(loaded.scenes).toHaveLength(1);
    expect(loaded.scenes[0].id).toBe('s');
  });

  it('loadWorld throws an error naming s2.yaml when world.yaml lists a scene with no file', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes:',
        '  - s',
        '  - s2',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': ['id: s', 'title: S', 'objects: []', 'dialogue: []', ''].join('\n'),
    });

    expect(() => loadWorld(dir)).toThrow(/s2\.yaml/);
  });

  it('validateWorld returns no errors for the fully consistent valid fixture', () => {
    expect(validateWorld({ ...validWorld, scenes: [validScene] })).toEqual([]);
  });
});

describe('validateWorld scene characters', () => {
  const characterFields = {
    position: { x: 0, y: 0 },
    scale: 1,
    layer: 'characters',
    animations: { idle: { asset: 'a', animation: 'idle' } },
  };

  it('reports unknown scene character id with a path tag', () => {
    const scene = {
      ...validScene,
      characters: [{ id: 'ghost', name: 'Ghost', ...characterFields }],
    };

    const errors = validateWorld({ ...validWorld, scenes: [scene] });

    expect(errors).toContain('scenes[bedroom].characters[0].id: unknown character ghost');
  });

  it('accepts scene characters all in the world list', () => {
    const scene = {
      ...validScene,
      characters: [{ id: 'boy', name: 'The Boy', ...characterFields }],
    };

    expect(validateWorld({ ...validWorld, scenes: [scene] })).toEqual([]);
  });

  it('tags the index of the second unknown character', () => {
    const scene = {
      ...validScene,
      characters: [
        { id: 'boy', name: 'The Boy', ...characterFields },
        { id: 'ghost', name: 'Ghost', ...characterFields },
      ],
    };

    const errors = validateWorld({ ...validWorld, scenes: [scene] });

    expect(errors).toEqual(['scenes[bedroom].characters[1].id: unknown character ghost']);
  });

  it('reports no character error when scene.characters is undefined', () => {
    const errors = validateWorld({ ...validWorld, scenes: [validScene] });

    expect(errors.filter((e) => e.includes('characters['))).toEqual([]);
  });
});
