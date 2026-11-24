---
id: "01M85BBBW7KEC45Q0D947WW2CS"
kind: requirement
parent: 01M85BBBW763HJJX8C8748YZ1Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · An invalid NPC reference is rejected

Context: validateWorld pushes scenes[id].characters[i].id errors. Desired behavior: a scene with an NPC id not in world.characters yields a path-tagged error. Expected result: exact error string for the bad index only. Why: stops dangling NPC references.

## Acceptance criteria
- Given scene characters boy and ghost and world list boy, when validateWorld runs, then errors equal the single ghost message at index 1
- Given an NPC id missing from the world, when validateWorld runs, then the result is non-empty so loading is rejected


## Scope
- In scope: validateWorld NPC rejection
- Out of scope: Changing error wording
- Preserve: Existing validator tests


## Technical constraints
- In-memory data only


## Definition of done
- Act and Verify units complete


## Clarifying questions
- None
