# UNIT-379 — Act: Add dimensions to the three ui manifest entries

## Summary
Record 16x16, 24x24 and 16x16 dimensions on the ui entries in manifest.json.

## Description
Edit the ui:icon-sound, ui:panel-frame and ui:cursor-pointer entries to add a dimensions object matching the SVG sizes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets[id=ui:icon-sound]` · L75-L79
- **Do:** Add a dimensions field of 16x16 after type on the ui:icon-sound entry.

```
"type": "image" -> "type": "image",
      "dimensions": { "width": 16, "height": 16 }
```

- **Expected:** ui:icon-sound has dimensions 16x16

### Step 2 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets[id=ui:panel-frame]` · L80-L84
- **Do:** Add a dimensions field of 24x24 after type on the ui:panel-frame entry.

```
"type": "image" -> "type": "image",
      "dimensions": { "width": 24, "height": 24 }
```

- **Expected:** ui:panel-frame has dimensions 24x24

### Step 3 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets[id=ui:cursor-pointer]` · L85-L89
- **Do:** Add a dimensions field of 16x16 after type on the ui:cursor-pointer entry.

```
"type": "image" -> "type": "image",
      "dimensions": { "width": 16, "height": 16 }
```

- **Expected:** ui:cursor-pointer has dimensions 16x16 and the file stays valid JSON

## Acceptance criteria
- Given manifest.json, When parsed with parseManifest, Then ok is true
- Given the three ui entries, When read, Then dimensions are 16x16, 24x24 and 16x16

## Definition of done
- Three entries have dimensions
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-379.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-075
- Requirement: REQ-190
- Unit (Act): UNIT-379
- Unit (Verify): UNIT-381
- Status: completed
- Change: UPDATE
