---
id: "01M842QZ3FS0WG6AMX039W3HJM"
kind: unit
parent: 01M842QZ3FBXPPNVH4X9CY1PZS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create backend module, config loader, logger and health router

Create the backend Go module and the config loader with env overrides, slog logger setup, Chi router with /healthz, and main entrypoint.

## Acceptance criteria
- Config.Load returns populated Config from YAML with env overrides
- GET /healthz returns 200 ok


## Scope
- In scope: backend module files
- Out of scope: player code
- Preserve: backend/README.md


## Technical constraints
- yaml.v3, chi v5, slog
- New file: `backend/go.mod`
- New file: `backend/configs/config.example.yaml`
- New file: `backend/internal/config/config.go`
- New file: `backend/internal/server/server.go`
- New file: `backend/cmd/server/main.go`


## Definition of done
- `go build ./...` succeeds in backend/


## Clarifying questions
- None
