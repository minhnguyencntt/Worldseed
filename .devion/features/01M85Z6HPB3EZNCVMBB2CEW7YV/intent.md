---
id: "01M85Z6HPB3EZNCVMBB2CEW7YV"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6 In-scene object interaction anchored to the object, hotspot path removed

Context: BootScene already builds SceneObjects from content, highlights them on hover or focus, and emits objectClick. The only on-canvas label is a Phaser Text showing the plain name. Actions appear in a separate ActionMenu panel that is not anchored to the object. Desired behavior: while an object is hovered or focused, a DOM overlay shows an upper-case name plate above the object and its content-defined actions (INSPECT, SEARCH, PUSH) beneath it. The overlay is anchored by a pure function of native position, scale, canvas offset and DPR, and is recomputed on resize. Every object and action is reachable by Tab, arrows, Enter and Space, with a live region and labels read from the same game state. Expected result: the old unanchored ActionMenu is replaced and no hotspot path remains. Why: the framed reference interface shows actions on the object.

## Acceptance criteria
- Given an object is hovered or keyboard-focused, When the overlay renders, Then a name plate above the object shows its content name in upper case and buttons beneath show its available action labels
- Given the anchor inputs (native position, bounds, scale, canvas offset, DPR), When the anchor function runs, Then it returns the same screen point for the same inputs and a different point after the zoom or offset changes
- Given a keyboard user presses Tab, arrows, Enter and Space, When focus reaches an object and its actions, Then each is reachable and activatable and the live region announces the focused object
- Given the source tree, When searched, Then SceneView, HOTSPOTS and ASSET_PATHS do not appear in code or tests and the unanchored ActionMenu is no longer rendered


## Scope
- In scope: Pure anchor function
- In scope: Content-driven action list
- In scope: DOM overlay with name plate and action buttons
- In scope: Hand cursor on interactive objects
- In scope: Keyboard flow and ARIA live region
- In scope: Removal of ActionMenu and leftover hotspot-path names
- Out of scope: New rooms or story content
- Out of scope: Backend changes
- Out of scope: Audio
- Out of scope: Deployment
- Out of scope: Repository clean-up beyond the hotspot path
- Preserve: objectClick and game.act flow
- Preserve: Existing focus store and keyboard handling in BootScene
- Preserve: Phaser 3.90.x pin
- Preserve: 480x270 native resolution with whole-number zoom


## Technical constraints
- Phaser stays on 3.90.x (~3.90.0 pin and guard tests stay)
- React, TypeScript, Vite, Tailwind, Radix and Zustand stay
- Keep the Go API contracts; no mock data in place of real API calls
- Scene content stays data-driven: no object, position or asset id hardcoded in a scene class
- One native scene resolution of 480x270, scaled by whole numbers only, nearest-neighbour
- One shared palette of at most 48 colours used by art and UI
- Tests are unit tests with every dependency mocked


## Definition of done
- All four requirements delivered with unit tests passing
- No ActionMenu or hotspot path remains


## Non-functional requirements
- Overlay recomputes on resize without layout thrash


## Clarifying questions
- None
