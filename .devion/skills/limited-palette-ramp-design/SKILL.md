# limited palette ramp design

Build a small shared colour palette from hue-shifted ramps so warm and cool lighting stay consistent across art and interface.

## When to use

Defining or extending a colour set with a hard cap, shared by artwork and UI, for a scene with two light temperatures.

## How to apply

1. Split the budget into ramps of 3 to 6 colours per material family, plus a few neutrals.
2. Shift hue toward warm in highlights and toward cool or violet in shadows.
3. Reserve separate warm and cool ramps for light sources and tint lit surfaces from them.
4. Define the palette once as data and generate stylesheet tokens from the same source.
5. Verify contrast of text against its background inside the palette.

## Pitfalls

- Adding one-off colours breaks the cap, so extend a ramp instead.
- Pure-black outlines look harsh, so use a very dark tinted colour.
- Ramps with evenly spaced lightness look dull, so vary the steps.

## Self-check

- The unique colour count is at or below the cap.
- Art and UI import the same palette file.
- Text and background pairs meet the contrast target.
