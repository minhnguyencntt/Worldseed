---
id: "01M84VT0J2MQ5R0R8VA6XDK46D"
kind: requirement
parent: 01M84VT0J2HJMPYF55EQW5KPA7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Device-pixel-ratio zoom helper is safe for invalid ratios

Context: computeZoom(w,h,dpr) floors min((w*dpr)/640,(h*dpr)/360). A dpr of 0, negative or NaN yields 0/NaN-driven results. Desired: invalid dpr is treated as 1. Expected: integer >= 1 always.

## Acceptance criteria
- Given dpr is NaN, 0 or negative, When computeZoom(1280,720,dpr) runs, Then it returns 2
- Given dpr 2 and a 1000x600 viewport, When computeZoom runs, Then it returns an integer >= 1


## Scope
- In scope: computeZoom in config.ts
- Out of scope: Wiring zoom into PhaserHost
- Preserve: Signature (w,h,dpr)
- Preserve: Valid-input results


## Definition of done
- Invalid dpr normalised


## Clarifying questions
- None
