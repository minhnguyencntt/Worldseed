import { describe, it, expect, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadWorld } from '../src/content/loader';

// Every world in these tests lives in an os temp directory; nothing touches the repo content tree.
const createdDirs: string[] = [];

function makeWorldDir(files: Record<string, string>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'worldseed-loader-'));
  createdDirs.push(dir);
  for (const [relPath, contents] of Object.entries(files)) {
    const abs = path.join(dir, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, contents);
  }
  return dir;
}

// Minimal scene that satisfies the scene schema (id, title, dialogue, objects).
function sceneFixture(id: string): string {
  return [`id: ${id}`, `title: ${id.toUpperCase()}`, 'dialogue: []', 'objects: []', ''].join('\n');
}

afterEach(() => {
  for (const dir of createdDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('loadWorld', () => {
  it('throws when id is missing', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'title: W',
        'startScene: s',
        'scenes: [s]',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': sceneFixture('s'),
    });

    expect(() => loadWorld(dir)).toThrow(/id/);
  });

  it('throws naming s2.yaml when a listed scene file is missing', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes: [s, s2]',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': sceneFixture('s'),
    });

    expect(() => loadWorld(dir)).toThrow(/s2\.yaml/);
  });

  it('throws when a scene file declares a different id than listed', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes: [s]',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': sceneFixture('other'),
    });

    expect(() => loadWorld(dir)).toThrow(/expected s/);
  });

  it('rejects object without position', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes: [s]',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': [
        'id: s',
        'title: S',
        'dialogue: []',
        'objects:',
        '  - id: lamp',
        '    name: Lamp',
        '    description: A lamp.',
        '    asset: objects/lamp',
        '    layer: objects',
        '    actions: []',
        '',
      ].join('\n'),
    });

    expect(() => loadWorld(dir)).toThrow(/position/);
  });

  it('returns scenes array', () => {
    const dir = makeWorldDir({
      'world.yaml': [
        'id: w',
        'title: W',
        'startScene: s',
        'scenes: [s]',
        'characters: []',
        'flags: []',
        '',
      ].join('\n'),
      'scenes/s.yaml': sceneFixture('s'),
    });

    const loaded = loadWorld(dir);
    expect(Array.isArray(loaded.scenes)).toBe(true);
    expect(loaded.scenes[0].id).toBe('s');
  });
});
