---
id: "01M864WDRAHXDD9GJVE8TV688V"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# Worldseed indie-game UI: readable fonts, centered dialog, full-screen background

Context: the captured screen at http://localhost:5173/ shows the intro as unstyled black text on a white page (IntroScreen uses class intro-screen, which has no CSS). During play, GameLayout puts the story text in a narrow right-hand sidebar (3fr/1fr grid) instead of over the scene. Desired behavior: readable fonts, story text in a centered dialog, and a full-screen background on both the intro and the game. Expected result: a player sees a styled full-screen backdrop with a centered framed dialog at intro and during play. Why: usability and polish.

## Acceptance criteria
- Given the app loads, when the intro shows, then it fills the viewport with a background image and the text sits in a centered framed dialog using the pixel fonts.
- Given the game is playing, when the screen renders, then the scene fills the whole viewport and the story text appears in a centered dialog rather than a right-hand sidebar.
- Given any screen, when text renders, then body text uses VT323 at 16px or larger and headings use Press Start 2P on a dark background with light text.


## Scope
- In scope: Global base typography and colours
- In scope: IntroScreen styling
- In scope: GameLayout full-screen scene and centered story dialog
- In scope: StoryPanel readability inside the dialog
- Out of scope: Backend or API changes
- Out of scope: New art assets
- Out of scope: Admin console styling
- Out of scope: Phaser scene logic and game content
- Preserve: Existing game state, dialogue choices and inventory behavior
- Preserve: HeaderOverlay and ContributionSheet behavior
- Preserve: Existing @fontsource font imports in main.tsx
- Preserve: Frame kit classes sf-frame-* and sf-btn


## Technical constraints
- UI-only change in game/frontend; no API changes
- Use the existing tokens (--sf-color-*, --sf-font-*, --sf-size-*) and frame kit; do not add remote font URLs


## Definition of done
- All requirement slices are implemented and their unit tests pass


## Non-functional requirements
- Text contrast stays readable (light parchment text on dark ink)


## Clarifying questions
- None
