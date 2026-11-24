---
id: "01M84VZY5BC4WNJ43ECVGN26ND"
kind: requirement
parent: 01M84VZY5AEZ8D03YJAHT7N6ZC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · PhaserHost computes the zoom on mount and refreshes it on resize and ratio change

Context: PhaserHost.tsx creates the game with createGame(container, scenes) and the ResizeObserver only refreshes. Desired behavior: compute zoom at mount, pass it to createGame, recompute in the ResizeObserver callback and on devicePixelRatio change, and call scale.setZoom then scale.refresh. Expected result: zoom stays correct as the container or ratio changes. Why: crisp pixels at any size.

## Acceptance criteria
- Given container clientWidth 1280, clientHeight 720 and dpr 2, when mounted, then createGame is called with third argument computeZoom(1280,720,2)
- Given the container size changes, when the ResizeObserver callback fires, then scale.setZoom is called with the new zoom before scale.refresh
- Given the dpr changes, when the matchMedia change listener fires, then scale.setZoom is called with the zoom for the new dpr and the listener is removed on unmount


## Scope
- In scope: PhaserHost.tsx
- Out of scope: computeZoom formula
- Preserve: StrictMode single-instance behaviour
- Preserve: destroy(true) on unmount
- Preserve: observer.disconnect on unmount


## Technical constraints
- Guard window.matchMedia when undefined


## Dependencies
- REQ1


## Definition of done
- Zoom passed at creation and refreshed on resize and ratio change


## Clarifying questions
- None
