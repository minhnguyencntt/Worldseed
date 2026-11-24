---
id: "01M85B0RB8BGHZHPABD17NWAH3"
kind: requirement
parent: 01M85B0RB7DRTS8MPCJSEZNWYH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · validateWorld scene character tests assert exact path-tagged errors

Context: game/src/content/loader.ts L142-L146 reports 'scenes[<id>].characters[<i>].id: unknown character <id>'. Desired behavior: tests assert the exact message, the index and absence of errors when characters are undefined or valid. Expected result: removing the check fails a test. Why: dangling character references must be caught at load time.

## Acceptance criteria
- Given a scene with an unknown character at index 1, when validateWorld runs, then the errors contain 'scenes[bedroom].characters[1].id: unknown character ghost'
- Given a scene with no characters field, when validateWorld runs, then no character error is reported
- Given one unknown scene character, when validateWorld runs, then exactly one error is reported


## Scope
- In scope: validateWorld scene characters branch
- Out of scope: Dialogue speaker checks
- Preserve: Existing error strings


## Technical constraints
- Tests build LoadedWorld objects in memory


## Definition of done
- Check covered by tests that fail without it


## Clarifying questions
- None
