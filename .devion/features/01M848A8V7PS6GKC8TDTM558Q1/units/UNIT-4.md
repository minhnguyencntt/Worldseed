---
id: "01M848A8V8N768SY907N2AMJ6G"
kind: unit
parent: 01M848A8V7HNBPWW9AY4P6KCMC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp lifecycle stepper unit tests with mocked fetch

Component tests written from R2's acceptance criteria; fetch is a vi.fn stub, no network.

## Acceptance criteria
- OPEN current step
- DEVELOPING for RUNNING execution
- 404 tolerated
- 401 shows Invalid token


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: tests/admin.test.tsx


## Definition of done
- Tests pass


## Clarifying questions
- None
