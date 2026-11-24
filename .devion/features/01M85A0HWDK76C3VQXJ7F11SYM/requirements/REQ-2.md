---
id: "01M85A0HWEPH9MY301JBDD1E8G"
kind: requirement
parent: 01M85A0HWDK76C3VQXJ7F11SYM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · World validation rejects dangling scene character references

Context: validateWorld checks speakers, objects and events but never inspects scene.characters. Desired behavior: every scene character id must exist in world.characters, its interaction.dialogue must be a dialogue id in that scene, and its interaction events go through checkEvents. Expected result: a bad NPC definition fails validation with a descriptive message. Why: data-only NPC additions stay safe.

## Acceptance criteria
- Given a scene character id absent from world.characters, When validateWorld runs, Then errors include 'unknown character: <id>'.
- Given interaction.dialogue naming a missing node, When validateWorld runs, Then errors include 'unknown dialogue: <id>'.
- Given interaction events with an unknown flag, When validateWorld runs, Then errors include 'unknown flag: <flag>'.
- Given a valid NPC, When validateWorld runs, Then it adds no errors.


## Scope
- In scope: validateWorld in game/src/content/loader.ts
- Out of scope: Manifest asset ref checks (planPreload already reports unknown refs)
- Preserve: Existing validateWorld error strings and the bedroom content validity


## Technical constraints
- Reuse checkEvents


## Dependencies
- REQ1


## Definition of done
- Validation implemented


## Clarifying questions
- None
