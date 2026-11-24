---
id: "01M85G4W6AXS7QBZDQ5RHSWNDR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4.5 Distinguish loading message from submit success feedback

Context: ContributionSheet renders the submit success message, the history loading message and the empty history message all with role="status" (ContributionSheet.tsx L153, L154, L159). tests/contributionSuccessFeedback.test.tsx uses findByRole('status') and can match the wrong element. Desired behavior: each status element has its own test id and the success test targets the success element. Expected result: loading, empty and error/Retry unit tests pass against real code. Why: unambiguous, stable assertions.

## Acceptance criteria
- Given history is loading, when the sheet renders, then the loading message is found by test id contribution-history-loading and the success element is absent
- Given a successful send, when submitted, then the success message is found by test id contribution-success
- Given the loading, empty and error/Retry unit tests run with mocked client, then they all pass against the real ContributionSheet


## Scope
- In scope: ContributionSheet status elements
- In scope: contributionSuccessFeedback test targeting
- Out of scope: Backend changes
- Out of scope: Visual restyling
- Out of scope: New API calls
- Preserve: Existing roles, message texts and ids
- Preserve: Retry behavior


## Technical constraints
- React + TypeScript + vitest with mocked ../src/api/client
- No backend or mock-data replacement


## Definition of done
- Status elements distinguishable by test id
- Related unit tests pass


## Non-functional requirements
- Keep accessibility roles intact


## Clarifying questions
- None
