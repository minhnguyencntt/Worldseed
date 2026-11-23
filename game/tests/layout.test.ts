import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadWorld } from '../src/content/loader';

const gameDir = fileURLToPath(new URL('..', import.meta.url));

describe('game layout', () => {
  it('has runtime dirs and no backend/game', () => {
    expect(existsSync(join(gameDir, 'src/engine'))).toBe(true);
    expect(existsSync(join(gameDir, 'src/state'))).toBe(true);
    expect(existsSync(join(gameDir, 'src/systems'))).toBe(true);
    expect(existsSync(join(gameDir, 'src/content'))).toBe(true);
    expect(existsSync(join(gameDir, 'content/worlds/the-boys-room/world.yaml'))).toBe(true);
    expect(existsSync(join(gameDir, 'tests'))).toBe(true);
    expect(existsSync(join(gameDir, '../backend/game'))).toBe(false);
  });

  it('loads the-boys-room from game/content', () => {
    const worldDir = join(gameDir, 'content/worlds/the-boys-room');
    let world: ReturnType<typeof loadWorld> | undefined;
    expect(() => {
      world = loadWorld(worldDir);
    }).not.toThrow();
    expect(world).toBeDefined();
  });
});
