---
id: "01M85A0HWEW0Y4N23ZQ7JMQDAP"
kind: unit
parent: 01M85A0HWEPH9MY301JBDD1E8G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: validateWorld scene character reference unit tests

Add in-memory world objects to tests/content.test.ts and assert validateWorld errors.

## Acceptance criteria
- Each bad reference yields its error.
- A valid NPC yields none.


## Scope
- In scope: game/tests/content.test.ts
- Out of scope: product code
- Preserve: Existing tests


## Technical constraints
- Build LoadedWorld objects inline; no filesystem


## Definition of done
- Tests pass


## Clarifying questions
- None
