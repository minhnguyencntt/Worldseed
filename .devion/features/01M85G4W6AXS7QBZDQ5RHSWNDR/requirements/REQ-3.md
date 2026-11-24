---
id: "01M85G4W6AFSNHZ3WQXQA4JVAF"
kind: requirement
parent: 01M85G4W6AXS7QBZDQ5RHSWNDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History error alert and Retry stay identifiable and loading/empty/error tests pass

The history error paragraph (L155) and Retry button (L157) must remain working while the other status elements change. Add data-testid to the error alert and run the loading, empty and error/Retry suites against the real component.

## Acceptance criteria
- Given listMine rejects, when rendered, then data-testid contribution-history-error shows the error message and a Retry button is present
- Given Retry is clicked, then the loading message reappears and listMine is called again


## Scope
- In scope: data-testid on error alert
- Out of scope: Retry logic changes
- Preserve: role="alert"
- Preserve: Retry button label and reloadKey behavior


## Technical constraints
- Edit only ContributionSheet.tsx


## Definition of done
- Error alert has test id; existing history tests pass


## Clarifying questions
- None
