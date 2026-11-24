---
id: "01M84RZYQXHA9VPD36D83WHG38"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1.1 · Pin phaser in package.json to 3.90.x

Context: game/frontend/package.json line 18 declares "phaser": "^4.2.1", which resolves to Phaser 4.x. The StoryForge goal requires Phaser 3.90. Desired behavior: the dependency is an exact or tilde 3.90.x version with no caret range. Expected result: package.json can only resolve to 3.90.x. Why: the engine code is written against the Phaser 3.90 API. Lockfile regeneration is a separate sub-goal and is not part of this ticket.

## Acceptance criteria
- Given game/frontend/package.json, when dependencies.phaser is read, then it matches ^(~)?3\.90\.\d+ with no caret.
- Given the phaser value, when it is evaluated, then it cannot resolve to any 4.x version.


## Scope
- In scope: The phaser entry in game/frontend/package.json dependencies
- Out of scope: package-lock.json regeneration
- Out of scope: Phaser API code changes
- Out of scope: Other dependencies
- Preserve: All other dependency entries and the scripts block in package.json


## Technical constraints
- Value must be exact (3.90.0) or tilde (~3.90.0); no caret range


## Definition of done
- package.json phaser entry is 3.90.0 or ~3.90.0
- Unit test on the declaration passes


## Clarifying questions
- None
