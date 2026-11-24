---
id: "01M84MFPVVP1DMDZMHAB763YBX"
kind: requirement
parent: 01M84MFPVV9MKEA1N7SDGRC11S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · zustand is declared in package.json and locked in package-lock.json

Context: no zustand entry in game/frontend/package.json or package-lock.json. Desired behavior: add the dependency with npm so both files agree. Expected result: manifest range matches the lockfile root entry and a resolved node_modules/zustand package exists. Why: later store work imports it.

## Acceptance criteria
- Given package.json, when read, then dependencies.zustand matches ^\d+\.\d+\.\d+
- Given package-lock.json, when read, then the root package dependency range equals package.json and node_modules/zustand has a version
- Given the frontend, when zustand is imported, then create is exported as a function


## Scope
- In scope: zustand entry in package.json and package-lock.json
- Out of scope: Store code
- Preserve: Other dependencies unchanged


## Technical constraints
- Run npm install from game/frontend


## Definition of done
- Both files contain zustand
- Verify unit passes


## Clarifying questions
- None
