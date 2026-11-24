---
id: "01M8641PTXGVR4SKNADMD0DEWZ"
kind: unit
parent: 01M8641PTXS9XTKAV119QVF31B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add /api proxy to vite.config.ts

Add a proxy entry to the existing server block in vite.config.ts so dev /api calls reach the Go backend.

## Acceptance criteria
- server.proxy['/api'].target is 'http://localhost:8080'
- Existing config keys remain


## Scope
- In scope: game/frontend/vite.config.ts
- Out of scope: Tests
- Preserve: publicDir
- Preserve: alias
- Preserve: server.fs


## Technical constraints
- Backend port :8080
- Code path: `game/frontend/vite.config.ts`


## Definition of done
- vite.config.ts has the proxy


## Clarifying questions
- None
