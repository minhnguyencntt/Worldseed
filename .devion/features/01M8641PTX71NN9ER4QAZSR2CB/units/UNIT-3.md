---
id: "01M8641PTXHJ272X01RG9Y12R4"
kind: unit
parent: 01M8641PTXS9XTKAV119QVF31B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Vite config proxies /api to the backend unit tests

Extend the node-environment viteConfig test to assert the proxy and that existing settings are kept.

## Acceptance criteria
- Proxy target asserted
- publicDir still ends with /game/public


## Scope
- In scope: game/frontend/tests/viteConfig.test.ts
- Out of scope: Starting a server
- Preserve: Existing publicDir test


## Technical constraints
- Mirrors backend/configs server.addr ':8080'; no network


## Definition of done
- Test passes


## Clarifying questions
- None
