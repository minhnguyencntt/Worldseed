---
id: "01M84FWVJ740NRF79GJ89MJCE4"
kind: requirement
parent: 01M84FWVJ6XD15NX7X23SKWWMV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Runner writes a report after every run whatever the outcome

Context: Runner.Run returns from several branches (agent failure, publish failure, awaiting approval, completed). Desired behavior: an optional Reporter set via SetReporter is called once after any run that acquired the lock, with the final execution and timestamps. Runs refused by lock.ErrLocked write nothing. Expected result: every executed run leaves a report. Why: reports must exist whatever the outcome.

## Acceptance criteria
- Given a failing agent, When Run returns, Then a report with status FAILED and the error text is written
- Given a successful run with and without AutoPublish, When Run returns, Then reports with COMPLETED and AWAITING_APPROVAL are written
- Given the lock is held, When Run is called, Then no report is written


## Scope
- In scope: backend/worker/internal/runner/runner.go
- Out of scope: Git commits
- Preserve: New signature
- Preserve: Run return values and persisted store records


## Technical constraints
- Reporter is an interface so tests fake it


## Dependencies
- req2


## Definition of done
- Runner wired to Reporter


## Clarifying questions
- None
