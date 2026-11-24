---
id: "01M855V4N22EDHD77CVBMF67Y0"
kind: unit
parent: 01M855V4N174WC53KBTD8Z7YYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Fallback texture and key resolution

Test BootScene.resolveKey and effectContext key usage with mocked Phaser.

## Acceptance criteria
- unknown and failed ids return fallback
- dust uses resolved key


## Scope
- In scope: frontend/tests/bootSceneFallback.test.ts
- Out of scope: browser


## Technical constraints
- Mock phaser


## Definition of done
- tests pass


## Clarifying questions
- None
