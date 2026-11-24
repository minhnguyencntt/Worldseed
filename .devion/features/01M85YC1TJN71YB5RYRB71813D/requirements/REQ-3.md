---
id: "01M85YC1TJABW5F2PBKNKSP3GZ"
kind: requirement
parent: 01M85YC1TJN71YB5RYRB71813D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Event log renders game history in its own scrolling region and App feeds real state

Context: history renders as a bare ol. Desired behavior: a framed Event log region showing history entries in order (newest visible via scroll) with a max-height scroll, and App continues to pass game.state.history, inventory and choose from useGame with no leftover old styling. Expected result: log reflects game state changes after choices.

## Acceptance criteria
- Given history ['a','b'], then the Story history list shows a then b inside an sf-frame-plaque region.
- Given empty history, then the log shows the text 'Nothing has happened yet'.
- Given App rendered after Begin, then StoryPanel receives the game state's history, inventory and choose and old border-amber/bg-stone-900 classes are gone.


## Scope
- In scope: event log markup
- In scope: App wiring check
- Out of scope: new log persistence
- Out of scope: backend
- Preserve: aria-label Story history
- Preserve: App props


## Technical constraints
- Real game state only; no mocked data.


## Dependencies
- INT


## Definition of done
- Log reads from state; no legacy styling


## Clarifying questions
- None
