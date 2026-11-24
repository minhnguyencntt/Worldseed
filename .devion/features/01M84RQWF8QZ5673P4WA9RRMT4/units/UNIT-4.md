---
id: "01M84RQWF9MAP0PHTWSJ9Q6M72"
kind: unit
parent: 01M84RQWF91CA862C18A1JHBHA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Phaser modules work on 3.90 unit tests

Run the existing phaser unit tests and add an assertion on the installed Phaser version.

## Acceptance criteria
- Installed Phaser.VERSION is 3.90.x
- Config, boot scene and host tests pass


## Scope
- In scope: tests/phaserConfig.test.ts
- Out of scope: Browser runs
- Preserve: Existing assertions


## Technical constraints
- No canvas or browser; mock createGame as existing tests do


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
