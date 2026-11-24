---
id: "01M85BBBW7Z40KS018CZVN1Y9A"
kind: requirement
parent: 01M85BBBW763HJJX8C8748YZ1Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A scene with a second NPC from data validates

Context: sceneSchema.characters and validateWorld already check scene characters. Desired behavior: an in-memory scene with boy plus a second NPC parses and validates cleanly. Expected result: no schema issues and no validateWorld errors. Why: proves NPCs are data-driven.

## Acceptance criteria
- Given a scene object with characters boy and npc, when sceneSchema.safeParse runs, then success is true and two characters are returned
- Given world.characters lists boy and npc, when validateWorld runs, then it returns an empty array


## Scope
- In scope: Schema and validateWorld acceptance of two characters
- Out of scope: Changing real world.yaml
- Preserve: characterSchema defaults


## Technical constraints
- In-memory data only


## Definition of done
- Act and Verify units complete


## Clarifying questions
- None
