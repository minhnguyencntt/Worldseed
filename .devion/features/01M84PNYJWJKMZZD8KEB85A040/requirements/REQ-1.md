---
id: "01M84PNYJX1M9S67KP1HM3FV0N"
kind: requirement
parent: 01M84PNYJWJKMZZD8KEB85A040
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · zod is a declared dependency of the game module

Context: game/package.json depends only on yaml. Desired behavior: zod is added as a dependency so validators can import it. Expected result: dependency is declared and resolvable. Why: validators need runtime schema library.

## Acceptance criteria
- Given game/package.json, when parsed, then dependencies.zod is a non-empty semver range
- Given the manifest module, when it imports zod, then the import resolves


## Scope
- In scope: game/package.json dependencies
- Out of scope: Frontend package.json
- Preserve: yaml dependency and scripts


## Technical constraints
- Add to dependencies, not devDependencies


## Definition of done
- zod declared and installed


## Clarifying questions
- None
