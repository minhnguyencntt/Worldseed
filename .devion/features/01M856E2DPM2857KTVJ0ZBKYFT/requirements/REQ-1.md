---
id: "01M856E2DPNCP7VTQY51B19BBN"
kind: requirement
parent: 01M856E2DPM2857KTVJ0ZBKYFT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · preload.test.ts proves planPreload dedup, unknown refs and resolveTextureKey fallback

Context: planPreload and resolveTextureKey in game/src/engine/planPreload.ts are pure. Desired behavior: they stay importable pure named exports and preload.test.ts asserts dedup, unknown reporting and fallback key. Expected result: those assertions pass with an in-memory manifest. Why: criteria of SG-5.4.3.

## Acceptance criteria
- Given two objects using asset A in the manifest, when planPreload runs, then load equals [A] and unknown is empty
- Given object asset Z and dust asset Y not in the manifest, when planPreload runs, then unknown equals [Z, Y] and load is empty
- Given unknown or undefined id, when resolveTextureKey runs with fallback fallback:missing, then it returns the fallback


## Scope
- In scope: planPreload.ts export surface
- In scope: preload.test.ts planner and resolver tests
- Out of scope: BootScene
- Preserve: planPreload and resolveTextureKey signatures and behavior


## Technical constraints
- Pure functions, no I/O, in-memory manifest


## Definition of done
- Planner and resolver tests pass


## Clarifying questions
- None
