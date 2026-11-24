---
id: "01M84WZ47YE45RHXFTSZY7KMDE"
kind: requirement
parent: 01M84WZ47XPQ76F80J2AGZ7GBY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Six-layer render order and injected render context exist

Context: layerSchema lists the six layers but nothing orders them for rendering. Desired behavior: a layers module exports LAYER_ORDER and layerDepth, and a renderContext module exports RenderContext, RenderSpriteSpec and RenderHandle interfaces. Expected result: depth is monotonic in layer order and unknown layers fall back to objects. Why: gives every entity a single rendering-order source.

## Acceptance criteria
- Given LAYER_ORDER, when layerDepth is called for each layer, then depths are strictly increasing in order
- Given an undefined or unknown layer string, when layerDepth is called, then it returns the objects depth


## Scope
- In scope: layers.ts
- In scope: renderContext.ts
- Out of scope: Phaser adapter
- Preserve: layerSchema


## Technical constraints
- No phaser import


## Definition of done
- Exports typed and tested


## Clarifying questions
- None
