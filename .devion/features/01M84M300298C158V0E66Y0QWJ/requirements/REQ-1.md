---
id: "01M84M3002NQSPFCBX4S9NV5B4"
kind: requirement
parent: 01M84M300298C158V0E66Y0QWJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tailwind and PostCSS are configured with design tokens and directives

Context: no tailwind/postcss config exists in game/frontend. Desired behavior: Tailwind scans index.html and src, theme extends with token colors backed by CSS variables, styles.css starts with @tailwind directives and defines the tokens. Expected result: utility classes compile in Vite. Why: foundation for the design system.

## Acceptance criteria
- Given tailwind.config.ts, when imported, then content includes ./index.html and ./src/**/*.{ts,tsx}
- Given tailwind.config.ts, when imported, then theme.extend.colors maps background, foreground and primary to hsl(var(--...))
- Given styles.css, when read, then it contains @tailwind base, components and utilities and a :root block defining --background, --foreground and --primary
- Given styles.css, when read, then the existing .game-layout and .story-panel rules remain


## Scope
- In scope: package.json devDependencies
- In scope: tailwind.config.ts
- In scope: postcss.config.js
- In scope: src/styles.css
- Out of scope: Component restyling
- Preserve: Existing CSS rules


## Technical constraints
- tailwindcss ^3.4, postcss, autoprefixer


## Definition of done
- Configs exist and tests pass


## Clarifying questions
- None
