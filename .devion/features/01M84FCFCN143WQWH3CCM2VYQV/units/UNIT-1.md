---
id: "01M84FCFCPDQCMNA99MD6EZAWB"
kind: unit
parent: 01M84FCFCNBNVEEKQ95N64VS9Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add work root, max budget, auto-publish and provider kind fields with defaults

Add four fields to WorkerConfig, default constants, default assignment in LoadFS and example YAML keys.

## Acceptance criteria
- WorkerConfig has WorkRoot, MaxBudget, AutoPublish, ProviderKind with yaml tags
- LoadFS applies defaults for omitted keys


## Scope
- In scope: config.go
- In scope: config.example.yaml
- Out of scope: validation
- Preserve: existing defaults


## Technical constraints
- Code path: `backend/worker/internal/config/config.go`
- Code path: `backend/worker/configs/config.example.yaml`


## Definition of done
- Fields and defaults implemented
- Example YAML lists new keys


## Clarifying questions
- None
