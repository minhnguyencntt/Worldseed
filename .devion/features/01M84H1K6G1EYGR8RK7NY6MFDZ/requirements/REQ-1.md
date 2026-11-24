---
id: "01M84H1K6GQA0WZXF8MD33507X"
kind: requirement
parent: 01M84H1K6G1EYGR8RK7NY6MFDZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Mock provider runs as a runner.Agent and labels its output as mock

Context: no Agent implementation exists. Desired behavior: Mock.Run(ctx, workDir) writes MOCK-EXECUTION.md saying no real development happened and returns cost 0. Expected result: mock runs are distinguishable from real ones. Why: the master prompt requires mock execution to be clearly distinguished.

## Acceptance criteria
- Given a temp work dir, When Mock.Run is called, Then MOCK-EXECUTION.md exists and contains the text MOCK
- Given Mock.Run succeeds, When the cost is read, Then it equals 0 and the error is nil
- Given a cancelled context, When Mock.Run is called, Then it returns the context error and writes no file


## Scope
- In scope: Mock type and Run
- In scope: Mock.Name returning mock
- Out of scope: editing game source
- Preserve: runner.Agent signature


## Technical constraints
- Write only inside workDir


## Definition of done
- Mock satisfies runner.Agent


## Clarifying questions
- None
