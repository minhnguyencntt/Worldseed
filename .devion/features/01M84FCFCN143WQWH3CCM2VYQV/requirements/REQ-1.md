---
id: "01M84FCFCNBNVEEKQ95N64VS9Q"
kind: requirement
parent: 01M84FCFCN143WQWH3CCM2VYQV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker config exposes work root, max budget, auto-publish and provider kind with defaults

Context: WorkerConfig has no fields for work root, budget, publish mode or provider. Desired behavior: add WorkRoot (work_root), MaxBudget (max_budget, float USD), AutoPublish (auto_publish) and ProviderKind (provider_kind) and default them in LoadFS. Expected result: omitted keys yield work_root .storyforge/work, max_budget 5, auto_publish false, provider_kind mock. Why: safe supervised defaults.

## Acceptance criteria
- Given YAML omitting the new keys, when LoadFS runs, then WorkRoot is .storyforge/work, MaxBudget is 5, AutoPublish is false and ProviderKind is mock
- Given YAML setting work_root, max_budget, auto_publish true and provider_kind claude, when LoadFS runs, then those values are returned unchanged


## Scope
- In scope: WorkerConfig fields
- In scope: defaults in LoadFS
- In scope: config.example.yaml keys
- Out of scope: Validation of values
- Preserve: Existing fields and defaults


## Technical constraints
- Mirror the existing default-constant pattern


## Definition of done
- Fields and defaults present
- Example YAML updated


## Clarifying questions
- None
