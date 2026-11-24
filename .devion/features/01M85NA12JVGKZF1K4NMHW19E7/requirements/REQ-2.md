---
id: "01M85NA12J3STAQ8RH0XHBWYVQ"
kind: requirement
parent: 01M85NA12JVGKZF1K4NMHW19E7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene SHUTDOWN calls and clears the transitionTo unsubscribe

Context: the SHUTDOWN callback registered in create already calls unsubscribeTransition?.() and nulls it at L97-L98. Desired behavior: after shutdown no transitionTo event reaches BootScene, while other subscribers keep working. Expected result: no fade or scene start after shutdown. Why: avoids duplicate handlers after restart.

## Acceptance criteria
- Given the SHUTDOWN callback has run, when transitionTo is emitted, then fadeOut and scene.start are not called
- Given another subscriber registered before create, when SHUTDOWN has run and transitionTo is emitted, then that subscriber still receives the payload


## Scope
- In scope: transitionTo release in the SHUTDOWN handler
- Out of scope: other unsubscribe fields
- Preserve: order and behavior of the other cleanup calls


## Technical constraints
- Release must happen inside the existing SHUTDOWN handler


## Definition of done
- unsubscribeTransition is called and set to null in SHUTDOWN


## Clarifying questions
- None
