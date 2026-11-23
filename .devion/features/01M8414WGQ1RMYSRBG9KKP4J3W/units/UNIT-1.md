---
id: "01M8414WGR3F5KFAPNZZS35JBJ"
kind: unit
parent: 01M8414WGR05FCD8RR82F5PMN0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Scaffold frontend Vite React TypeScript module

Context: Root has only `README.md`; no frontend package.
Desired behavior: Add the frontend module files listed in code_paths with `loadFrontendConfig` implementing defaults.
Expected result: Repo root is a valid Vite React TS app with config helper and `.env.example`.
Why: Implements REQ-FE product code only (no tests).

## Acceptance criteria
- Given the Act is applied, when listing the repo root, then `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, `App.tsx`, `config.ts`, and `.env.example` exist.
- Given `loadFrontendConfig({})`, when evaluated in source, then defaults are `http://localhost:8080` and `StoryForge` as specified in the step code.


## Scope
- In scope: All files in code_paths
- In scope: Frontend config helper and stub UI text from config
- Out of scope: Vitest setup and test files
- Out of scope: Gameplay UI
- Preserve: No secrets in committed env files


## Technical constraints
- React + TypeScript + Vite only for this module
- Do not add Playwright/Cypress
- Files at repository root only
- New file: `package.json`
- New file: `tsconfig.json`
- New file: `tsconfig.app.json`
- New file: `tsconfig.node.json`
- New file: `vite.config.ts`
- New file: `index.html`
- New file: `main.tsx`
- New file: `App.tsx`
- New file: `config.ts`
- New file: `vite-env.d.ts`
- New file: `.env.example`


## Dependencies
- REQ-FE


## Definition of done
- All code_paths created with the specified symbols and behavior
- No test files added by this Act


## Clarifying questions
- None
