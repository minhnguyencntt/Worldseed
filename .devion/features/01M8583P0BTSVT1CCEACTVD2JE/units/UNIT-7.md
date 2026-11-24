---
id: "01M8583P0CPVD0KJ6Z6KYBB3R3"
kind: unit
parent: 01M8583P0BWG59KN6J2NRAAF7M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene preload tests still pass with typed callback

Run the existing preload suite proving the typed callback keeps behavior.

## Acceptance criteria
- Given typed callback, When preload runs in the suite, Then only planned images load
- Given the suite, When run, Then all pass


## Scope
- In scope: bootScenePreload.test.ts
- Out of scope: product code
- Preserve: assertions


## Definition of done
- Suite passes


## Clarifying questions
- None
