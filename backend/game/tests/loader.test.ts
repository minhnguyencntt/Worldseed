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
      'scenes/s.yaml': 'id: s\n',
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
      'scenes/s.yaml': 'id: s\n',
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
      'scenes/s.yaml': 'id: other\n',
    });

    expect(() => loadWorld(dir)).toThrow(/expected s/);
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
      'scenes/s.yaml': 'id: s\n',
    });

    const loaded = loadWorld(dir);
    expect(Array.isArray(loaded.scenes)).toBe(true);
    expect(loaded.scenes[0].id).toBe('s');
  });
});
