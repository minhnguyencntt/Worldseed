---
id: "01M8457KMNFCG2BFRS3M0TSXDE"
kind: unit
parent: 01M8457KMN0D32YV0MMVR7MRBV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Git CLI committer unit tests

Unit tests written from the requirement spec with a fake command runner only. Context: a Committer interface with a CLI implementation using the configured bot identity. Expected result: all listed tests pass.

## Acceptance criteria
- Given a CLI committer, when Commit runs, then it executes git add -- <path> then git commit with the bot name and email in the working dir
- Given the runner fails on add, when Commit runs, then commit is not executed and the error is returned
- Given an empty path list or a path with .., when Commit runs, then an error is returned and no command runs


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
