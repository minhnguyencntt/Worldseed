# Temporary assets: replacement requirements

These assets are temporary and are not production-quality artwork.

They are hand-made placeholders so that layout, scene wiring and asset loading can be built and tested. Each one is to be replaced with final art under the rules in [Replacement rules](#replacement-rules).

Source of truth: `game/public/assets/worlds/the-boys-room/manifest.json`. Ids below are the ids in that manifest. Where an id is listed as *planned* it is not yet in the manifest and must not be referenced by code until it is added.

## Backgrounds

| Id | File | Format | Size | Notes |
| --- | --- | --- | --- | --- |
| `scene:bedroom` | `backgrounds/bedroom-room.svg` | SVG | 320×180 px | Full scene background. Origin 0,0. |
| `background:wall` | `backgrounds/wall.svg` | SVG | 320×120 px | *Planned.* File exists on disk (`backgrounds/wall.svg`) but has no manifest entry. |
| `background:floor` | — | — | — | *Planned.* No file and no manifest entry. |
| `background:window-view` | — | — | — | *Planned.* No file and no manifest entry. |
| `background:lighting` | — | — | — | *Planned.* No file and no manifest entry. |

## Furniture

| Id | File | Format | Size | Notes |
| --- | --- | --- | --- | --- |
| `objects/bed` | `furniture/bed.svg` | SVG | 100×35 px | Interaction bounds 0,0,100,35. |
| `objects/bookshelf` | `furniture/bookshelf.svg` | SVG | 44×90 px | Interaction bounds 0,0,44,90. |
| `objects/desk` | `furniture/desk.svg` | SVG | 70×28 px | Interaction bounds 0,0,70,28. |
| `furniture:chair` | — | — | — | *Planned.* No file and no manifest entry. |
| `furniture:wardrobe` | — | — | — | *Planned.* No file and no manifest entry. |

## Objects

| Id | File | Format | Size | Notes |
| --- | --- | --- | --- | --- |
| `objects/old-computer` | `objects/old-computer.svg` | SVG | 30×34 px | Interaction bounds 0,0,30,34. |
| `objects/window` | `objects/window.svg` | SVG | 60×50 px | Interaction bounds 0,0,60,50. |
| `objects/door` | `objects/door.svg` | SVG | 40×80 px | Interaction bounds 0,0,40,80. |
| `objects/books` | `objects/books.svg` | SVG | 20×12 px | File exists on disk but has no manifest entry. Add one before use. |
| `objects/secret-door-closed` | `objects/secret-door-closed.svg` | SVG | 40×80 px | File exists on disk but has no manifest entry. Add one before use. |
| `objects/secret-door-open` | `objects/secret-door-open.svg` | SVG | 40×80 px | File exists on disk but has no manifest entry. Add one before use. |

## Characters

| Id | File | Format | Size | Frames | Notes |
| --- | --- | --- | --- | --- | --- |
| `character:boy` | `characters/boy-sheet.svg` | SVG spritesheet | 64×48 px total | 2 frames, each 32×48 px, single row, frame count 2 | Animation `idle`: frames [0, 1] at 2 fps, repeat -1. Origin x 0.5, y 1. |
| `character:boy-walk` | — | — | — | — | *Planned.* No file and no manifest entry. |
| `character:boy-interact` | — | — | — | — | *Planned.* No file and no manifest entry. |

## Effects

| Id | File | Format | Size | Notes |
| --- | --- | --- | --- | --- |
| `effect:dust` | `effects/dust.svg` | SVG | 4×4 px | Single dust mote. |
| `effect:glow` | — | — | — | *Planned.* No file and no manifest entry. |

## Replacement rules

1. **Keep the id.** A replacement file keeps the manifest `id` unchanged, so no scene or content reference has to change.
2. **Keep the size.** A replacement keeps the dimensions listed above. If the size must change, update the `dimensions` (and, for sheets, `frames`) in `manifest.json` in the same change, and update this document.
3. **Spritesheets.** Keep the frame layout: 2 frames of 32×48 px in one row, same frame count, and the same `animations` frame indices, unless the manifest is updated to match.
4. **Format.** Use SVG for the images listed above, as the files are today. A PNG replacement is allowed only if the manifest `path` is updated to the new file name in the same change.
5. **Path.** Keep the file at the path in the manifest, or update the manifest `path`.
6. **Audio.** `audio/ambient-room.wav` is not covered by this table. The temporary file is 0.1 s, 8 kHz, mono, 8-bit PCM. Keep the same format where possible.
7. **Interaction bounds.** Keep `interactionBounds` matching the new art size.
8. **Planned ids.** Do not reference a planned id in content or code until it has a file and a manifest entry.
