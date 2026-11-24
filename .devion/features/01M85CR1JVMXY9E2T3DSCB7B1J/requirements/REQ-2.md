---
id: "01M85CR1JVKS7A94PP3ZPJ1BV7"
kind: requirement
parent: 01M85CR1JVMXY9E2T3DSCB7B1J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Maximum length is enforced with a visible character counter and inline message

Context: the textarea has no limit while the backend rejects prompts over 500 characters. Desired behavior: a counter shows used/max, and over-limit text shows an inline message and disables Send. Expected result: over-limit prompts are never submitted. Why: avoid avoidable server rejections.

## Acceptance criteria
- Given the textarea holds N characters, then a counter reads 'N/500'
- Given the trimmed text exceeds 500 characters, then an inline message 'Idea is too long' is shown and Send is disabled
- Given the text is exactly 500 characters, then Send is enabled and no length message is shown


## Scope
- In scope: MAX_PROMPT_LENGTH constant, counter, over-limit message
- Out of scope: Reading the limit from the backend
- Preserve: Existing textarea id contribution-idea


## Technical constraints
- Constant lives in game/frontend/src/api/client.ts beside MAX_PER_PLAYER


## Definition of done
- Counter visible and over-limit blocked


## Clarifying questions
- None
