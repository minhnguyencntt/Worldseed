---
id: "01M85E1KCJENRTREW57A9C8N8P"
kind: unit
parent: 01M85E1KCJGH7AVDK6E88CAQKM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm counter and over-limit guard in ContributionSheet

Context: length uses Array.from(text.trim()).length and overLimit blocks submit. Expected result: guard, counter and alert present.

## Acceptance criteria
- handleSubmit returns before submitContribution when overLimit is true
- The counter paragraph id contribution-idea-count renders `${length} / ${MAX_PROMPT_LENGTH}` and the alert id contribution-idea-limit renders when overLimit


## Scope
- In scope: overLimit branch and counter JSX
- Out of scope: Tests
- Preserve: Existing texts


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-LEN


## Definition of done
- Guard and texts confirmed present, added only if missing


## Clarifying questions
- None
