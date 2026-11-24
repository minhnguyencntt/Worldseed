---
id: "01M84M3002HKDFX5Q7AJ0F447E"
kind: unit
parent: 01M84M3002NQSPFCBX4S9NV5B4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Tailwind, PostCSS configs, directives and design tokens

Add devDependencies, create the two config files and prepend directives plus token variables to src/styles.css, keeping all existing rules.

## Acceptance criteria
- Given the frontend, when vite loads, then postcss.config.js registers tailwindcss and autoprefixer
- Given styles.css, when read, then directives and tokens precede the existing rules


## Scope
- In scope: package.json
- In scope: tailwind.config.ts
- In scope: postcss.config.js
- In scope: src/styles.css
- Out of scope: tests
- Preserve: Existing CSS rules


## Technical constraints
- Code path: `game/frontend/package.json`
- New file: `game/frontend/tailwind.config.ts`
- New file: `game/frontend/postcss.config.js`
- Code path: `game/frontend/src/styles.css`


## Definition of done
- Config files created; npm install succeeds


## Clarifying questions
- None
