---
id: "01M8641PTXS9XTKAV119QVF31B"
kind: requirement
parent: 01M8641PTX71NN9ER4QAZSR2CB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Vite dev server proxies /api to the Go backend

Context: client.ts calls relative paths like /api/v1/worlds/{id}/round/current, and vite.config.ts only sets publicDir, alias and server.fs. Desired: server.proxy forwards '/api' to http://localhost:8080. Expected: the round JSON loads in dev. Why: removes the root cause of the error.

## Acceptance criteria
- Given vite.config.ts, When the config is loaded, Then server.proxy['/api'].target equals 'http://localhost:8080'
- Given the proxy is added, When the config is loaded, Then publicDir, the @game alias and server.fs.allow are unchanged


## Scope
- In scope: game/frontend/vite.config.ts
- Out of scope: Production hosting
- Out of scope: Backend CORS
- Preserve: publicDir game/public
- Preserve: @game alias
- Preserve: test config


## Technical constraints
- Port 8080 comes from backend/configs server.addr


## Definition of done
- Proxy configured and unit-tested


## Clarifying questions
- None
