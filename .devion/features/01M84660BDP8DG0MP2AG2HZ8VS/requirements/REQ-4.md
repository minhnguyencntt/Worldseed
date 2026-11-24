---
id: "01M84660BE665CCS8GD3MBY7ZX"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin token middleware and round/admin configuration

Context: no admin protection exists. Desired behavior: middleware requiring Authorization: Bearer <admin token> with constant-time comparison, failing closed when no token is configured; config gains admin.token (env STORYFORGE_ADMIN_TOKEN) and round.duration, base_release, scheduler_interval defaults. Expected result: admin routes are unreachable without the token.

## Acceptance criteria
- Given no Authorization header, when called, then 401 and next handler not run
- Given a wrong token, when called, then 401
- Given an empty configured token, when any request arrives, then 401
- Given round config absent, when loaded, then duration is 24h, base_release 1.0.0, scheduler_interval 30s


## Scope
- In scope: backend/internal/admin/middleware.go
- In scope: backend/internal/config/config.go
- In scope: backend/configs/config.example.yaml
- Out of scope: routes
- Preserve: existing config defaults and env overrides


## Technical constraints
- crypto/subtle ConstantTimeCompare over sha256 digests


## Definition of done
- middleware and config compile


## Non-functional requirements
- Fail closed


## Clarifying questions
- None
