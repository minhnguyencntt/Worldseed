---
id: "01M8577ZDR33SP7JF0SV575XBT"
kind: requirement
parent: 01M8577ZDQGCT913AW3QAFETQH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.ts has a single SceneObject type import

Context: L12 and L14 of BootScene.ts both import SceneObject from '@game/entities/SceneObject'. Desired behavior: the second import (L14) is removed. Expected result: one import line, no duplicate identifier error. Why: a duplicate import is a compile error.

## Acceptance criteria
- Given BootScene.ts, when the lines matching /^import type \{ SceneObject \}/ are counted, then the count is 1.
- Given the removal, when the file is read, then the import of createPhaserRenderContext from './renderContext' is still present.


## Scope
- In scope: Remove the L14 import
- Out of scope: Reordering other imports
- Preserve: All other imports


## Definition of done
- Exactly one SceneObject import remains


## Clarifying questions
- None
