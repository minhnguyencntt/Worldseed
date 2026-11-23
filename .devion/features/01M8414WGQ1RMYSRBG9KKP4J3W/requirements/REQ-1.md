---
id: "01M8414WGR05FCD8RR82F5PMN0"
kind: requirement
parent: 01M8414WGQ1RMYSRBG9KKP4J3W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frontend React/TypeScript/Vite module scaffold

Context: No `package.json` or Vite app exists at tip.
Desired behavior: Root gains a Vite + React + TypeScript app with `loadFrontendConfig` reading `VITE_API_BASE_URL` and `VITE_APP_NAME`, plus `.env.example` documenting those keys.
Expected result: Engineers can run the StoryForge web app from the repo root; config resolves defaults when env keys are absent.
Why: Establishes the player/admin UI host for later phases.

## Acceptance criteria
- Given the repository after this requirement, when listing the repo root, then `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, and `main.tsx` exist.
- Given `loadFrontendConfig` with empty env, when called, then it returns `apiBaseUrl` default `http://localhost:8080` and `appName` default `StoryForge`.
- Given root `.env.example`, when opened, then it documents `VITE_API_BASE_URL` and `VITE_APP_NAME`.


## Scope
- In scope: Vite React TS scaffold at repository root
- In scope: Typed frontend config loader and `.env.example`
- In scope: Minimal App stub rendering the StoryForge name from config
- Out of scope: 80/20 gameplay UI
- Out of scope: Contribution submission UI
- Out of scope: Admin screens
- Out of scope: Calling live backend APIs
- Preserve: No hardcoded production secrets in source


## Technical constraints
- Mandatory: React, TypeScript, Vite
- Mandatory: config via Vite VITE_* env vars with example file
- Mandatory: new files at repository root only (no frontend/ folder yet)


## Dependencies
- INT-SG1


## Definition of done
- Frontend module files exist as specified
- Linked Act and Verify units complete


## Non-functional requirements
- TypeScript strictness enabled in tsconfig


## Clarifying questions
- None
