---
id: "01M859KF8TM69TJEVPGAFV4MVC"
kind: requirement
parent: 01M859KF8SN3WBSMX7TEGBD8NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Opening dialogue and choices progress and update game state

Context: bedroom.yaml intro choices have no next or events, so choosing them only appends history and ends dialogue. Desired: each choice moves to a node with new text and choices and sets a flag. Expected: dialogue and choice progression visible in the store. Why: story panel shows real progression.

## Acceptance criteria
- Given a new game, when started, then activeDialogue is intro with the exact text and two choices
- Given intro, when choice 0 "Look around the room" is chosen, then activeDialogue becomes look-around and flag looked_around is true
- Given intro, when choice 1 "Let's explore" is chosen, then activeDialogue becomes explore and flag exploring is true
- Given a terminal choice, when chosen, then activeDialogue is null


## Scope
- In scope: bedroom.yaml dialogue nodes
- In scope: world.yaml flags
- Out of scope: Dialogue engine rewrite
- Preserve: Intro text and choice labels
- Preserve: chooseOption behavior


## Technical constraints
- Use existing GameEvent types only


## Dependencies
- INT


## Definition of done
- Branches authored and loadable


## Clarifying questions
- None
