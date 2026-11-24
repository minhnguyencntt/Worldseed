---
id: "01M84SFS5W7V38JR4MYCSPQ2XJ"
kind: unit
parent: 01M84SFS5WTT52TTYRSPJ81RDF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: config, createGame and events use only 3.90 APIs unit tests

Write tests/phaser390Config.test.ts with phaser mocked via vi.mock. Assert the config shape, the createGame wiring and that the source files reference no Phaser 4-only symbols.

## Acceptance criteria
- Given the mocked phaser, when buildGameConfig is called, then type is AUTO, size is 640x360 and pixelArt is true.
- Given source text of config.ts, createGame.ts and events.ts read with node:fs, when scanned, then none matches /Filters|enableFilters|setFilter|Phaser\.Renderer\.WebGL\.Renderer\.Filters/.
- Given events.ts source, when scanned, then it has no import from 'phaser'.


## Scope
- In scope: tests/phaser390Config.test.ts
- Out of scope: Real browser rendering
- Preserve: Existing phaser tests


## Technical constraints
- phaser mocked; fs reads of repo source files only


## Definition of done
- New test file passes


## Clarifying questions
- None
