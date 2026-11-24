---
id: "01M84M300298C158V0E66Y0QWJ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.1 Configure Tailwind and the UI stack in game/frontend

Context: game/frontend has only react, react-dom and yaml in package.json; no Tailwind or PostCSS config exists and src/styles.css is plain CSS. Desired behavior: Tailwind is configured with design tokens, a cn helper exists, shadcn/Radix dependencies are installed and used, and Lucide/Motion are used by real UI. Expected result: the stack is exercised by shipped components, not only listed. Why: later SG-1 slices build the pixel-art shell on it.

## Acceptance criteria
- Given game/frontend, when the build config is read, then tailwind.config.ts and postcss.config.js exist and process src/styles.css
- Given styles.css, when read, then it contains the three @tailwind directives and design token CSS variables
- Given the cn helper, when called with conflicting Tailwind classes, then the last wins
- Given GameLayout, when rendered, then it uses a shadcn-style Button, a Lucide icon and a Motion element while the existing drawer behavior is unchanged


## Scope
- In scope: game/frontend package.json, Tailwind/PostCSS config, styles.css, cn helper, ui Button, GameLayout toggle
- Out of scope: Phaser, Zustand, header, modals, backend changes
- Preserve: Existing .game-layout/.story-panel CSS and drawer toggle behavior
- Preserve: Existing tests under game/frontend/tests


## Technical constraints
- Use Tailwind CSS with PostCSS in Vite
- Stay inside game/frontend


## Definition of done
- All requirements delivered and unit tests pass


## Clarifying questions
- None
