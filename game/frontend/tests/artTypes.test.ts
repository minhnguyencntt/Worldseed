import { describe, expect, expectTypeOf, it } from 'vitest';
import { ART_SOURCES } from '../src/art/sources';
import type { ArtSource, Grid } from '../src/art/types';
import type { Grid as DrawGrid } from '../src/art/draw';

describe('art source types', () => {
  it('ArtSource.frames is Grid[]', () => {
    expectTypeOf<ArtSource['frames']>().toEqualTypeOf<Grid[]>();
  });

  it('draw.ts Grid equals types.ts Grid', () => {
    expectTypeOf<DrawGrid>().toEqualTypeOf<Grid>();
  });

  it.each(ART_SOURCES.map((source) => [source.id, source] as const))(
    'source %s holds well-formed rectangular integer grid frames',
    (_id, source) => {
      expect(source.frames.length).toBeGreaterThan(0);

      const [first] = source.frames;
      const height = first.length;
      const width = first[0].length;

      for (const frame of source.frames) {
        expect(frame.length).toBe(height);
        for (const row of frame) {
          expect(row.length).toBe(width);
          for (const cell of row) {
            expect(Number.isInteger(cell)).toBe(true);
          }
        }
      }
    },
  );
});
