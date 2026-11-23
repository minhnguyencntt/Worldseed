---
id: "01M8414WGR9EE5R9VNW4JSS6WM"
kind: requirement
parent: 01M8414WGQ1RMYSRBG9KKP4J3W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Backend Go/Chi module with YAML config

Context: No Go modules exist at tip.
Desired behavior: Root Go module with Chi router wiring and YAML config loaded through `fs.FS` (not hard-wired only to live disk in the load function used by tests).
Expected result: `go.mod`, `main.go`, `config.go`, `router.go`, and `config.example.yaml` exist; config load returns typed server listen address and git repo path fields.
Why: Backend is the REST/GitOps API host for later phases; Phase-1 only needs scaffold + config wiring.

## Acceptance criteria
- Given the repository after this requirement, when inspecting the repo root, then `go.mod`, `main.go`, `config.go`, `router.go`, and `config.example.yaml` exist.
- Given a YAML document with `server.addr: ":8080"` and `git.repo_path: "."`, when `LoadFS` reads it via `fs.FS`, then the returned Config has Addr `":8080"` and RepoPath `"."`.
- Given `NewRouter`, when constructed, then it registers GET `/healthz` returning HTTP 200 body `ok`.


## Scope
- In scope: Go module scaffold with Chi at repo root
- In scope: YAML config struct + LoadFS
- In scope: Minimal Chi router with /healthz
- In scope: Example YAML config file
- Out of scope: Player/contribution/admin API handlers
- Out of scope: Real Git commit operations
- Out of scope: Authentication
- Out of scope: Nested backend/ directory tree
- Preserve: No database driver or ORM introduction


## Technical constraints
- Mandatory: Go, Chi HTTP router, YAML configuration
- Mandatory: config loading testable via fs.FS / io.Reader without network I/O
- Mandatory: new Go files at repository root only


## Dependencies
- INT-SG1


## Definition of done
- Backend module and example config exist
- Linked Act and Verify units complete


## Non-functional requirements
- Keep dependencies minimal (Chi + YAML decoder only for Phase-1)


## Clarifying questions
- None
