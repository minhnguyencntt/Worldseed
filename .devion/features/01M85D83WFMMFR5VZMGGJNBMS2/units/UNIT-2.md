---
id: "01M85D83WG1S3W552AHR484W5T"
kind: unit
parent: 01M85D83WG7166BAHAHVAFVP7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Block over-limit submit with an inline message

Derive overLimit from the trimmed length, render an inline alert, mark the textarea invalid and return early from handleSubmit.

## Acceptance criteria
- Message 'Too long: n / 500' shows when over
- submitContribution not called when over


## Scope
- In scope: ContributionSheet only
- Out of scope: Tests
- Out of scope: Backend
- Preserve: Blank message
- Preserve: Text kept when blocked


## Technical constraints
- No maxLength attribute
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- ACT1


## Definition of done
- Over-limit blocked with message


## Clarifying questions
- None
