---
id: "01M84RZYQYKP989XMFF0MVZWMM"
kind: unit
parent: 01M84RZYQYY5V63AHWF1KFDR9Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: phaser dependency declaration unit tests

Add tests/phaserDependency.test.ts modelled on tests/zustandDependency.test.ts, reading only package.json from disk (no network, no npm install).

## Acceptance criteria
- Given package.json, when phaser is read, then it matches /^~?3\.90\.\d+$/.
- Given package.json, when phaser is read, then it does not start with ^ and does not match /^\D*4\./.


## Scope
- In scope: game/frontend/tests/phaserDependency.test.ts
- Out of scope: lockfile assertions
- Out of scope: running the app
- Preserve: Existing tests


## Technical constraints
- Read files with node:fs readFileSync like tests/zustandDependency.test.ts; no network


## Definition of done
- Both tests pass via vitest


## Clarifying questions
- None
