---
id: "01M84TJ7NVPA0HH1DHMD0S3W4M"
kind: unit
parent: 01M84TJ7NV1SCVN59V47FDKCT9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: tracked dependency helpers unit tests

Prove the helpers with a fake git runner.

## Acceptance criteria
- Flags node_modules and .vite paths, ignores look-alikes
- checkTrackedFiles throws with a tracked path and passes on clean output


## Scope
- In scope: game/frontend/tests/trackedDependencyGuard.test.ts
- Out of scope: real git
- Preserve: tests/trackedNodeModules.test.ts


## Technical constraints
- Fake GitRunner via vi.fn


## Definition of done
- Tests pass


## Clarifying questions
- None
