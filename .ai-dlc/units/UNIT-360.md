# UNIT-360 — Act: Create asset folders with temporary pixel-art files

## Summary
Add the asset tree and one real file per folder.

## Description
Add SVG pixel-art assets for background, furniture, objects, a 2-frame boy spritesheet, a dust effect, ui icon, frame and cursor, and a tiny WAV for audio. Mark them temporary in a README.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg` · `new: bedroom-room.svg` · new
- **Do:** Create a 320x180 SVG with a wall rect, a floor rect and a lamp-glow rect using warm colors, shape-rendering crispEdges.

```
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" shape-rendering="crispEdges"><rect width="320" height="110" fill="#6b5b73"/><rect y="110" width="320" height="70" fill="#8a5a3c"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 2 — `game/public/assets/worlds/the-boys-room/furniture/bed.svg` · `new: bed.svg` · new
- **Do:** Create a 100x35 SVG of a bed: frame rect, blanket rect, pillow rect.

```
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="35" shape-rendering="crispEdges"><rect width="100" height="35" fill="#5a3d2b"/><rect x="4" y="6" width="92" height="22" fill="#3f6e8c"/><rect x="6" y="8" width="20" height="10" fill="#e8e0d0"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 3 — `game/public/assets/worlds/the-boys-room/furniture/bookshelf.svg` · `new: bookshelf.svg` · new
- **Do:** Create a 44x90 SVG bookshelf: wood body rect with 4 shelf rects and colored book rects.

```
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="90" shape-rendering="crispEdges"><rect width="44" height="90" fill="#4a3020"/><rect x="3" y="4" width="38" height="18" fill="#a04040"/><rect x="3" y="28" width="38" height="18" fill="#40a070"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 4 — `game/public/assets/worlds/the-boys-room/furniture/desk.svg` · `new: desk.svg` · new
- **Do:** Create a 70x28 SVG desk with a top rect and two leg rects.

```
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="28" shape-rendering="crispEdges"><rect width="70" height="6" fill="#7a5230"/><rect x="3" y="6" width="6" height="22" fill="#5a3d2b"/><rect x="61" y="6" width="6" height="22" fill="#5a3d2b"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 5 — `game/public/assets/worlds/the-boys-room/objects/old-computer.svg` · `new: old-computer.svg` · new
- **Do:** Create a 30x34 SVG CRT computer: beige body rect and a dark screen rect with a green glow rect.

```
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" shape-rendering="crispEdges"><rect width="30" height="34" fill="#c9c0a8"/><rect x="3" y="3" width="24" height="18" fill="#1a2a22"/><rect x="6" y="6" width="10" height="4" fill="#5adf8a"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 6 — `game/public/assets/worlds/the-boys-room/objects/door.svg` · `new: door.svg` · new
- **Do:** Create a 40x80 SVG door: frame rect, panel rect, knob rect.

```
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="80" shape-rendering="crispEdges"><rect width="40" height="80" fill="#3a2a20"/><rect x="4" y="4" width="32" height="72" fill="#8a5a3c"/><rect x="30" y="40" width="3" height="3" fill="#e0c060"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 7 — `game/public/assets/worlds/the-boys-room/objects/window.svg` · `new: window.svg` · new
- **Do:** Create a 60x50 SVG window: frame rect, sky rect, cross-bar rects.

```
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" shape-rendering="crispEdges"><rect width="60" height="50" fill="#e8e0d0"/><rect x="3" y="3" width="54" height="44" fill="#2a3a6a"/><rect x="28" y="3" width="4" height="44" fill="#e8e0d0"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 8 — `game/public/assets/worlds/the-boys-room/characters/boy-sheet.svg` · `new: boy-sheet.svg` · new
- **Do:** Create a 64x48 SVG with two 32x48 frames side by side: frame 0 boy sitting, frame 1 same boy with head shifted 1px for idle.

```
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="48" shape-rendering="crispEdges"><rect x="10" y="6" width="12" height="12" fill="#e8c8a0"/><rect x="8" y="18" width="16" height="22" fill="#c05050"/><rect x="42" y="7" width="12" height="12" fill="#e8c8a0"/><rect x="40" y="19" width="16" height="22" fill="#c05050"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 9 — `game/public/assets/worlds/the-boys-room/effects/dust.svg` · `new: dust.svg` · new
- **Do:** Create a 4x4 SVG light dust mote with one pale rect.

```
<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" shape-rendering="crispEdges"><rect width="4" height="4" fill="#fff3c0" opacity="0.6"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 10 — `game/public/assets/worlds/the-boys-room/audio/ambient-room.wav` · `new: ambient-room.wav` · new
- **Do:** Generate a 0.1 s silent 8 kHz mono 8-bit PCM WAV with a one-off node command (44-byte header plus 800 bytes of 0x80).

```
node -e "const d=Buffer.alloc(800,128);const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+800,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(8000,24);h.writeUInt32LE(8000,28);h.writeUInt16LE(1,32);h.writeUInt16LE(8,34);h.write('data',36);h.writeUInt32LE(800,40);require('fs').writeFileSync('game/public/assets/worlds/the-boys-room/audio/ambient-room.wav',Buffer.concat([h,d]))"
```

- **Expected:** WAV file of 844 bytes exists starting with RIFF

### Step 11 — `game/public/assets/ui/icons/sound.svg` · `new: sound.svg` · new
- **Do:** Create a 16x16 SVG speaker icon with two rects.

```
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><rect x="2" y="6" width="4" height="4" fill="#f0e0b0"/><rect x="6" y="3" width="4" height="10" fill="#f0e0b0"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 12 — `game/public/assets/ui/frames/panel-frame.svg` · `new: panel-frame.svg` · new
- **Do:** Create a 24x24 SVG nine-slice-style frame: dark outer rect and inner lighter rect.

```
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" shape-rendering="crispEdges"><rect width="24" height="24" fill="#2a1f1a"/><rect x="3" y="3" width="18" height="18" fill="#4a3828"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 13 — `game/public/assets/ui/cursors/pointer.svg` · `new: pointer.svg` · new
- **Do:** Create a 16x16 SVG pointer cursor made of stacked rects.

```
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><rect x="2" y="2" width="2" height="10" fill="#fff"/><rect x="4" y="4" width="2" height="6" fill="#fff"/></svg>
```

- **Expected:** File exists and begins with <svg

### Step 14 — `game/public/assets/README.md` · `new: README.md` · new
- **Do:** Write a note that all assets are temporary hand-made placeholders, not production art, and list each file to be replaced with final art of the same dimensions.
- **Expected:** README lists every asset and says they are temporary

## Acceptance criteria
- Given the repo, when the folders are listed, then all 9 folders exist
- Given each folder, when read, then it has a non-empty file

## Definition of done
- All files created and non-empty
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-360.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-071
- Requirement: REQ-180
- Unit (Act): UNIT-360
- Unit (Verify): UNIT-363
- Status: completed
- Change: UPDATE
