---
id: "01M84QQ159W48K8ABA1D3A18DQ"
kind: requirement
parent: 01M84QQ159MHYMS1M5PZ0GQ0KJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Ambient audio file exists under game/public/assets

Context: manifest id audio:ambient-room points to worlds/the-boys-room/audio/ambient-room.wav, absent under game/public/assets. Desired behavior: a valid short PCM WAV exists there. Why: audio asset must load without a missing-asset report.

## Acceptance criteria
- Given the manifest path, When resolved under game/public/assets, Then a non-empty file exists
- Given the file bytes, When the first 12 bytes are read, Then they are RIFF....WAVE


## Scope
- In scope: ambient-room.wav
- Out of scope: SVG assets
- Out of scope: audio playback code
- Preserve: frontend/public copy


## Technical constraints
- Temporary placeholder tone/silence, documented as not production audio


## Dependencies
- INT


## Definition of done
- WAV present with valid header


## Clarifying questions
- None
