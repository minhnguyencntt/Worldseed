---
id: "01M8414WGSHJAXXHGM48XKBSAW"
kind: unit
parent: 01M8414WGR05FCD8RR82F5PMN0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Frontend config loader unit tests

Context: ACT-FE added loadFrontendConfig without tests.
Desired behavior: Add Vitest wiring and config.test.ts that asserts defaults and env overrides with plain objects (no browser, no network).
Expected result: Filtered vitest run for config tests passes.
Why: Maps REQ-FE acceptance on config defaults/example keys to unit evidence.

## Acceptance criteria
- Given empty env object, when loadFrontendConfig runs in the unit test, then apiBaseUrl is http://localhost:8080 and appName is StoryForge.
- Given env overrides VITE_API_BASE_URL and VITE_APP_NAME, when loadFrontendConfig runs, then returned fields equal the overrides.


## Scope
- In scope: Vitest dependency/scripts
- In scope: config.test.ts
- In scope: vitest.config.ts
- Out of scope: E2E browser tests
- Out of scope: Building or serving Vite
- Preserve: Product config.ts behavior from ACT-FE


## Technical constraints
- VERIFY = unit tests only; mock env via plain objects; no Playwright/Cypress


## Dependencies
- ACT-FE


## Definition of done
- Vitest config and config.test.ts exist
- Command for this unit passes


## Clarifying questions
- None
