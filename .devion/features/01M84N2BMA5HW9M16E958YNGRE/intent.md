---
id: "01M84N2BMA5HW9M16E958YNGRE"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.3 Rebuild GameLayout with Tailwind classes and the UI store

Context: game/frontend/src/components/GameLayout.tsx uses the legacy classes .game-layout, .scene-area and .story-panel from src/styles.css, plus a local useState drawer flag, although useUiStore already exposes drawerOpen and toggleDrawer. Desired behavior: on desktop the viewport shows an 80/20 game/story split with no page scroll or horizontal overflow. On mobile the story panel becomes a bottom drawer and the game controls stay reachable. Expected result: the legacy layout CSS is gone. Why: this is the responsive shell the StoryForge redesign requires.

## Acceptance criteria
- Given a viewport of at least 768px, when GameLayout renders, then the layout is a full-height grid with columns 4fr/1fr, the root has overflow-hidden, and the story aside scrolls on its own.
- Given a viewport below 768px, when the Story toggle is clicked, then the aside moves from closed to open and the scene and its controls remain mounted and reachable.
- Given src/styles.css, when it is read, then it contains no .game-layout, .story-panel or .scene-area rules and no @media (max-width: 768px) block.


## Scope
- In scope: GameLayout.tsx Tailwind rebuild
- In scope: drawer state from useUiStore
- In scope: removal of legacy layout CSS from styles.css
- In scope: updating tests that assert the legacy classes
- Out of scope: Phaser integration
- Out of scope: HeaderOverlay
- Out of scope: StoryPanel content
- Out of scope: ContributionSheet restyling
- Preserve: GameLayout props scene and story
- Preserve: Story toggle button named 'Story' with aria-expanded
- Preserve: StoryPanel root class story-content
- Preserve: the .contribution-sheet CSS


## Technical constraints
- Tailwind utility classes (md breakpoint = 768px)
- Zustand useUiStore for drawer state
- Button, Lucide ChevronUp and motion.aside stay in use


## Definition of done
- Both requirements are implemented and verified by unit tests


## Non-functional requirements
- No horizontal overflow at any width


## Clarifying questions
- None
