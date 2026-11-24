---
id: "01M847PS3RT4DY71541RXZRA22"
kind: requirement
parent: 01M847PS3RV2W9XR6T9VQV11Y7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Suggest What Happens Next sheet submits prompts and shows history

Context: no contribution UI exists. Desired behavior: a Suggest What Happens Next button in the playing view opens a sheet with a textarea; submit creates an anonymous session if needed then POSTs the prompt; the sheet shows remaining contributions, a note that ideas are considered when the Round closes, and history with sending, sent and failed states. Expected result: errors from 401/409/429 show readable messages. Why: players steer the next release.

## Acceptance criteria
- Given the sheet is open, when a prompt is submitted, then fetch POST /api/v1/contributions receives world_id and prompt and the history lists it as sent
- Given the API answers 429 or 409, then the sheet shows an error message and the history entry is failed
- Given the sheet, then the text 'considered when the Round closes' and the remaining count are visible
- Given a 401 on submit, then a session is created via POST /api/v1/player/session and the submit is retried once


## Scope
- In scope: API client contribution calls
- In scope: ContributionSheet component
- In scope: App button wiring
- Out of scope: Backend remaining-count endpoint
- Preserve: Existing game flow


## Technical constraints
- Remaining = MAX_PER_PLAYER constant (5) minus history length since the API exposes no count
- credentials: include for cookies


## Definition of done
- Sheet usable from the playing view


## Non-functional requirements
- Textarea has an accessible label


## Clarifying questions
- None
