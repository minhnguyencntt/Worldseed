---
id: "01M85RGSG9N24YPHX5BARHSY5S"
kind: requirement
parent: 01M85RGSG9FBM4NCZ48Q28GFYK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pure PNG encoder writes timestamp-free deterministic bytes and reads its own header size

Context: no PNG encoder exists and no PNG library is a dependency. Desired behavior: a pure function encodes an RgbaImage into a PNG (signature, IHDR, one IDAT via node:zlib at fixed level, IEND) with no tIME or text chunks, and a helper reads width and height from the IHDR. Why: determinism and header checks are the sub-goal's test targets.

## Acceptance criteria
- Given the same RgbaImage, when encodePng runs twice, then both byte arrays are equal
- Given a 4x3 image, when readPngSize reads the encoded bytes, then it returns width 4 and height 3
- Given the encoded bytes, when chunk types are listed, then only IHDR, IDAT and IEND appear


## Scope
- In scope: encodePng
- In scope: readPngSize
- In scope: CRC32
- Out of scope: PNG decoding of pixels
- Out of scope: palette PNG colour types
- Preserve: RgbaImage type from gridToRgba


## Technical constraints
- No new npm dependency; use node:zlib
- Phaser stays on 3.90.x and the existing stack stays


## Dependencies
- frontend/src/lib/gridToRgba.ts


## Definition of done
- Encoder exported and typed


## Non-functional requirements
- Pure: no clock, no randomness, no fs


## Clarifying questions
- None
