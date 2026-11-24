---
id: "01M84PNYJXM6DHX5TFJP5MM15N"
kind: requirement
parent: 01M84PNYJWJKMZZD8KEB85A040
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Typed manifest schemas cover id, path, type, dimensions, frames, animations, origin and bounds

Context: no manifest types exist. Desired behavior: zod schemas defining an asset entry (id, path, type, dimensions, optional spritesheet frame info, animations, origin/anchor, interaction bounds) and a manifest wrapper, with TypeScript types inferred from them. Expected result: one source of truth for types and validation. Why: typed content contract.

## Acceptance criteria
- Given a valid image asset entry, when parsed by assetSchema, then it succeeds
- Given a spritesheet asset with frameWidth, frameHeight and animations referencing frame indices, when parsed, then it succeeds
- Given an entry with non-positive dimensions or an unknown type, when parsed, then it fails
- Given origin values outside 0..1 or negative bounds size, when parsed, then it fails


## Scope
- In scope: game/src/assets/manifest/schema.ts
- Out of scope: Loading files
- Out of scope: Cross-asset reference checks
- Preserve: Existing src modules


## Technical constraints
- Types via z.infer
- Asset types: image, spritesheet, audio


## Dependencies
- REQ1


## Definition of done
- Schemas and types exported


## Clarifying questions
- None
