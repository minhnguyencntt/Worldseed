---
id: "01M85AJ8CFHKW2AGTZGJBVZJV8"
kind: requirement
parent: 01M85AJ8CEQWH28MSJ2SCHT06S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · validateWorld reports unknown scene character ids with a path-tagged issue

Context: validateWorld builds a Set of world character ids at loader.ts L121 and iterates scenes at L128-L159 without looking at scene.characters. Desired behavior: for every scene character at index i, if its id is not in the set, push `scenes.<scene.id>.characters.<i>.id: unknown character: <id>`. Expected result: invalid content is rejected with a locatable issue. Why: authors can find the bad entry.

## Acceptance criteria
- Given scene bedroom has characters[1].id 'ghost' not in world.characters, When validateWorld runs, Then errors contains 'scenes.bedroom.characters.1.id: unknown character: ghost'
- Given scene.characters is undefined or all ids are declared, When validateWorld runs, Then no scene character error is added


## Scope
- In scope: loader.ts validateWorld
- Out of scope: interaction events
- Preserve: existing error strings


## Technical constraints
- Do not change validateWorld signature


## Definition of done
- Check implemented in validateWorld


## Clarifying questions
- None
