---
id: "01M85BBBW8GK2MF7YBFBE73YQV"
kind: unit
parent: 01M85BBBW7MHDY0A99SKS4ZKYC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add characterAnimationKey helper to characterAnimation

Add characterAnimationKey(ref) returning asset:animation, matching keys such as character:boy:idle, so tests can assert the NPC idle key.

## Acceptance criteria
- characterAnimationKey({asset:'character:npc',animation:'idle'}) returns 'character:npc:idle'
- resolveCharacterAnimation is unchanged


## Scope
- In scope: New export in characterAnimation.ts
- Out of scope: BootScene changes
- Preserve: resolveCharacterAnimation


## Technical constraints
- Pure function, no Phaser import
- Code path: `game/src/engine/characterAnimation.ts`


## Definition of done
- Helper exported


## Clarifying questions
- None
