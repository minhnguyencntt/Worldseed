---
id: "01M85G4W6AGE79PKNJMDJ75AJA"
kind: requirement
parent: 01M85G4W6AXS7QBZDQ5RHSWNDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Submit success feedback is targeted by its own test id in its test

The success paragraph (L153) shares role="status" with the loading and empty messages, so findByRole('status') in tests/contributionSuccessFeedback.test.tsx is ambiguous. Add data-testid="contribution-success" and make the test target it.

## Acceptance criteria
- Given a successful send, when submitted, then getByTestId contribution-success has text 'Suggestion sent'
- Given a 429 error or an edit after success, then queryByTestId contribution-success is null


## Scope
- In scope: data-testid on success paragraph
- In scope: success feedback test selectors
- Out of scope: Error alert changes
- Preserve: id contribution-idea-success
- Preserve: role="status"


## Technical constraints
- vitest with mocked submitContribution and listMine


## Definition of done
- Success test no longer queries by role status


## Clarifying questions
- None
