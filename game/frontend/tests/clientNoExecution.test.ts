import { describe, expect, it } from 'vitest';
import * as client from '../src/api/client';

describe('API client', () => {
  it('exports nothing execution-related', () => {
    expect(Object.keys(client).filter((k) => /execution/i.test(k))).toEqual([]);
  });
});
