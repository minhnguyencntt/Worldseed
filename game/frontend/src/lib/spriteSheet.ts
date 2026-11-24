export interface SpriteFrame { width: number; height: number; data: Uint8ClampedArray; }
export interface SpriteSheet extends SpriteFrame { frameWidth: number; frameHeight: number; frameCount: number; }

export function buildSpriteSheet(frames: readonly SpriteFrame[]): SpriteSheet {
  if (frames.length === 0) throw new Error('frames must not be empty');
  const { width: fw, height: fh } = frames[0];
  const n = frames.length;
  const width = fw * n;
  const data = new Uint8ClampedArray(width * fh * 4);
  frames.forEach((f, i) => {
    if (f.width !== fw || f.height !== fh) throw new Error(`frame ${i} is ${f.width}x${f.height}, expected ${fw}x${fh}`);
    for (let y = 0; y < fh; y++) data.set(f.data.subarray(y * fw * 4, (y + 1) * fw * 4), (y * width + i * fw) * 4);
  });
  return { width, height: fh, frameWidth: fw, frameHeight: fh, frameCount: n, data };
}
