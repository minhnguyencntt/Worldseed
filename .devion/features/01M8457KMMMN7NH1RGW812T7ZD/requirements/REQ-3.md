---
id: "01M8457KMN0D32YV0MMVR7MRBV"
kind: requirement
parent: 01M8457KMMMN7NH1RGW812T7ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Git writes go through an interface wrapping the Git CLI with a bot identity

Context: contributions must be committed to Git. Desired behavior: gitrepo.Committer interface with a CLI implementation that runs git add and git commit with -c user.name/user.email set from the bot config via an injectable command runner. Expected result: tests mock the runner. Why: credentials never leave the backend and tests need no Git.

## Acceptance criteria
- Given a CLI committer, when Commit runs, then it executes git add -- <path> then git commit with the bot name and email in the working dir
- Given the runner fails on add, when Commit runs, then commit is not executed and the error is returned
- Given an empty path list or a path with .., when Commit runs, then an error is returned and no command runs


## Scope
- In scope: A Committer interface with a CLI implementation using the configured bot identity.
- Out of scope: Admin APIs
- Out of scope: Frontend changes
- Out of scope: Git push
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Acceptance criteria met by implementation


## Clarifying questions
- None
