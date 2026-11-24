---
id: "01M85EE0N95XDRZ1G9V9DN3RGX"
kind: requirement
parent: 01M85EE0N9R3JXK44PFF7NJ3YB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Send is disabled when text is blank, over limit, quota is exhausted or a send is in flight

Context: ContributionSheet Send is disabled only at zero quota. Desired behavior: disabled whenever trimmed text is empty, length exceeds MAX_PROMPT_LENGTH, remaining <= 0, or a submission is pending. Expected result: no click can start an invalid or duplicate submission. Why: prevents invalid and double submits.

## Acceptance criteria
- Given empty or whitespace-only text, when the sheet renders, then Send is disabled.
- Given text longer than MAX_PROMPT_LENGTH, when the sheet renders, then Send is disabled.
- Given remaining quota is 0, when the sheet renders, then Send is disabled.
- Given a submission whose promise has not settled, when the sheet renders, then Send is disabled.


## Scope
- In scope: disabled attribute computation on Send
- Out of scope: Label change
- Out of scope: Success message
- Preserve: handleSubmit guards for blank, over limit and quota
- Preserve: Inline validation messages


## Technical constraints
- handleSubmit keeps its own guards because the form can be submitted with Enter or programmatically


## Definition of done
- Send disabled in all four conditions and enabled for valid text with quota


## Clarifying questions
- None
