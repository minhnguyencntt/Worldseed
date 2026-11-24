---
id: "01M84GTRQQE223EPQ0KYN1GD1W"
kind: unit
parent: 01M84GTRQQXRR9X1JEZ5CSEJ6C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create the poller package with Git interface and Poll detection

Create backend/worker/internal/poller/poller.go. Follow the style of backend/worker/internal/recovery/recovery.go (small interfaces, New constructor, injected now).

## Acceptance criteria
- Poll returns Scheduled and Closed IDs from the Git fake in list order.
- Package compiles with go build ./internal/poller.


## Scope
- In scope: backend/worker/internal/poller/poller.go
- Out of scope: Closing logic
- Out of scope: Tests
- Preserve: Other worker packages


## Technical constraints
- Module path github.com/worldseed/storyforge/worker
- New file: `backend/worker/internal/poller/poller.go`


## Definition of done
- poller.go builds


## Clarifying questions
- None
