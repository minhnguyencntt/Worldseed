---
id: "01M85CR1JVHTC12JQQ2HHV8S0E"
kind: requirement
parent: 01M85CR1JVMXY9E2T3DSCB7B1J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Blank or whitespace-only text cannot be submitted and shows an inline message

Context: handleSubmit returns silently when text.trim() is empty. Desired behavior: the Send button is disabled for blank text and an inline message explains that an idea is required when submit is attempted. Expected result: no submitContribution call for blank input. Why: the player gets feedback instead of silence.

## Acceptance criteria
- Given the textarea is empty or only whitespace, when the sheet renders, then the Send button is disabled
- Given whitespace-only text, when the form is submitted, then submitContribution is not called and an inline message 'Write your idea before sending' is shown


## Scope
- In scope: Blank validation in ContributionSheet
- Out of scope: Length and quota rules
- Preserve: Trimmed prompt sent on valid submit


## Technical constraints
- Keep validation in ContributionSheet.tsx


## Definition of done
- Blank input blocked with a visible message


## Clarifying questions
- None
