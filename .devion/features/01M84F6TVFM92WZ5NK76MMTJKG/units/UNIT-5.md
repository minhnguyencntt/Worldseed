---
id: "01M84F6TVGPJ9XDEV048H1394J"
kind: unit
parent: 01M84F6TVFWRY2G8X3YK66MN9C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Worker config LoadFS unit tests

Test config.LoadFS with fstest.MapFS and a fake getenv.

## Acceptance criteria
- Defaults asserted
- Env override asserted
- Empty repo_path error asserted


## Scope
- In scope: backend/worker/internal/config/config_test.go
- Out of scope: product code


## Technical constraints
- fstest.MapFS only; no real env or disk


## Definition of done
- tests pass


## Clarifying questions
- None
