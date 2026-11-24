# deterministic image generation

Generate image files from source data with pure functions and a byte-stable encoder so outputs are reproducible and unit testable.

## When to use

Building assets in a build step instead of editing binaries by hand, or whenever generated files are committed.

## How to apply

1. Keep rendering as pure functions from data to a pixel buffer with no I/O or clock.
2. Isolate the PNG encoding and file writing in a thin wrapper.
3. Fix the compression settings and strip metadata and timestamps so identical input gives identical bytes.
4. Update the asset manifest from the generator output, not by hand.
5. Expose dimensions, frame count and colour use as functions that tests can call.

## Pitfalls

- Randomness without a fixed seed changes the output between runs, so use a seeded generator.
- Mixing disk access into the drawing code makes it untestable, so inject the writer.
- Iterating over files in unsorted order changes the manifest, so sort the keys.

## Self-check

- Running the generator twice gives byte-identical files.
- A test can verify the size and palette of each output without touching the disk.
