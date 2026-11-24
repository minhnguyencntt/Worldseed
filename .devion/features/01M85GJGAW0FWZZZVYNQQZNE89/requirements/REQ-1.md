---
id: "01M85GJGAX0FQ3YQN6Y02GB5SQ"
kind: requirement
parent: 01M85GJGAW0FWZZZVYNQQZNE89
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Submit success, API error and quota exhausted outcomes are individually identifiable

Context: ContributionSheet shows success via data-testid contribution-success, but the error alert and the quota-used message have no test ids. Desired behavior: the error alert and zero-quota message carry test ids. Expected result: tests assert success, 500 error, 409 error and quota exhausted separately. Why: SG-8.5 submit coverage.

## Acceptance criteria
- Given a 201 response, when Send is clicked, then contribution-success shows 'Suggestion sent'
- Given a 500 response, when Send is clicked, then contribution-error shows 'Could not send'
- Given a 409 response, when Send is clicked, then contribution-error shows 'Limit reached or duplicate idea'
- Given 5 sent contributions in history, when the sheet opens, then contribution-quota is shown and Send is disabled


## Scope
- In scope: Test ids for error and quota alerts
- Out of scope: Message wording changes
- Preserve: Existing text, roles and ids


## Technical constraints
- Keep role=alert on both elements


## Definition of done
- Test ids present and submit tests pass


## Clarifying questions
- None
