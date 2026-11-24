---
id: "01M85C02SATF1GCRRHV9AAY31Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8 Suggest What Happens Next contribution modal

Context: ContributionSheet is a plain div dialog with a bare textarea, a Send button and a best-effort own-suggestions list, opened from a button in App. Desired behavior: a Radix modal opens from the gameplay screen without navigation, with a prompt textarea, remaining count, submit button with disabled and loading states, inline success and error feedback, validation (empty, over-length, quota exhausted) and a history list, using only the existing client in game/frontend/src/api/client.ts. Expected result: players contribute without leaving the game, with keyboard and focus handled correctly. Why: the StoryForge redesign requires a polished in-game contribution UX with no Firebase, no database and no Git credentials in the browser.

## Acceptance criteria
- Given the gameplay screen, when the Suggest What Happens Next button is activated, then a modal dialog opens without any navigation or URL change
- Given an open modal, when the player submits valid text, then the existing submitContribution client call is used and success or error feedback appears inline
- Given empty text, over-length text or an exhausted quota, when the player tries to submit, then no API call is made and an inline validation message is shown
- Given an open modal, when it opens, closes or Escape is pressed, then focus moves into the dialog, is trapped, and returns to the trigger on close


## Scope
- In scope: ContributionSheet component in game/frontend/src/components
- In scope: App wiring of the trigger button
- In scope: Unit tests with fetch mocked
- Out of scope: Backend changes
- Out of scope: Firebase, database or Git credentials in the browser
- Out of scope: Admin console
- Preserve: submitContribution and listMine contracts in client.ts
- Preserve: 401 session-retry behavior
- Preserve: Existing tests/contribution.test.tsx expectations


## Technical constraints
- React + TypeScript, Radix Dialog (@radix-ui/react-dialog already in package.json)
- Use only the existing client in src/api/client.ts for submit and history


## Definition of done
- All requirements delivered and their Verify units green


## Non-functional requirements
- Keyboard accessible dialog


## Clarifying questions
- None
