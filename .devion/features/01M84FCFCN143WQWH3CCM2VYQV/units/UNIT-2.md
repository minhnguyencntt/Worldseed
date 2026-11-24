---
id: "01M84FCFCP7Z364HXSHWWD0S44"
kind: unit
parent: 01M84FCFCPBXYMG9K6PWY33XMM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Validate execution timeout, retries, budget and provider kind in LoadFS

Add a validate(cfg *Config) error helper checking execution_timeout, max_retries, max_budget and provider_kind, called at the end of LoadFS.

## Acceptance criteria
- Negative timeout, retries, budget and unknown provider return key-naming errors
- Valid values return no error


## Scope
- In scope: config.go validate
- Out of scope: new fields defaults
- Preserve: repo_path error


## Technical constraints
- Code path: `backend/worker/internal/config/config.go`


## Dependencies
- ACT1


## Definition of done
- validate wired into LoadFS


## Clarifying questions
- None
