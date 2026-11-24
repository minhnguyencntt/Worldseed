---
id: "01M84MFPVV9MKEA1N7SDGRC11S"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2.1 · Add the zustand dependency to the frontend package.json and lockfile

Context: game/frontend/package.json lists react, motion, lucide-react and radix packages but no zustand, and node_modules/zustand is absent. Desired behavior: zustand is a declared runtime dependency and package-lock.json resolves it. Expected result: `import { create } from 'zustand'` resolves in the frontend. Why: the Zustand UI store in SG-1.2 needs it.

## Acceptance criteria
- Given game/frontend/package.json, when parsed, then dependencies.zustand is a semver range string
- Given package-lock.json, when parsed, then packages[''].dependencies.zustand equals the package.json range and packages['node_modules/zustand'] exists with a version
- Given the frontend, when 'zustand' is imported, then create is a function


## Scope
- In scope: game/frontend/package.json
- In scope: game/frontend/package-lock.json
- Out of scope: Creating useUiStore
- Out of scope: Other dependency changes
- Out of scope: Backend modules
- Preserve: Existing dependency ranges
- Preserve: lockfileVersion 3


## Technical constraints
- Use npm so the lockfile stays lockfileVersion 3
- zustand goes in dependencies, not devDependencies


## Definition of done
- zustand is declared and locked
- Unit test for the dependency passes


## Clarifying questions
- None
