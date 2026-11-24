---
id: "01M85AR74TJFZ28MYMPHPEB2GH"
kind: requirement
parent: 01M85AR74TZJ9NT9YFSEXNVDQ5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · validateWorld reports unknown scene character ids with a path-tagged issue

Context: validateWorld iterates scenes but skips scene.characters. Desired behavior: for each scene and each index, an id missing from the world's character list adds scenes[<sceneId>].characters[<index>].id: unknown character <id>. Expected result: world content validation fails on dangling NPC ids and passes on valid ones. Why: prevents NPCs referencing undeclared characters.

## Acceptance criteria
- Given scene bedroom with characters [{id:'ghost'}] and a world listing only boy, when validateWorld runs, then errors contain 'scenes[bedroom].characters[0].id: unknown character ghost'
- Given a scene whose characters are all listed in world.characters, when validateWorld runs, then errors is empty
- Given a scene with no characters field, when validateWorld runs, then no character error is added


## Scope
- In scope: game/src/content/loader.ts validateWorld
- Out of scope: schema changes
- Preserve: existing validation behavior


## Technical constraints
- scene.characters is optional


## Definition of done
- Check implemented and unit tested


## Clarifying questions
- None
