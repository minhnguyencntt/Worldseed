---
id: "01M85CF86VWY4Z7Y5GSW2FXVNG"
kind: requirement
parent: 01M85CF86VP9J0VHQ2EDFDFSYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A shadcn-style Dialog wrapper exposes Radix dialog parts

Context: only button.tsx exists in src/components/ui. Desired behavior: a dialog.tsx wrapper exports Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription and DialogClose built on @radix-ui/react-dialog, in the same forwardRef plus cn style as button.tsx. Expected result: any component can compose an accessible modal. Why: single reusable accessible base.

## Acceptance criteria
- Given DialogContent inside an open Dialog, when rendered, then an element with role dialog exists in the document
- Given DialogTitle and DialogDescription are rendered, then the dialog has aria-labelledby and aria-describedby pointing at them
- Given a className prop on DialogContent, then it is merged with the base classes via cn


## Scope
- In scope: New file src/components/ui/dialog.tsx
- Out of scope: Using it in ContributionSheet
- Preserve: ui/button.tsx


## Technical constraints
- forwardRef components
- Portal to document.body via Radix


## Definition of done
- dialog.tsx exports the named parts


## Clarifying questions
- None
