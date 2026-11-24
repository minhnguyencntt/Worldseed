---
id: "01M84WBX7KM5QJ5Z0V8SPC91P2"
kind: requirement
parent: 01M84WBX7KX6B33TTR8240BKV0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Interactive objects support hover, label, click, actions and keyboard access

Context: ObjectDef already carries interactionBounds, actions and visibleWhen; the typed bus defines objectHover and objectClick events. Desired behavior: SceneObject gets interaction bounds, hover tint plus name label, click emission, a contextual action list filtered by conditions, and keyboard focus cycling with Enter activation. Expected: hover and click events reach React through the existing phaserToReact bus. Why: acceptance requires accessible, clickable objects.

## Acceptance criteria
- Given pointerover, when it fires, then the object is tinted, its name label is shown and onHover(id) is called; on pointerout the tint clears, label hides and onHover(null) is called
- Given pointerdown, when it fires, then onClick(id) is called once
- Given actions with failing conditions, when listing, then only satisfied actions are returned
- Given focus order [a,b,c], when next is pressed from c, then focus wraps to a and Enter triggers a click on the focused object
- Given interactionBounds, when built, then setInteractive receives those bounds


## Scope
- In scope: entities/SceneObject.ts
- In scope: systems/interaction.ts
- In scope: WorldScene wiring to phaserToReact
- Out of scope: React ActionMenu changes
- Preserve: phaserToReact event names


## Technical constraints
- Objects without actions are not interactive


## Definition of done
- Events emitted through bus


## Non-functional requirements
- Keyboard accessibility


## Clarifying questions
- None
