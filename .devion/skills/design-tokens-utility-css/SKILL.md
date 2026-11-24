# design tokens utility css

Define colour, spacing and type tokens once and expose them to a utility-CSS framework and components.

## When to use

Keeping many components visually consistent in a Tailwind-style setup or a bespoke theme.

## How to apply

1. Keep tokens as the single source, as CSS variables or a theme config, with semantic names such as surface and accent.
2. Map the tokens into the utility framework theme so classes use them directly.
3. Build components on semantic tokens instead of raw values.
4. Load fonts from packages and declare a font-display and a fallback stack.
5. Disable image smoothing on bitmap-skinned elements.

## Pitfalls

- Hex values hardcoded in components drift from the tokens, so lint for them.
- Token names that describe a colour instead of a role make themes hard to change.
- Fonts loaded from remote hosts break offline use, so bundle them.

## Self-check

- Searching component files finds no raw colour values.
- Changing one token updates every consumer.
