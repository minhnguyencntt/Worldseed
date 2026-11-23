import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import Phaser from 'phaser';
import { createPhaserRenderContext } from '../src/phaser/renderContext';

// Phaser is a canvas runtime. The render context only needs Geom.Rectangle (+ Contains)
// and the pointer event names it subscribes to, so those are faked here.
vi.mock('phaser', () => {
  class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }
  return {
    default: {
      Geom: { Rectangle: Object.assign(Rectangle, { Contains: vi.fn() }) },
      Input: {
        Events: { POINTER_OVER: 'pointerover', POINTER_OUT: 'pointerout', POINTER_DOWN: 'pointerdown' },
      },
    },
  };
});

const CHAINABLE = [
  'setOrigin',
  'setScale',
  'setDepth',
  'setInteractive',
  'setVisible',
  'setTint',
  'clearTint',
  'on',
  'destroy',
] as const;

type Stub = Record<(typeof CHAINABLE)[number], Mock>;

// A fake Phaser game object: every method returns the stub so calls can be chained.
function makeStub(): Stub {
  const stub = {} as Stub;
  for (const name of CHAINABLE) {
    stub[name] = vi.fn(() => stub);
  }
  return stub;
}

type Scene = Parameters<typeof createPhaserRenderContext>[0];

function setup() {
  const image = makeStub();
  const label = makeStub();
  const add = {
    image: vi.fn(() => image),
    text: vi.fn(() => label),
  };
  const scene = { add } as unknown as Scene;
  const ctx = createPhaserRenderContext(scene, (id) => `k:${id}`);
  return { add, image, label, ctx };
}

const SPEC = {
  key: 'objects/x',
  x: 5,
  y: 6,
  scale: 2,
  depth: 3,
  label: 'X',
  bounds: { x: 0, y: 0, width: 10, height: 20 },
};

// Returns the callback the code registered for a Phaser event on a fake game object.
function listenerFor(obj: Stub, event: string): () => void {
  const call = obj.on.mock.calls.find(([name]) => name === event);
  if (!call) throw new Error(`no listener registered for ${event}`);
  return call[1] as () => void;
}

describe('createPhaserRenderContext.createSprite', () => {
  let fake: ReturnType<typeof setup>;

  beforeEach(() => {
    fake = setup();
  });

  it('places image at the spec position with the resolved key, scale and depth', () => {
    fake.ctx.createSprite(SPEC);

    expect(fake.add.image).toHaveBeenCalledWith(5, 6, 'k:objects/x');
    expect(fake.image.setScale).toHaveBeenCalledWith(2);
    expect(fake.image.setDepth).toHaveBeenCalledWith(3);
    expect(fake.image.setInteractive).toHaveBeenCalledWith(
      expect.any(Phaser.Geom.Rectangle),
      Phaser.Geom.Rectangle.Contains,
    );
    const [hitArea] = fake.image.setInteractive.mock.calls[0];
    expect(hitArea).toMatchObject({ x: 0, y: 0, width: 10, height: 20 });
  });
});

describe('createPhaserRenderContext handle', () => {
  let fake: ReturnType<typeof setup>;

  beforeEach(() => {
    fake = setup();
  });

  it('setHighlighted(true) tints the image and setHighlighted(false) clears the tint', () => {
    const handle = fake.ctx.createSprite(SPEC);

    handle.setHighlighted(true);
    expect(fake.image.setTint).toHaveBeenCalledWith(0xffff66);

    handle.setHighlighted(false);
    expect(fake.image.clearTint).toHaveBeenCalled();
  });

  it('setLabelVisible(true) shows the label text', () => {
    const handle = fake.ctx.createSprite(SPEC);

    handle.setLabelVisible(true);

    expect(fake.label.setVisible).toHaveBeenLastCalledWith(true);
  });

  it('setVisible(false) hides the image (adapted: the label is not hidden by this call)', () => {
    const handle = fake.ctx.createSprite(SPEC);

    handle.setVisible(false);

    expect(fake.image.setVisible).toHaveBeenCalledWith(false);
  });

  it('onHover receives true on pointerover and false on pointerout', () => {
    const handle = fake.ctx.createSprite(SPEC);
    const cb = vi.fn();
    handle.onHover(cb);

    listenerFor(fake.image, 'pointerover')();
    expect(cb).toHaveBeenLastCalledWith(true);

    listenerFor(fake.image, 'pointerout')();
    expect(cb).toHaveBeenLastCalledWith(false);
  });

  it('onClick runs the callback on pointerdown', () => {
    const handle = fake.ctx.createSprite(SPEC);
    const cb = vi.fn();
    handle.onClick(cb);

    listenerFor(fake.image, 'pointerdown')();

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('destroy destroys both the image and the label', () => {
    const handle = fake.ctx.createSprite(SPEC);

    handle.destroy();

    expect(fake.image.destroy).toHaveBeenCalledTimes(1);
    expect(fake.label.destroy).toHaveBeenCalledTimes(1);
  });
});
