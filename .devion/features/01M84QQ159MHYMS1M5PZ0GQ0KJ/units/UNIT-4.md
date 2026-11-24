---
id: "01M84QQ159CRQ26YNXFEZCFNRA"
kind: unit
parent: 01M84QQ159W48K8ABA1D3A18DQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ambient-room.wav resolves and has a RIFF header unit tests

Add game/tests/publicAssetAudio.test.ts that reads the manifest and the WAV read-only and asserts existence, non-empty size and RIFF/WAVE header.

## Acceptance criteria
- WAV path exists and is non-empty
- First 12 bytes are RIFF....WAVE


## Scope
- In scope: One new test file
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- vitest


## Dependencies
- ACT2


## Definition of done
- Test file passes


## Clarifying questions
- None
