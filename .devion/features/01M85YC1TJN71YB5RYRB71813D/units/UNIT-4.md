---
id: "01M85YC1TKDJQ6XDTZYPPZG0BZ"
kind: unit
parent: 01M85YC1TJGRT1HY7J19V9ABM9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Dialogue card, portrait and choices unit tests

TDD unit tests covering REQ1 acceptance criteria with no network; the manifest is the committed JSON file.

## Acceptance criteria
- Portrait present for boy and absent for unknown speaker
- Choice click calls onChoose with index
- No node renders no Dialogue region


## Scope
- In scope: new test files
- In scope: update storyPanelTitle.test.tsx and story.test.tsx where markup changed
- Out of scope: product code
- Preserve: existing passing assertions


## Technical constraints
- Unit tests with dependencies mocked; no browser or server.


## Dependencies
- ACT1


## Definition of done
- Tests pass in seconds
- Existing title and story tests updated and green


## Clarifying questions
- None
