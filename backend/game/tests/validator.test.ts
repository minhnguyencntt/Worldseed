import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadWorld, validateWorld } from '../src/content/world';
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
    const errors = validateWorld(invalidWorld, [invalidScene]);

    expect(errors).toContain('unknown scene: nowhere');
    expect(errors).toContain('unknown character: ghost');
    expect(errors).toContain('unknown flag: zzz');
    expect(errors).toContain('unknown object: nope');
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

    expect(loaded.scenes.s).toBeDefined();
    expect(loaded.scenes.s.id).toBe('s');
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
    expect(validateWorld(validWorld, [validScene])).toEqual([]);
  });
});
