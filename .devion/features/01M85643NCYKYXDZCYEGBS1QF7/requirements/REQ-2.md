---
id: "01M85643NDTVPSXJZ4PQS2PXG9"
kind: requirement
parent: 01M85643NCYKYXDZCYEGBS1QF7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · preload.test.ts proves BootScene uses the planner and fallback

Context: BootScene imports '@game/...' aliases, which game/vitest.config.ts does not define, so game/tests cannot import it. Desired behavior: add the alias and test BootScene with phaser, content and fallback loader mocked. Expected result: tests show only planned assets load, unknown refs warn, and resolveKey returns 'fallback:missing' for unknown or failed ids. Why: SG-5.4.3 done-when.

## Acceptance criteria
- Given scene refs 'objects/bed' (known) and 'objects/ghost' (unknown), when preload runs, then load.image is called once for the bed and console.warn reports ghost
- Given preload ran, when generateTexture is inspected, then it was called with 'fallback:missing'
- Given an unknown or loaderror-failed id, when resolveKey runs, then 'fallback:missing' is returned; known id returns itself


## Scope
- In scope: @game alias in game/vitest.config.ts
- In scope: BootScene assertions in preload.test.ts
- Out of scope: Changing BootScene
- Preserve: Existing game test include pattern


## Technical constraints
- vi.mock('phaser') and the content module; no real Phaser


## Definition of done
- BootScene cases pass from game/tests


## Clarifying questions
- None
