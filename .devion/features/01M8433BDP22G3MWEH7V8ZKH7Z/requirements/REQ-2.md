---
id: "01M8433BDP45EKJRRRV3JF2B9G"
kind: requirement
parent: 01M8433BDP22G3MWEH7V8ZKH7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · YAML content loader and reference validator

Context: content is declarative YAML. Desired behavior: loadWorld(dir) reads world.yaml and each listed scene file and returns {world,scenes}; validateWorld returns error strings for unknown scene, object, character and flag references. Expected result: content authors get precise errors. Why: coding agents add content safely.

## Acceptance criteria
- Given a valid content directory, when loadWorld runs, then it returns the world and every scene listed in world.yaml.
- Given a goto_scene event to an unknown scene, when validated, then an error names the scene.
- Given a say event with unknown character, an event on an unknown object, or an unknown flag, when validated, then an error names that reference.
- Given a missing scene file or malformed YAML, when loaded, then loadWorld throws an error naming the file.


## Scope
- In scope: backend/game/src/engine/loader.ts
- In scope: backend/game/src/engine/validator.ts
- Out of scope: runtime event logic


## Technical constraints
- yaml npm package
- node:fs readFileSync


## Dependencies
- REQ-RT


## Definition of done
- Validator returns string[]


## Clarifying questions
- None
