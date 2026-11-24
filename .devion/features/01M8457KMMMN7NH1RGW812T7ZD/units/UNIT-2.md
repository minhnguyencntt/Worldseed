---
id: "01M8457KMN4FKC2PM9FAK6YH9B"
kind: unit
parent: 01M8457KMM85WJCJXJHN26TC5R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the Markdown contribution store and path sanitizer

Context: the service needs a Store. Desired behavior: Store writes worlds/<world>/rounds/<round>/contributions/<id>.md with a generated ID under a mutex, refuses overwrite, commits via the Git interface, and rejects unsafe path segments. Expected result: concurrent submissions never collide. Why: immutability and safety.

## Acceptance criteria
- Given two concurrent Save calls, when both complete, then two different files exist and each contains its own prompt
- Given an existing file for an ID, when Save would write it again, then the write fails and the file is unchanged
- Given a worldID or roundID containing .., a slash or a backslash, when Save runs, then safepath.ErrUnsafe is returned and nothing is written


## Scope
- In scope: Each contribution becomes a distinct Markdown file; traversal is rejected.
- Out of scope: Writing tests
- Out of scope: Frontend changes
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI
- New file: `backend/internal/safepath/safepath.go`
- New file: `backend/internal/contribution/store.go`
- New file: `backend/internal/contribution/model.go`


## Definition of done
- Product code compiles with go build ./...


## Clarifying questions
- None
