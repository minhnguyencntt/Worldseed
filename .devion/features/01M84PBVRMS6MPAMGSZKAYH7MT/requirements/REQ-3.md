---
id: "01M84PBVRNCNBVKKNDV8Q60DX0"
kind: requirement
parent: 01M84PBVRMS6MPAMGSZKAYH7MT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Manifest loader validates references and reports missing assets without crashing

Context: no manifest loader exists. Desired behavior: loadManifest validates data, checks every object asset reference exists in the manifest (dangling) and every manifest path exists via an injected exists function, returning a report and fallback entries instead of throwing. Why: missing assets must not crash the game.

## Acceptance criteria
- Given a manifest whose file is missing, When loaded, Then report.missing lists its id and the call does not throw
- Given an object referencing an unknown asset id, When loaded, Then report.dangling lists it
- Given invalid manifest data, When loaded, Then report.errors is non-empty and no exception propagates
- Given a missing asset, When resolving it, Then the fallback entry is returned


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- Out of scope: Phaser loading
- Preserve: existing loader.ts


## Technical constraints
- Filesystem access via injected exists function


## Dependencies
- R1
- R2


## Definition of done
- Loader implemented


## Clarifying questions
- None
