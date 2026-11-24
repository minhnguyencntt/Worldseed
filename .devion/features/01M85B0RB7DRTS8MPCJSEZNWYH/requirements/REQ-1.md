---
id: "01M85B0RB8VN2GS0PE22KD4JZY"
kind: requirement
parent: 01M85B0RB7DRTS8MPCJSEZNWYH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · characterSchema tests assert real parsing, defaults and rejection

Context: game/src/content/schema.ts L47-L60 defines characterInteractionSchema and characterSchema with scale default 1, layer default 'characters', required idle animation and optional interaction. The current tests cover only interaction. Desired behavior: tests also assert defaults, required idle and invalid values. Expected result: removing any of these schema rules fails a test. Why: the schema is the content contract for NPCs.

## Acceptance criteria
- Given a character without scale and layer, when parsed, then scale equals 1 and layer equals 'characters'
- Given a character without animations.idle, when parsed, then parsing throws
- Given a character with scale 0 or a negative scale, when parsed, then parsing throws


## Scope
- In scope: characterSchema defaults and rejection rules
- Out of scope: Scene schema
- Out of scope: Loader
- Preserve: Optional interaction behavior


## Technical constraints
- Tests run with vitest from game/ using in-memory input only


## Definition of done
- Schema behavior covered by tests that depend on the real characterSchema


## Clarifying questions
- None
