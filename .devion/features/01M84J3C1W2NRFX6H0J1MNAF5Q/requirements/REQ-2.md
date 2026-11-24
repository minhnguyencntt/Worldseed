---
id: "01M84J3C1WXF0M78N4FY6G8SYY"
kind: requirement
parent: 01M84J3C1W2NRFX6H0J1MNAF5Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Config loading still works for the remaining keys and no code reads a removed key

Context: LoadFS applies defaults for auth, storage, contribution and round, and applyEnv overrides seven keys. Desired behavior: loading is unchanged after worker key removal. Expected result: the shipped config.example.yaml loads through Load with its documented values, and defaults still apply to a minimal file. Why: proves nothing needed by the server was lost.

## Acceptance criteria
- Given backend/configs/config.example.yaml, when config.Load reads it, then it returns no error with Server.Addr :8080, Round.Duration 24h and Contribution.MaxPromptLen 500
- Given a YAML with only auth.token_secret, when LoadFS runs, then Round.SchedulerInterval is 30s, Storage.ContentDir is game/content and Contribution.RateMax is 3
- Given the server and cmd packages, when they are searched, then no reference to a worker or execution config field exists


## Scope
- In scope: Confirm LoadFS defaults, env overrides and main.go use only kept fields
- Out of scope: New config keys
- Preserve: All existing config tests


## Technical constraints
- Use only fstest and the example file path relative to the package


## Definition of done
- Act confirmed, Verify tests pass


## Clarifying questions
- None
