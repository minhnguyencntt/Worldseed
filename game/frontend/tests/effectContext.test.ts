import { describe, it, expect, vi } from 'vitest';
import type Phaser from 'phaser';
import { createPhaserEffectContext } from '../src/phaser/effectContext';
import type { EffectSpec } from '@game/content/schema';

// Fake Phaser game object: every chainable setter returns the same object and destroy is a spy.
type FakeObject = {
  setOrigin: ReturnType<typeof vi.fn>;
  setDepth: ReturnType<typeof vi.fn>;
  setBlendMode: ReturnType<typeof vi.fn>;
  setStrokeStyle: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
};

function makeFakeObject(): FakeObject {
  const obj = {} as FakeObject;
  obj.setOrigin = vi.fn(() => obj);
  obj.setDepth = vi.fn(() => obj);
  obj.setBlendMode = vi.fn(() => obj);
  obj.setStrokeStyle = vi.fn(() => obj);
  obj.destroy = vi.fn();
  return obj;
}

function makeFakeScene() {
  const created: FakeObject[] = [];
  const track = () => {
    const obj = makeFakeObject();
    created.push(obj);
    return obj;
  };
  const scene = {
    add: {
      rectangle: vi.fn(track),
      circle: vi.fn(track),
      particles: vi.fn(track),
    },
    scale: { width: 480, height: 270 },
    cameras: { main: { fadeIn: vi.fn() } },
  };
  return { scene, created };
}

const DEPTH = 400;
const resolveKey = vi.fn((id: string) => `${id}-key`);

function render(spec: EffectSpec) {
  const fake = makeFakeScene();
  const ctx = createPhaserEffectContext(fake.scene as unknown as Phaser.Scene, resolveKey);
  const handle = ctx.createEffect({ ...spec, depth: DEPTH } as EffectSpec & { depth: number });
  return { ...fake, handle };
}

describe('createPhaserEffectContext lighting', () => {
  it('moonlightShaft: places a blended rectangle at the authored area with depth 400 and destroys it', () => {
    const { scene, created, handle } = render({
      type: 'moonlightShaft',
      color: '#aabbcc',
      alpha: 0.5,
      area: { x: 10, y: 20, width: 30, height: 40 },
    } as EffectSpec);

    expect(scene.add.rectangle).toHaveBeenCalledWith(10, 20, 30, 40, 0xaabbcc, 0.5);
    expect(created[0].setDepth).toHaveBeenCalledWith(DEPTH);
    expect(created[0].setBlendMode).toHaveBeenCalledWith('ADD');

    handle.destroy();
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });

  it('lampGlow: places an additive circle at the lamp position with depth 400 and destroys it', () => {
    const { scene, created, handle } = render({
      type: 'lampGlow',
      color: '#ffcc66',
      alpha: 0.3,
      x: 100,
      y: 50,
      radius: 24,
    } as EffectSpec);

    expect(scene.add.circle).toHaveBeenCalledWith(100, 50, 24, 0xffcc66, 0.3);
    expect(created[0].setDepth).toHaveBeenCalledWith(DEPTH);
    expect(created[0].setBlendMode).toHaveBeenCalledWith('ADD');

    handle.destroy();
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });

  it('doorLight: places a blended rectangle at the authored area with depth 400 and destroys it', () => {
    const { scene, created, handle } = render({
      type: 'doorLight',
      color: '#ffeeaa',
      alpha: 0.4,
      area: { x: 5, y: 6, width: 70, height: 80 },
    } as EffectSpec);

    expect(scene.add.rectangle).toHaveBeenCalledWith(5, 6, 70, 80, 0xffeeaa, 0.4);
    expect(created[0].setDepth).toHaveBeenCalledWith(DEPTH);
    expect(created[0].setBlendMode).toHaveBeenCalledWith('ADD');

    handle.destroy();
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });

  it('vignette: creates three stroked bands with depth 400 and destroys all three', () => {
    const { scene, created, handle } = render({
      type: 'vignette',
      color: '#000000',
      alpha: 0.9,
    } as EffectSpec);

    expect(scene.add.rectangle).toHaveBeenCalledTimes(3);
    expect(created).toHaveLength(3);
    for (const band of created) {
      expect(band.setDepth).toHaveBeenCalledWith(DEPTH);
    }

    handle.destroy();
    for (const band of created) {
      expect(band.destroy).toHaveBeenCalledTimes(1);
    }
  });

  it('dust: resolves the asset key and creates a particle emitter with that key', () => {
    const { scene, created, handle } = render({
      type: 'dust',
      asset: 'dust',
      count: 12,
      area: { x: 1, y: 2, width: 100, height: 50 },
    } as EffectSpec);

    expect(resolveKey).toHaveBeenCalledWith('dust');
    expect(scene.add.particles).toHaveBeenCalledWith(1, 2, 'dust-key', expect.any(Object));
    expect(created[0].setDepth).toHaveBeenCalledWith(DEPTH);

    handle.destroy();
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });
});
