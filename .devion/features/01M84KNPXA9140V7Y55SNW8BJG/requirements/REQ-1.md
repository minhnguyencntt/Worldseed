---
id: "01M84KNPXB6K217KHV7Y5525PD"
kind: requirement
parent: 01M84KNPXA9140V7Y55SNW8BJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tailwind, shadcn/ui, Radix, Motion and Lucide are configured in game/frontend

Context: package.json has only react, react-dom and yaml. Desired behavior: add tailwindcss, postcss, autoprefixer, zustand, motion, lucide-react, @radix-ui/react-dialog, class-variance-authority, clsx, tailwind-merge, with tailwind.config.ts, postcss.config.js, components.json, a cn helper and Tailwind directives in styles.css. Result: any component can use Tailwind utilities and the cn helper. Why: design-system base.

## Acceptance criteria
- Given package.json, when read, then each listed dependency is declared
- Given tailwind.config.ts, when loaded, then content includes ./index.html and ./src/**/*.{ts,tsx}
- Given cn('a', false, 'b'), when called, then it returns 'a b' and merges conflicting Tailwind classes
- Given styles.css, when read, then it contains the @tailwind base, components and utilities directives


## Scope
- In scope: package.json, tailwind/postcss/shadcn config, cn helper, styles.css directives
- Out of scope: Phaser
- Out of scope: visual theme beyond base tokens
- Preserve: existing .contribution-sheet styles
- Preserve: vite/vitest config aliases


## Technical constraints
- Tailwind v3 with PostCSS


## Definition of done
- Dependencies and configs committed; app still builds


## Clarifying questions
- None
