---
id: "01M84M3002SW7T1FXRZ22VGG3V"
kind: requirement
parent: 01M84M300298C158V0E66Y0QWJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · cn helper and shadcn/Radix Button are available

Context: no cn helper or shadcn components exist. Desired behavior: src/lib/utils.ts exports cn (clsx + tailwind-merge), components.json configures shadcn, and src/components/ui/button.tsx implements the shadcn Button using class-variance-authority and @radix-ui/react-slot. Expected result: reusable primitives for later slices.

## Acceptance criteria
- Given cn('px-2','px-4'), when called, then it returns 'px-4'
- Given cn('a', false && 'b', 'c'), when called, then it returns 'a c'
- Given Button with asChild wrapping an anchor, when rendered, then an anchor element carries the button classes
- Given Button variant default, when rendered, then it has the bg-primary class


## Scope
- In scope: package.json deps
- In scope: src/lib/utils.ts
- In scope: components.json
- In scope: src/components/ui/button.tsx
- Out of scope: Dialog, drawer, tabs components
- Preserve: Existing components


## Technical constraints
- clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot


## Definition of done
- Helper and Button exist and tests pass


## Clarifying questions
- None
