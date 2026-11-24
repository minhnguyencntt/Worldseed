---
id: "01M84M3003CS3QQTAJEV4EQ1EW"
kind: unit
parent: 01M84M3002NQSPFCBX4S9NV5B4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Tailwind config, PostCSS config and stylesheet tokens unit tests

Write tests from REQ1 acceptance criteria that import the config and read files from disk; no server or browser.

## Acceptance criteria
- Given the config, when imported, then content globs and token colors match
- Given styles.css, when read, then directives, tokens and old rules are present


## Scope
- In scope: tests/tailwindConfig.test.ts
- Out of scope: Running vite
- Preserve: Existing tests


## Definition of done
- Test file passes


## Clarifying questions
- None
