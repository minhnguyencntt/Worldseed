---
id: "01M843H7J664TFSMX22768GX91"
kind: requirement
parent: 01M843H7J5CGKRRRC3RKWZ5PA6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Single loadWorld with strict field validation

Context: loader.ts loadWorld casts YAML without checking fields, while world.ts checks string fields, mapping shape and scene id match. Desired behavior: the surviving loadWorld returns scenes as SceneDef[] and throws the stricter errors. Expected result: malformed world.yaml or scene files fail loudly in one place. Why: invalid content must be caught at load time.

## Acceptance criteria
- Given a world.yaml missing the id string field, when loadWorld runs, then it throws an error mentioning 'id'
- Given world.yaml listing scene s2 with no scenes/s2.yaml, when loadWorld runs, then it throws an error mentioning s2.yaml
- Given scenes/s.yaml declaring id other, when loadWorld runs for scene s, then it throws an error mentioning 'expected s'
- Given valid files, when loadWorld runs, then scenes is an array containing the scene with id s


## Scope
- In scope: loadWorld in loader.ts
- Out of scope: validateWorld
- Preserve: LoadedWorld type with scenes: SceneDef[]


## Technical constraints
- No new dependencies


## Dependencies
- INT


## Definition of done
- loadWorld enforces field checks and returns scenes as an array


## Clarifying questions
- None
