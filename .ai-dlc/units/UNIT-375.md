# UNIT-375 — Act: Add ambient-room.wav under game/public/assets/worlds/the-boys-room/audio

## Summary
Create the temporary ambient audio file at its manifest path

## Description
Copy the existing temporary 8kHz mono 8-bit PCM ambient-room.wav (844 bytes) from the frontend public tree so the audio manifest entry resolves.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/audio/ambient-room.wav` · `new: ambient-room.wav` · new
- **Do:** Create the audio folder and copy game/frontend/public/assets/worlds/the-boys-room/audio/ambient-room.wav into it.

```
mkdir -p game/public/assets/worlds/the-boys-room/audio && cp game/frontend/public/assets/worlds/the-boys-room/audio/ambient-room.wav game/public/assets/worlds/the-boys-room/audio/
```

- **Expected:** File exists, 844 bytes, starts with RIFF.

## Acceptance criteria
- audio/ambient-room.wav exists and is non-empty
- Header is RIFF....WAVE

## Definition of done
- WAV exists
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-375.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-074
- Requirement: REQ-188
- Unit (Act): UNIT-375
- Unit (Verify): UNIT-377
- Status: completed
- Change: NEW
