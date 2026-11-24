---
id: "01M84660BDP8DG0MP2AG2HZ8VS"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5 · Implement round lifecycle and admin API

Context: the backend stores contributions as Markdown under worlds/<world>/rounds/<round>/contributions and has no round write model, scheduler or admin API. Desired behavior: a round model persisted in round.yaml with a transition table, open/close that freeze a snapshot.yaml and record the Git commit SHA, a clock-injected scheduler, and admin endpoints behind an admin token. Expected result: rounds move through the lifecycle only by legal transitions and admins can drive them over HTTP. Why: the Worker and the next-round cycle depend on a trustworthy round record.

## Acceptance criteria
- Given a round in any status, when a transition not in the table is requested, then it is rejected with ErrIllegalTransition and round.yaml is unchanged
- Given an OPEN round, when it is closed, then snapshot.yaml is written once, the freeze commit SHA is recorded and status is CLOSED
- Given a frozen round, when a contribution is saved, then the store rejects it and no file is written
- Given a fake clock, when it passes starts_at or ends_at, then the scheduler opens or closes the round
- Given a request without or with a wrong admin token, when any admin endpoint is called, then the response is 401


## Scope
- In scope: backend/internal/round package
- In scope: Git HEAD lookup in gitrepo
- In scope: frozen guard in contribution FileStore
- In scope: admin middleware, round endpoints, execution endpoints
- In scope: config for admin token and round defaults
- Out of scope: Local Worker
- Out of scope: frontend admin UI
- Out of scope: release publishing
- Out of scope: changing the existing world current-round reader
- Preserve: existing contribution validation behaviour
- Preserve: player session endpoints
- Preserve: gitrepo Commit signature


## Technical constraints
- No database; state lives in YAML files committed through gitrepo.Committer
- Go 1.22, chi v5, yaml.v3, module github.com/worldseed/storyforge/backend
- Clock is injected, never time.Now directly in tested code


## Definition of done
- All six requirements implemented with unit tests passing via go test ./...


## Non-functional requirements
- Admin token compared in constant time


## Clarifying questions
- None
