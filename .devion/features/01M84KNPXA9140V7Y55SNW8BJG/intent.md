---
id: "01M84KNPXA9140V7Y55SNW8BJG"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1 · Set up UI stack, design system and responsive shell

Context: game/frontend is a React 18 + Vite app whose layout is a plain CSS grid (src/styles.css, GameLayout.tsx) with local useState drawer state and a RoundBadge/Countdown rendered inside the scene. It has no Tailwind, shadcn/ui, Radix, Zustand, Motion or Lucide. Desired behavior: the stack is configured, a Zustand store owns UI flags, the shell is a full-viewport 80/20 layout with a mobile bottom drawer, and a compact header overlay shows the world and round state. Why: this is the foundation for the Phaser redesign.

## Acceptance criteria
- Given the frontend package, when package.json and tailwind config are read, then tailwindcss, radix, zustand, motion and lucide-react are declared and Tailwind scans src/**/*.{ts,tsx}
- Given the UI store, when its actions are called, then drawer, modal, sound and settings flags change as specified
- Given a desktop viewport, when the shell renders, then the game area has the 80% column class and the story panel the 20% column class with overflow hidden on the root
- Given a mobile viewport, when the shell renders, then the story panel is a bottom drawer toggled by the store and the scene stays mounted
- Given the header overlay, when rendered, then it shows logo, world name, round ID, status, countdown, sound toggle and settings button


## Scope
- In scope: game/frontend config, store, GameLayout, header overlay, App composition
- Out of scope: Phaser integration
- Out of scope: asset manifest
- Out of scope: new gameplay logic
- Out of scope: backend changes
- Preserve: useGame business logic
- Preserve: API client contracts
- Preserve: existing admin app


## Technical constraints
- React + TypeScript + Vite
- Tailwind CSS, shadcn/ui, Radix UI, Zustand, Motion, Lucide React
- No Firebase, no database


## Definition of done
- All requirements delivered with passing unit tests


## Non-functional requirements
- No page scroll or horizontal overflow


## Clarifying questions
- None
