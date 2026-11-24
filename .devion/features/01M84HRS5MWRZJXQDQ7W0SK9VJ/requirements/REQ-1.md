---
id: "01M84HRS5MC28D5H7Q4PN6JQCH"
kind: requirement
parent: 01M84HRS5MWRZJXQDQ7W0SK9VJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The worker Go module is deleted from backend/

Context: backend/worker is a separate module (module github.com/worldseed/storyforge/worker) holding poller, config, recovery, runner, lock, provider, report, logging and store packages plus configs/config.example.yaml. Desired behavior: the whole directory is removed with its tests. Expected result: no worker files remain. Why: development automation must not live here.

## Acceptance criteria
- Given the repo, when backend/worker is stat'ed, then it does not exist.
- Given backend/go.mod, when read, then it does not reference the worker module.


## Scope
- In scope: All files under backend/worker including tests
- Out of scope: backend/internal packages
- Preserve: backend/go.mod
- Preserve: backend/go.sum


## Definition of done
- backend/worker is gone


## Clarifying questions
- None
