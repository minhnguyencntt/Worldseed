---
id: "01M8457KMN4DJRKMWDKA4ZAEXQ"
kind: unit
parent: 01M8457KMM85WJCJXJHN26TC5R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Markdown contribution store and path sanitizer unit tests

Unit tests written from the requirement spec with mocked Git, clock and temp-dir filesystem only. Context: each contribution becomes a distinct Markdown file; traversal is rejected. Expected result: all listed tests pass.

## Acceptance criteria
- Given two concurrent Save calls, when both complete, then two different files exist and each contains its own prompt
- Given an existing file for an ID, when Save would write it again, then the write fails and the file is unchanged
- Given a worldID or roundID containing .., a slash or a backslash, when Save runs, then safepath.ErrUnsafe is returned and nothing is written
- Given a saved contribution, when Get(id) and ListByPlayer run, then the stored fields are returned


## Scope
- In scope: Unit tests with fakes
- Out of scope: Running the server
- Out of scope: Browser or e2e checks
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Listed tests pass via the unit command


## Clarifying questions
- None
