---
id: "01M85C02SBSNWX9ZZMWWX5VGPS"
kind: requirement
parent: 01M85C02SATF1GCRRHV9AAY31Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Submit validates input and quota and shows disabled, loading and inline feedback states

Context: handleSubmit silently ignores empty text, has no length check, allows sending past quota and has no success message. Desired behavior: client-side validation with inline messages, Send disabled while sending or quota is exhausted, and a visible success message. Expected result: invalid submissions never reach the API. Why: clear feedback and fewer wasted calls.

## Acceptance criteria
- Given empty or whitespace text, when Send is clicked, then a role=alert 'Enter an idea before sending' shows and fetch is not called
- Given text longer than 500 characters, when Send is clicked, then a role=alert mentioning the 500 character limit shows and fetch is not called
- Given remaining is 0, then the textarea and Send are disabled and 'No contributions left' shows
- Given a submit in flight, then Send is disabled and reads 'Sending…'; on success a role=status 'Idea sent' shows; on API error the mapped error shows in role=alert


## Scope
- In scope: Validation, submit states and feedback in ContributionSheet
- In scope: MAX_PROMPT_LEN constant in client.ts
- Out of scope: Backend limit changes
- Preserve: errorMessage mapping for 429 and 409
- Preserve: MAX_PER_PLAYER of 5


## Technical constraints
- MAX_PROMPT_LEN = 500 mirrors MaxPromptLen in backend/internal/contribution/service.go (rune count)


## Definition of done
- Invalid input never calls submitContribution


## Clarifying questions
- None
