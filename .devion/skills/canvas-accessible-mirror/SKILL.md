# canvas accessible mirror

Expose canvas-only interactive content through a parallel DOM of focusable, labelled controls.

## When to use

Making game or canvas content usable by keyboard and screen readers.

## How to apply

1. Render a visually hidden list of buttons, one per interactive item, with labels from the same state as the canvas.
2. Keep focus and hover in sync between the canvas and the DOM, and show a focus ring on the canvas object.
3. Announce changes through a polite live region.
4. Remove duplicated or obsolete pointer-only paths.

## Pitfalls

- Labels hardcoded apart from the state go stale, so derive them from state.
- Hidden with display none removes the items from the accessibility tree, so use a visually-hidden style.
- Focus lost on re-render, so use stable keys.

## Self-check

- All interactive objects are reachable by Tab.
- The label text matches the on-screen name.
