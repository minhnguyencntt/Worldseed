---
id: "01M857F2G2NRE4YQ0GB325KK1Q"
kind: unit
parent: 01M857F2G20SHH6F1YFF2TYCWG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Build test types scene object callback

Use SceneObjectSpec for the flatMap callback in the hardcoded-ids test.

## Acceptance criteria
- Given the build test, When mapping sceneSpec.objects, Then the parameter is typed
- Given the file, When run, Then it passes


## Scope
- In scope: bootSceneBuild.test.ts
- Out of scope: app code
- Preserve: assertions


## Technical constraints
- Import type only


## Definition of done
- Test passes


## Clarifying questions
- None
