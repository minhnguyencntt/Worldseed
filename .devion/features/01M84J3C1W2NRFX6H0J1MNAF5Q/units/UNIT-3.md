---
id: "01M84J3C1XZN0K8X6FQJE9HP2S"
kind: unit
parent: 01M84J3C1WPPCAQ59P5HVH4BD6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Config carries no worker or execution keys unit tests

Add tests to config_test.go proving REQ1 acceptance criteria with no network or real server.

## Acceptance criteria
- Config top-level fields are exactly the eight kept
- Example YAML top-level keys are exactly the eight kept
- A worker section in YAML is ignored


## Scope
- In scope: backend/internal/config/config_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Use reflect, os.ReadFile of ../../configs/config.example.yaml and gopkg.in/yaml.v3 already in go.mod


## Definition of done
- New tests pass


## Clarifying questions
- None
