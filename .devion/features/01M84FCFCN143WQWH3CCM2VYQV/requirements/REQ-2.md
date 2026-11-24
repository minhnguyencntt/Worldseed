---
id: "01M84FCFCPBXYMG9K6PWY33XMM"
kind: requirement
parent: 01M84FCFCN143WQWH3CCM2VYQV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker config validation rejects invalid execution settings with field-naming errors

Context: LoadFS validates only repo_path. Desired behavior: after defaults, reject negative execution_timeout, negative max_retries, negative max_budget and a provider_kind other than mock or claude. Expected result: error text contains the YAML key name and config is nil. Why: fail fast on a misconfigured worker.

## Acceptance criteria
- Given execution_timeout of -1m, max_retries of -1, max_budget of -1 or provider_kind of gpt, when LoadFS runs, then it returns a nil config and an error containing execution_timeout, max_retries, max_budget or provider_kind respectively
- Given provider_kind mock or claude with non-negative numbers, when LoadFS runs, then no error is returned


## Scope
- In scope: validate function called from LoadFS
- Out of scope: Validating repo_path existence on disk
- Preserve: repo_path empty error message


## Technical constraints
- Validation runs after defaults so zero values still default


## Dependencies
- REQ1


## Definition of done
- Invalid values rejected with key-naming errors


## Clarifying questions
- None
