---
id: "01M84MX32EMQ7G8B2M8AC4ZXN0"
kind: unit
parent: 01M84MX32EE5F4KTCDSKMVYBD9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm uiStore exposes every default field and action the suite asserts

uiStore.ts already defines drawerOpen=false, modal=null, soundEnabled=true, settingsOpen=false and five actions. No product change is required; this unit confirms the surface so the tests can be written against it.

## Acceptance criteria
- Given uiStore.ts, when read, then all four fields and five actions exist with the stated defaults.
- Given the file, when type-checked, then it compiles unchanged.


## Scope
- In scope: Confirming uiStore.ts surface
- Out of scope: Behavior changes
- Preserve: Entire uiStore.ts


## Technical constraints
- Do not modify product code unless a default or action is missing
- Code path: `game/frontend/src/store/uiStore.ts`


## Definition of done
- uiStore.ts surface confirmed; no behavioral change


## Clarifying questions
- None
