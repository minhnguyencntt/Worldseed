---
id: "01M84SZR3W7FM9VA306H2P970E"
kind: unit
parent: 01M84SZR3WZAQBSPR47M8X0C14
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: .gitignore holds depth-independent node_modules/ rule unit tests

Test reads the real .gitignore and asserts the rule lines.

## Acceptance criteria
- Given the real .gitignore, then lines include node_modules/
- Given the real .gitignore, then lines exclude game/node_modules/


## Scope
- In scope: tests/gitignoreRule.test.ts
- Out of scope: git


## Technical constraints
- Read real file with readFileSync


## Definition of done
- Test passes


## Clarifying questions
- None
