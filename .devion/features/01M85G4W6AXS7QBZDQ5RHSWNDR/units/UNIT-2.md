---
id: "01M85G4W6BSZF7M224V506GPE0"
kind: unit
parent: 01M85G4W6AGE79PKNJMDJ75AJA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add a test id to the submit success message

Edit ContributionSheet.tsx so the success paragraph is addressable by test id.

## Acceptance criteria
- Success paragraph has data-testid contribution-success
- Id and role are unchanged


## Scope
- In scope: ContributionSheet.tsx L153
- Out of scope: Tests
- Preserve: id contribution-idea-success
- Preserve: role status


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attribute added


## Clarifying questions
- None
