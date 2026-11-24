---
id: "01M84J3C1XZQJB62VNW3AM21NN"
kind: unit
parent: 01M84J3C1WPPCAQ59P5HVH4BD6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm config.go and the example YAML hold no worker keys

Read config.go and config.example.yaml and confirm they hold no worker or execution settings. Remove any that exist; at the time of reading there are none, so no edit is expected.

## Acceptance criteria
- Config has exactly the eight kept sections
- config.example.yaml has exactly the eight kept sections


## Scope
- In scope: backend/internal/config/config.go
- In scope: backend/configs/config.example.yaml
- Out of scope: Test files
- Preserve: Defaults and env overrides


## Technical constraints
- Code path: `backend/internal/config/config.go`
- Code path: `backend/configs/config.example.yaml`


## Definition of done
- Neither file mentions worker, execution, work_root, max_budget, auto_publish or an agent provider kind


## Clarifying questions
- None
