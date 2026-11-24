---
id: "01M84SNEWGP2GNT0CZ0JFS4QMA"
kind: unit
parent: 01M84SNEWGF2ZTDAXXH2317FGS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: phaser version guard reads real package.json and lockfile

Write tests/phaserVersionGuard.test.ts reading the real files and asserting 3.90.x agreement.

## Acceptance criteria
- Real files produce no problems
- Root specifier equals package.json specifier


## Scope
- In scope: game/frontend/tests/phaserVersionGuard.test.ts
- Out of scope: Mocking the files
- Preserve: Existing tests


## Technical constraints
- Real files read with readFileSync, no network


## Dependencies
- A2


## Definition of done
- Guard passes


## Clarifying questions
- None
