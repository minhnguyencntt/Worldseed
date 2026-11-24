---
id: "01M84H1K6GNBDDT99CHEFB2VQM"
kind: requirement
parent: 01M84H1K6G1EYGR8RK7NY6MFDZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Claude adapter runs the CLI through an Exec interface with a fixed argument list

Context: provider_kind claude is accepted by config but has no agent. Desired behavior: Claude.Run calls Exec.Run(ctx, workDir, "claude", args) with args built from a constant prompt telling it to implement the structured tasks, never player text, and returns cost 0 or the wrapped error. Expected result: a real adapter that tests can fake. Why: community prompts are untrusted.

## Acceptance criteria
- Given a fake Exec, When Claude.Run is called with workDir W, Then Exec receives dir W, name claude and a non-empty args slice
- Given Exec returns an error, When Claude.Run is called, Then the error is returned wrapped with provider claude
- Given a nil Exec, When NewClaude is called, Then it returns an error


## Scope
- In scope: Exec interface
- In scope: Claude type, NewClaude, Run
- Out of scope: a real os/exec implementation of Exec
- Out of scope: parsing agent cost
- Preserve: runner.Agent signature


## Technical constraints
- No sh -c
- Prompt is a package constant


## Definition of done
- Claude satisfies runner.Agent


## Clarifying questions
- None
