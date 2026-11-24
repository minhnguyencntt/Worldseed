---
id: "01M85NA12J7Y0KTQR65BQXJWDR"
kind: requirement
parent: 01M85NA12JVGKZF1K4NMHW19E7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.create stores the transitionTo unsubscribe function

Context: BootScene declares unsubscribeTransition at L33 and assigns it in create at L76. Desired behavior: the handle is retained so it can be released later. Expected result: after create the field holds the unsubscribe function, and one emit produces one fade. Why: without the handle the subscription could never be released.

## Acceptance criteria
- Given create has run, when transitionTo is emitted once, then fadeOut is called exactly once with the transition duration
- Given the scene is shut down and created again, when transitionTo is emitted once, then fadeOut is called exactly once in total


## Scope
- In scope: assignment of unsubscribeTransition in BootScene.create
- Out of scope: SHUTDOWN handler changes
- Preserve: existing transitionTo fade and start logic


## Technical constraints
- Field typed (() => void) | null


## Definition of done
- Field assigned from reactToPhaser.on return value


## Clarifying questions
- None
