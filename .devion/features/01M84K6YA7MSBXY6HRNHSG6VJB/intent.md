---
id: "01M84K6YA7MSBXY6HRNHSG6VJB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6 · Clean up leftover references to removed code

Context: the worker, execution backend, config keys, routes and ExecutionPanel are already deleted. Two leftovers remain. game/frontend/src/components/LifecycleStepper.tsx still exports deriveStage and an EXECUTION_STAGES map that only served the removed execution flow, and nothing in src imports deriveStage. The docs say nothing about the handoff: backend/README.md contains only 'hello Worldseed', there is no docs/ folder, and nothing describes the frozen-contribution export. Desired behavior: no code or docs refer to execution state, and the docs describe the handoff to devion workseed. Expected result: backend and frontend tests pass with game/src, the game UI, game/content, backend/internal/contribution and the round lifecycle unchanged. Why: Worldseed is a game and contribution project, not a development platform.

## Acceptance criteria
- Given LifecycleStepper.tsx, when it is read, then it has no deriveStage export and no execution-status mapping, and AdminApp still renders LifecycleStepper from round.status
- Given the backend README and the handoff doc, when they are read, then they describe the handoff of frozen contributions to devion workseed using the Export JSON format
- Given the backend and game/frontend unit test suites, when they run, then they pass


## Scope
- In scope: LifecycleStepper execution helpers
- In scope: Handoff documentation under backend/
- Out of scope: game/src
- Out of scope: game UI components
- Out of scope: game/content
- Out of scope: round lifecycle logic
- Out of scope: contribution package behavior
- Preserve: Export JSON format v1
- Preserve: Existing guard tests for removed code
- Preserve: STAGES and stageIndex behavior


## Technical constraints
- Go backend module and Vitest frontend must stay green
- Do not modify game/src, game/content or backend/internal/contribution non-test code


## Definition of done
- Both requirements are implemented and verified by unit tests
- No execution references remain in LifecycleStepper or docs


## Clarifying questions
- None
