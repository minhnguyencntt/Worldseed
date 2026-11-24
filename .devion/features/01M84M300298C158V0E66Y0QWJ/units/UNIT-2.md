---
id: "01M84M3003MCSR3645T460YRFX"
kind: unit
parent: 01M84M3002SW7T1FXRZ22VGG3V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add cn helper, components.json and shadcn Button

Install runtime deps and create the helper, shadcn config and Button component.

## Acceptance criteria
- Given src/lib/utils.ts, when imported, then cn is exported
- Given button.tsx, when imported, then Button and buttonVariants are exported


## Scope
- In scope: package.json
- In scope: src/lib/utils.ts
- In scope: components.json
- In scope: src/components/ui/button.tsx
- Out of scope: tests
- Preserve: tsconfig @game alias


## Technical constraints
- Code path: `game/frontend/package.json`
- New file: `game/frontend/src/lib/utils.ts`
- New file: `game/frontend/components.json`
- New file: `game/frontend/src/components/ui/button.tsx`


## Definition of done
- Files created and typecheck passes


## Clarifying questions
- None
