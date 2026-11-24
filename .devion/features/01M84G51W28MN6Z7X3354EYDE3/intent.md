---
id: "01M84G51W28MN6Z7X3354EYDE3"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.5 · Runner unit tests pass with Git, provider and clock mocked

Context: backend/worker/internal/runner has tests for each area but TestRunCleanup currently fails because it runs with AutoPublish false, so the approval gate keeps the worktree. Desired behavior: every runner unit test passes, and the six areas (lock held, timeout, retry limit, budget, approval gate, report) are covered including edge paths, with Git (fakeTrees), provider (fakeAgent) and clock (injected now) mocked. Expected result: go test ./internal/runner is green. Why: it proves the execution engine without Git, Claude or real time.

## Acceptance criteria
- Given the runner package, When go test ./internal/runner runs, Then all tests pass
- Given each of lock held, timeout, retry limit, budget, approval gate and report, When tests run, Then at least one test asserts its behavior using only fakes


## Scope
- In scope: Runner unit tests and the stale TestRunCleanup expectation
- Out of scope: Real Git worktrees
- Out of scope: Real Claude CLI
- Out of scope: Backend and game modules
- Preserve: runner.go public API and behavior


## Technical constraints
- Go tests only; no network, no real Git, no real clock sleeps beyond 20ms timeouts


## Definition of done
- go test ./internal/runner passes


## Non-functional requirements
- Tests finish in seconds


## Clarifying questions
- None
