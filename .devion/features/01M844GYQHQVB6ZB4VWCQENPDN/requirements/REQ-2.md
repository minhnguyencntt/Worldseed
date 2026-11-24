---
id: "01M844GYQJKSFBQC069PMYP5R3"
kind: requirement
parent: 01M844GYQHQVB6ZB4VWCQENPDN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · After Begin, App composes the playable 80/20 game view

Context: useGame returns state, scene, view, act, choose; SceneView takes sceneId/title/objects/selectedId/onSelect; ActionMenu takes object/onAction; StoryPanel takes node/history/inventory/onChoose. Desired behavior: after Begin, App renders GameLayout with the scene (SceneView plus ActionMenu for the selected object) and the story (StoryPanel). Expected result: clicking a hotspot opens its actions, performing an action updates history/flags, and dialogue choices work. Why: makes the opening scene playable.

## Acceptance criteria
- Given the intro was dismissed, then the bedroom background image, six hotspots and the Story toggle are rendered and the dialogue shows "I don't know what to do next. What should we do?"
- Given the game view, when the Bookshelf hotspot is clicked, then the Bookshelf action menu with Inspect, Push, Search and Leave buttons appears
- Given the Bookshelf menu, when Search is clicked, then the history list contains 'A hidden door swings open behind the books.' and the bookshelf hotspot has data-open true
- Given the opening dialogue, when the choice 'Look around the room' is clicked, then the dialogue section disappears and the history contains that text


## Scope
- In scope: Playing view in App.tsx with selected-object state
- Out of scope: Contribution UI
- Out of scope: Restyling
- Preserve: Intro gate behavior from R1


## Technical constraints
- Selected object id kept in App useState; selected object found from game.view
- Active node via getActiveNode(game.state, game.scene)


## Dependencies
- R1


## Definition of done
- Playing view wired to useGame and existing components


## Clarifying questions
- None
