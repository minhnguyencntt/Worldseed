---
id: "01M84660BF5A7SM8CHX3Z5ZQ61"
kind: unit
parent: 01M84660BE665CCS8GD3MBY7ZX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add admin Middleware and Admin/Round config

Implement admin.Middleware and config AdminConfig, RoundConfig.

## Acceptance criteria
- 401 body is plain text unauthorized
- Env STORYFORGE_ADMIN_TOKEN overrides admin.token


## Scope
- In scope: backend/internal/admin/middleware.go
- In scope: backend/internal/config/config.go
- In scope: backend/configs/config.example.yaml
- Preserve: Contribution defaults


## Technical constraints
- Never log the token
- New file: `backend/internal/admin/middleware.go`
- Code path: `backend/internal/config/config.go`
- Code path: `backend/configs/config.example.yaml`


## Dependencies
- R4


## Definition of done
- go build ./...


## Clarifying questions
- None
