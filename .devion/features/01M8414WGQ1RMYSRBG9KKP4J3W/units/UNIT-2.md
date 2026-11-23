---
id: "01M8414WGRTC3GBS9SMXCA6WWY"
kind: unit
parent: 01M8414WGR9EE5R9VNW4JSS6WM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Scaffold backend Go Chi module and YAML config

Context: No Go backend exists at tip.
Desired behavior: Add root Go module with config.LoadFS and NewRouter GET /healthz.
Expected result: Root builds as a Go module with example YAML; config load uses fs.FS.
Why: Implements REQ-BE product code only.

## Acceptance criteria
- Given Act complete, when inspecting root paths, then go.mod, main.go, config.go, router.go, and config.example.yaml exist.
- Given LoadFS reading example-shaped YAML, when called, then Addr and RepoPath fields populate from YAML keys server.addr and git.repo_path.


## Scope
- In scope: Root Go module scaffold
- In scope: YAML LoadFS
- In scope: Chi healthz router
- In scope: example YAML
- Out of scope: *_test.go files
- Out of scope: Contribution/admin APIs
- Out of scope: Real Git operations
- Out of scope: Nested backend/ directory
- Preserve: No database dependencies in go.mod


## Technical constraints
- Use chi router and gopkg.in/yaml.v3
- Config load API must accept fs.FS
- Files at repository root only
- New file: `go.mod`
- New file: `main.go`
- New file: `config.go`
- New file: `router.go`
- New file: `config.example.yaml`


## Dependencies
- REQ-BE


## Definition of done
- All code_paths created
- No test files added by this Act


## Clarifying questions
- None
