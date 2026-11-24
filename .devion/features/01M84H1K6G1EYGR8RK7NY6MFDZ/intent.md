---
id: "01M84H1K6G1EYGR8RK7NY6MFDZ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.9 Coding agent provider with a labelled mock, chosen by provider kind

Context: the worker runner (backend/worker/internal/runner/runner.go) defines the Agent interface, and config already validates provider_kind as mock or claude. No implementation of Agent exists. Desired behavior: a provider package supplies a mock agent that says it is a mock, a Claude CLI adapter, and a factory that picks one from provider_kind. Expected result: the runner can be built with an Agent chosen from config. Why: mock runs must never be mistaken for real development.

## Acceptance criteria
- Given provider_kind is mock, When the factory is called, Then it returns the mock agent, which satisfies runner.Agent
- Given the mock agent runs, When it finishes, Then the work dir holds a file that states it is a MOCK run and the cost is 0
- Given provider_kind is claude, When the factory is called, Then it returns the Claude adapter
- Given an unknown provider_kind, When the factory is called, Then it returns an error naming the kind


## Scope
- In scope: new package backend/worker/internal/provider
- In scope: mock agent
- In scope: Claude CLI adapter behind an Exec interface
- In scope: factory keyed by provider kind
- Out of scope: changes to the runner retry logic
- Out of scope: real Claude invocation in tests
- Out of scope: analysis, requirements and task generation
- Preserve: runner.Agent signature
- Preserve: config validation of provider_kind


## Technical constraints
- Go module github.com/worldseed/storyforge/worker at backend/worker
- Never interpolate player text into a shell
- The agent is passed arguments as a slice, not a shell string


## Definition of done
- All requirements are met and their Verify units pass


## Non-functional requirements
- Mock output must be unmistakably labelled


## Clarifying questions
- None
