---
id: "01M85BBBW7MHDY0A99SKS4ZKYC"
kind: requirement
parent: 01M85BBBW763HJJX8C8748YZ1Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A second NPC is spawned and resolves its idle animation from the manifest

Context: BootScene.createCharacter uses resolveCharacterAnimation and ensureAnim. Desired behavior: with a mocked Phaser and a content mock holding boy and npc, create() adds two sprites and plays character:npc:idle. Expected result: a pure key helper and BootScene agree. Why: proves manifest-driven animation for NPCs.

## Acceptance criteria
- Given a manifest with asset character:npc defining idle, when resolveCharacterAnimation runs for the NPC idle, then it returns character:npc and idle
- Given a mocked scene with boy and npc, when BootScene.create runs, then add.sprite is called twice and the NPC sprite plays character:npc:idle


## Scope
- In scope: characterAnimationKey helper
- In scope: BootScene spawn test
- Out of scope: Real SVG assets
- Preserve: resolveCharacterAnimation fallback behavior


## Technical constraints
- Phaser mocked with vi.mock as in bootSceneCharacters.test.ts


## Definition of done
- Act and Verify units complete


## Clarifying questions
- None
