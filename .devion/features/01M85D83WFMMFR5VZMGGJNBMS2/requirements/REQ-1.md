---
id: "01M85D83WGT15FRTDHB1R6R31G"
kind: requirement
parent: 01M85D83WFMMFR5VZMGGJNBMS2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Shared max-length constant drives a visible n / max counter

Context: client.ts exports MAX_PER_PLAYER but no length constant. Desired behavior: export MAX_PROMPT_LENGTH = 500 and render a counter beside the textarea that updates on every change. Expected result: the player always sees how much room is left. Why: the limit must be visible before it is exceeded.

## Acceptance criteria
- Given the sheet is open with empty text, Then the counter reads '0 / 500'
- Given the text 'hello', Then the counter reads '5 / 500'
- Given the text '  hi  ', Then the counter reads '2 / 500' because it counts trimmed characters
- Given the textarea, Then it is described by the counter via aria-describedby


## Scope
- In scope: MAX_PROMPT_LENGTH export
- In scope: Counter element in ContributionSheet
- Out of scope: Over-limit message
- Out of scope: Submit blocking
- Preserve: Existing aria-describedby for the blank message


## Technical constraints
- Constant lives next to MAX_PER_PLAYER in game/frontend/src/api/client.ts


## Definition of done
- Counter renders and updates; constant exported


## Clarifying questions
- None
