---
id: "01M8583P0B9Y1B69TJMAN3F6PH"
kind: requirement
parent: 01M8583P0BTSVT1CCEACTVD2JE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · bootSceneBuild test types the scene object callback

Context: tests/bootSceneBuild.test.ts line 138 uses (o) => ... on the mocked sceneSpec import, implicitly any. Desired behavior: o is typed through an exported scene object type. Expected result: no TS7006 there.

## Acceptance criteria
- Given content.ts exports SceneObjectSpec, When the test annotates o: SceneObjectSpec, Then tsc reports no TS7006 at line 138
- Given the bootSceneBuild suite, When run, Then it passes and asserts buildScene receives the mocked sceneSpec


## Scope
- In scope: content.ts type export
- In scope: bootSceneBuild.test.ts
- Out of scope: scene content changes
- Preserve: sceneSpec value export


## Definition of done
- No TS7006 in bootSceneBuild.test.ts


## Clarifying questions
- None
