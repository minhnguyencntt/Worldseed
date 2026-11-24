---
id: "01M842QZ3FBXPPNVH4X9CY1PZS"
kind: requirement
parent: 01M842QZ3EY2N09KNHTNGVYZCB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Backend module with YAML config, slog logging and health endpoint

Context: no Go module exists in backend/. Desired behavior: backend/go.mod (Chi, yaml.v3), configs/config.example.yaml, a loader applying env overrides for token secret and Git/hosting settings, slog JSON logger, and a Chi router exposing GET /healthz. Expected result: the server can be constructed from a config and answers health checks. Why: every later endpoint needs config and routing.

## Acceptance criteria
- Given configs/config.example.yaml, when loaded, then server address, auth and git fields are populated
- Given env STORYFORGE_TOKEN_SECRET and STORYFORGE_GIT_TOKEN, when loading, then they override YAML values
- Given GET /healthz, when called, then status 200 and JSON {"status":"ok"} are returned
- Given a config missing auth.token_secret, when loaded, then an error is returned


## Scope
- In scope: config package
- In scope: example config
- In scope: router and health
- In scope: main entrypoint
- Out of scope: player endpoints


## Technical constraints
- gopkg.in/yaml.v3 and github.com/go-chi/chi/v5
- stdlib log/slog


## Definition of done
- Config, logger and health implemented


## Clarifying questions
- None
