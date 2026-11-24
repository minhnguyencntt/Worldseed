---
id: "01M84QQ1592WDDZCDDNS8ZK59J"
kind: unit
parent: 01M84QQ159W48K8ABA1D3A18DQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add ambient-room.wav under game/public/assets/worlds/the-boys-room/audio

Copy the existing temporary 8kHz mono 8-bit PCM ambient-room.wav (844 bytes) from the frontend public tree so the audio manifest entry resolves.

## Acceptance criteria
- audio/ambient-room.wav exists and is non-empty
- Header is RIFF....WAVE


## Scope
- In scope: One WAV file
- Out of scope: SVGs
- Out of scope: tests
- Preserve: frontend copy


## Technical constraints
- Byte-identical copy
- New file: `game/public/assets/worlds/the-boys-room/audio/ambient-room.wav`


## Dependencies
- REQ2


## Definition of done
- WAV exists


## Clarifying questions
- None
