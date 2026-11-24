---
id: "01M85CR1JWQ1MB153N4NWYPS4R"
kind: unit
parent: 01M85CR1JV1RX5ZN20AB0RTGVW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Gate ContributionSheet submit on zero remaining quota

Use the existing remaining value to disable input and Send and show a clear message.

## Acceptance criteria
- remaining 0 disables Send and textarea and shows the message
- handleSubmit returns early at zero quota


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Out of scope: Backend
- Preserve: Contributions left text


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- No submit at zero quota


## Clarifying questions
- None
