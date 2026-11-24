---
id: "01M84A58QJ2GVQ576HZF7ZTC7R"
kind: requirement
parent: 01M84A58QHZFG2B9G4Z916SAET
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin console displays the current World title

The backend serves GET /api/v1/worlds/{id} returning {id,title} (world.World). AdminApp should fetch it with a client function and display the title in the heading, falling back to WORLD_ID until loaded or on failure.

## Acceptance criteria
- Given GET /api/v1/worlds/the-boys-room returns a title, when AdminApp renders after token entry, then the heading contains that title.
- Given the world request fails, when AdminApp renders, then the heading still shows WORLD_ID and the page does not crash.


## Scope
- In scope: getWorld client function
- In scope: AdminApp heading
- Out of scope: Backend
- Preserve: Existing heading fallback text


## Technical constraints
- Public endpoint, no admin token


## Definition of done
- Title shown; fallback works


## Clarifying questions
- None
