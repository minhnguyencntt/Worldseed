---
id: "01M84KNPXBEDA2ZY1P6TS4HYMA"
kind: unit
parent: 01M84KNPXB6K217KHV7Y5525PD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add UI dependencies, Tailwind and shadcn config and cn helper

Add the UI stack dependencies and configuration files to game/frontend so Tailwind utilities and the shadcn cn helper work.

## Acceptance criteria
- package.json declares all UI dependencies
- tailwind.config.ts scans index.html and src/**/*.{ts,tsx}
- src/lib/utils.ts exports cn
- styles.css starts with the three @tailwind directives


## Scope
- In scope: game/frontend config and lib files
- Out of scope: tests
- Preserve: existing CSS rules


## Technical constraints
- Tailwind v3
- Code path: `game/frontend/package.json`
- New file: `game/frontend/tailwind.config.ts`
- New file: `game/frontend/postcss.config.js`
- New file: `game/frontend/components.json`
- New file: `game/frontend/src/lib/utils.ts`
- Code path: `game/frontend/src/styles.css`


## Definition of done
- Files exist and npm run build succeeds


## Clarifying questions
- None
