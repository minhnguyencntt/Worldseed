---
id: "01M84A58QJE8BHZYN6PG0N5RZ9"
kind: requirement
parent: 01M84A58QHZFG2B9G4Z916SAET
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Contribution-limit field is disabled because no endpoint exists

The backend limit comes from config contribution.max_per_player and the create-round request has no such field, so the input must be disabled and labelled as configured on the server.

## Acceptance criteria
- Given AdminApp is authenticated, when it renders, then the Max contributions per player input is disabled.
- Given it renders, then a note stating the limit is set in server configuration is visible and no request carries the limit value.


## Scope
- In scope: Disable input, add note
- Out of scope: New endpoint
- Preserve: Label text Max contributions per player


## Technical constraints
- Do not invent an endpoint


## Definition of done
- Input disabled, note shown


## Clarifying questions
- None
