---
id: "01M844TV9QMB3GSEN137790AHF"
kind: requirement
parent: 01M844TV9QXFQ8S1DRSJEPHJ1H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Remount restores the saved game state

Context: useGame initialises from readSaved() and writes on every state change; the intro gate (begun) is local state and resets on remount. Desired behavior: the inventory region is named so restored inventory is assertable alongside history and hotspot state. Expected result: with storage mocked in memory, state survives remount. Why: players must not lose progress.

## Acceptance criteria
- Given Search was performed and storage is the in-memory mock, when App is remounted and Begin clicked, then history shows the hidden door text and Bookshelf has data-open true
- Given the mocked readSaved returns null, when App renders and Begin is clicked, then the opening dialogue is shown


## Scope
- In scope: StoryPanel inventory section aria-label
- Out of scope: Persisting intro gate
- Preserve: STORAGE_KEY
- Preserve: readSaved/writeSaved signatures


## Technical constraints
- Do not change runtime/storage.ts


## Definition of done
- Inventory section exposes accessible name Inventory


## Clarifying questions
- None
