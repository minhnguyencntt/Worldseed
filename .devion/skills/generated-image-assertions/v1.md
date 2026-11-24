# generated image assertions

Assert properties of generated raster images in unit tests by decoding bytes or inspecting pixel buffers.

## When to use

Testing code that produces images, sprite sheets or atlases without opening a viewer.

## How to apply

1. Test pure drawing functions on in-memory buffers and compare width, height and frame count.
2. Collect the set of unique colours and assert it is a subset of the allowed palette.
3. Decode the PNG header to check the dimensions of the written files.
4. Compare the output of two runs to prove determinism.
5. Cross-check every manifest entry against an existing file and its declared size.

## Pitfalls

- Snapshot comparisons of whole binaries are brittle, so assert properties instead.
- Alpha edge pixels may add unexpected colours, so ignore fully transparent pixels.

## Self-check

- A deliberately wrong palette colour makes the test fail.
- Tests run without touching the real output directory.
