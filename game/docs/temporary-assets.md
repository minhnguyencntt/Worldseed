# Temporary assets: replacement requirements

These assets are temporary and are not production-quality artwork.

They are hand-made placeholders so that layout, scene wiring and asset loading can be built and tested. Replace each one with final art under the rules in [Replacement rules](#replacement-rules).

Source of truth: `game/public/assets/worlds/the-boys-room/manifest.json`. Ids below are the manifest ids. An id marked *file only* has an SVG on disk but no manifest entry, so code must not load it until an entry is added. An id marked *not created* has neither a file nor a manifest entry.

## Backgrounds

| Id | File | Format | Size | Status |
| --- | --- | --- | --- | --- |
| `scene:bedroom` | `backgrounds/bedroom-room.svg` | SVG | 320×180 px | In manifest. Origin 0,0. |
| `background:wall` | `backgrounds/wall.svg` | SVG | 320×120 px | File only. |
| `background:floor` | `backgrounds/floor.svg` | SVG | 320×60 px | File only. |
| `background:window-view` | `backgrounds/window-view.svg` | SVG | 60×50 px | File only. |
| `background:lighting` | `backgrounds/lighting.svg` | SVG | 320×180 px | File only. Full-scene overlay. |

## Furniture

| Id | File | Format | Size | Status |
| --- | --- | --- | --- | --- |
| `objects/bed` | `furniture/bed.svg` | SVG | 100×35 px | In manifest. Interaction bounds 0,0,100,35. |
| `objects/bookshelf` | `furniture/bookshelf.svg` | SVG | 44×90 px | In manifest. Interaction bounds 0,0,44,90. |
| `objects/desk` | `furniture/desk.svg` | SVG | 70×28 px | In manifest. Interaction bounds 0,0,70,28. |
| `furniture:chair` | `furniture/chair.svg` | SVG | 24×32 px | File only. |
| `furniture:wardrobe` | `furniture/wardrobe.svg` | SVG | 48×90 px | File only. |

## Objects

| Id | File | Format | Size | Status |
| --- | --- | --- | --- | --- |
| `objects/old-computer` | `objects/old-computer.svg` | SVG | 30×34 px | In manifest. Interaction bounds 0,0,30,34. |
| `objects/books` | `objects/books.svg` | SVG | 20×12 px | In manifest. Interaction bounds 0,0,20,12. |
| `objects/door` | `objects/door.svg` | SVG | 40×80 px | In manifest. Interaction bounds 0,0,40,80. |
| `objects/window` | `objects/window.svg` | SVG | 60×50 px | In manifest. Interaction bounds 0,0,60,50. |
| `objects/secret-door-closed` | `objects/secret-door-closed.svg` | SVG | 40×80 px | In manifest. Interaction bounds 0,0,40,80. Paired with the open state. |
| `objects/secret-door-open` | `objects/secret-door-open.svg` | SVG | 40×80 px | In manifest. Interaction bounds 0,0,40,80. Paired with the closed state. |

## Characters

Spritesheets are single-row and each frame is 32×48 px. Origin is x 0.5, y 1 for all three.

| Id | File | Format | Sheet size | Frames | Animation (manifest) |
| --- | --- | --- | --- | --- | --- |
| `character:boy` | `characters/boy-sheet.svg` | SVG spritesheet | 64×48 px | 2 | `idle`: frames [0, 1], 2 fps, repeat -1 |
| `character:boy-walk` | `characters/boy-walk.svg` | SVG spritesheet | 128×48 px | 4 | `walk`: frames [0, 1, 2, 3], 8 fps, repeat -1 |
| `character:boy-interact` | `characters/boy-interact.svg` | SVG spritesheet | 96×48 px | 3 | `interact`: frames [0, 1, 2], 6 fps, repeat 0 (plays once) |

## Effects

| Id | File | Format | Size | Status |
| --- | --- | --- | --- | --- |
| `effect:dust` | `effects/dust.svg` | SVG | 4×4 px | In manifest. Single dust mote. |
| `effect:glow` | `effects/glow.svg` | SVG | 16×16 px | In manifest. |

## Replacement rules

1. **Keep the id.** A replacement keeps the manifest `id`, so no scene or content reference changes.
2. **Keep the size.** A replacement keeps the dimensions in this document. If the size must change, update `dimensions` (and, for spritesheets, `frames`) in `manifest.json` in the same change, and update this document.
3. **Spritesheets.** Keep the frame size (32×48 px), the single-row layout, the frame count, and the `animations` frame indices. A change to any of these needs a manifest update in the same change.
4. **Format.** Keep SVG, as the current files are. A PNG replacement is allowed only if the manifest `path` is changed to the new file name in the same change.
5. **Path.** Keep the file at the manifest `path`, or update the `path`.
6. **Interaction bounds.** Keep `interactionBounds` equal to the new art size for every entry that has them.
7. **File-only ids.** Before code uses a *file only* id, add its manifest entry with the size listed here.
8. **Audio.** `audio/ambient-room.wav` is not in this table. The temporary file is 0.1 s, 8 kHz, mono, 8-bit PCM. Keep the same format where possible.
