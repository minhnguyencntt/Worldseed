---
id: "01M85HGG8M0YT3Y0A9H2PV7295"
kind: requirement
parent: 01M85HGG8MWW9FGFSXB8039ERZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Hovering a scene object emits a typed objectHover event to React

Context: SceneObject wires handle.onHover only to highlight and label; PhaserToReactEvents.objectHover exists but nothing emits it. Desired behavior: BootScene forwards hover to the phaserToReact bus. Expected result: React listeners learn which object is hovered. Why: the UI can mirror hover state.

## Acceptance criteria
- Given a visible SceneObject, when its handle hover callback fires with true, then onHover listener receives objectId and over true and the highlight and label are shown
- Given a hovered object, when hover fires with false, then BootScene emits objectHover with id null
- Given a hidden object, when hover fires, then no listener call and no highlight occurs


## Scope
- In scope: SceneObject.onHover
- In scope: BootScene hover wiring
- Out of scope: React consumers of objectHover
- Preserve: Existing hover highlight and label behavior
- Preserve: objectClick emission


## Technical constraints
- Event payload shape is { id: string | null }


## Definition of done
- objectHover emitted on hover in and out


## Clarifying questions
- None
