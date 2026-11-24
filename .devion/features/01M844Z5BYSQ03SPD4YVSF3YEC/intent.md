---
id: "01M844Z5BYSQ03SPD4YVSF3YEC"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3.4 · Frontend type-checks and entry point resolves

Context: game/frontend holds the Vite React app (index.html -> src/main.tsx -> src/App.tsx). `npx tsc --noEmit` in game/frontend currently reports 3 errors, all in tests/layout.test.tsx (node:fs, node:path and process cannot be resolved because @types/node is not installed or configured). App render tests already exist in tests/app.test.tsx. Desired behavior: type-check is clean and the entry point is proven to resolve to App. Why: SG-3 playable frontend must be assembled and verifiable.

## Acceptance criteria
- Given game/frontend, when `npx tsc --noEmit` runs, then it exits 0 with no errors
- Given index.html, when its module script src is read, then it is /src/main.tsx and that file exists and renders App into #root
- Given the App component, when rendered in a test, then the intro screen shows and Begin reveals the game view


## Scope
- In scope: game/frontend/package.json
- In scope: game/frontend/tsconfig.json
- In scope: game/frontend/src/main.tsx
- In scope: new unit tests for entry and typecheck config
- Out of scope: Backend changes
- Out of scope: New gameplay or UI features
- Out of scope: Rewriting existing App tests
- Preserve: Existing App, layout, scene and story tests
- Preserve: Existing src/App.tsx behavior


## Technical constraints
- Keep React 18, Vite 5, Vitest 2, strict TypeScript
- No API or backend changes


## Definition of done
- tsc --noEmit exits 0
- All frontend unit tests pass


## Clarifying questions
- None
