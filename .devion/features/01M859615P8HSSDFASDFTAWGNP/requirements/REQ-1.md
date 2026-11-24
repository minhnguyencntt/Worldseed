---
id: "01M859615PS01QZJMRTYYZT1JB"
kind: requirement
parent: 01M859615P8HSSDFASDFTAWGNP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · game tsconfig resolves the @game alias

Context: vitest.config.ts maps @game to ./src but game/tsconfig.json has no paths, so tests importing @game fail typecheck. Desired behavior: tsconfig maps @game/* to src/*. Expected result: npm run typecheck resolves @game imports. Why: tests must import through the alias.

## Acceptance criteria
- Given game/tsconfig.json, when parsed, then compilerOptions.paths['@game/*'] equals ['./src/*']
- Given a test importing '@game/engine/layers', when tsc runs, then no module-not-found error is reported


## Scope
- In scope: game/tsconfig.json
- Out of scope: frontend tsconfig
- Preserve: strict, include and other compiler options


## Technical constraints
- moduleResolution Bundler stays


## Definition of done
- paths entry present
- typecheck resolves @game


## Clarifying questions
- None
