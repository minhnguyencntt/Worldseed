---
id: "01M85CR1JV1RX5ZN20AB0RTGVW"
kind: requirement
parent: 01M85CR1JVMXY9E2T3DSCB7B1J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Submit is blocked with a clear message when the remaining quota is 0

Context: remaining is computed from sent entries but never gates submit. Desired behavior: when remaining is 0 the Send button and textarea are disabled and a message 'No contributions left this round' is shown. Expected result: no request at zero quota. Why: the player understands why they cannot send.

## Acceptance criteria
- Given 5 sent contributions, when the sheet renders, then Send is disabled and 'No contributions left this round' is shown
- Given 4 sent contributions, when the sheet renders, then Send is enabled and no quota message is shown


## Scope
- In scope: Quota gating in ContributionSheet
- Out of scope: Backend quota logic
- Preserve: Contributions left counter text


## Technical constraints
- Use existing remaining value derived from entries


## Definition of done
- Zero quota blocks submit with message


## Clarifying questions
- None
