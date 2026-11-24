import { describe, it, expect } from 'vitest';
import { gridToRgba } from '../src/lib/gridToRgba';
import { encodePng, readPngSize } from '../src/lib/pngEncode';

const GRID_4X3 = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
];

const readChunkTypes = (bytes: Uint8Array): string[] => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const types: string[] = [];
  let offset = 8; // skip the 8-byte PNG signature
  while (offset + 8 <= bytes.length) {
    const length = view.getUint32(offset, false);
    const type = String.fromCharCode(...bytes.subarray(offset + 4, offset + 8));
    types.push(type);
    offset += 12 + length; // length + type + data + CRC
  }
  return types;
};

describe('pngEncode', () => {
  describe('encodePng determinism', () => {
    it('encodes the same 4x3 image to byte-identical PNG output on repeated calls', () => {
      // Given a 4x3 RgbaImage built from indices 0..11, When encodePng is called twice,
      // Then both outputs are byte-for-byte equal.
      const img = gridToRgba(GRID_4X3);
      const a = encodePng(img);
      const b = encodePng(img);
      expect(Buffer.from(a).equals(Buffer.from(b))).toBe(true);
    });
  });

  describe('readPngSize', () => {
    it('reads width and height from the IHDR chunk of an encoded PNG', () => {
      // Given a 4x3 encoded PNG, When readPngSize is called, Then it returns {width:4,height:3}.
      const img = gridToRgba(GRID_4X3);
      expect(readPngSize(encodePng(img))).toEqual({ width: 4, height: 3 });
    });

    it('throws "not a png" when the bytes do not start with the PNG signature', () => {
      // Given 30 zero bytes (no PNG signature), When readPngSize is called, Then it throws 'not a png'.
      expect(() => readPngSize(new Uint8Array(30))).toThrow('not a png');
    });
  });

  describe('chunk layout', () => {
    it('contains only IHDR, IDAT and IEND chunks in that order', () => {
      // Given an encoded 4x3 PNG, When its chunks are walked from byte 8,
      // Then the chunk types are exactly ['IHDR', 'IDAT', 'IEND'].
      const png = encodePng(gridToRgba(GRID_4X3));
      expect(readChunkTypes(png)).toEqual(['IHDR', 'IDAT', 'IEND']);
    });
  });
});
