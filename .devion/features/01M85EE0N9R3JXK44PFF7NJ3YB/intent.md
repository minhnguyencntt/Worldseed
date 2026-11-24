---
id: "01M85EE0N9R3JXK44PFF7NJ3YB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.3 Submit button disabled and loading states with inline success feedback

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) currently disables Send only when remaining <= 0 (L129). Blank and over-limit text leave it enabled, there is no in-flight guard, and the button label never changes. Success is shown only as a per-entry 'Sent' label in the list; errors show in a role=alert paragraph. Desired behavior: Send is disabled for blank, over-limit, zero quota and in-flight submissions, shows a loading label while in flight, and an inline success message appears after a successful send alongside the existing error message. Why: players get immediate, unambiguous feedback and cannot double-submit.

## Acceptance criteria
- Given blank or whitespace-only text, over-limit text, zero remaining quota, or a submission in flight, when the sheet renders, then the Send button is disabled.
- Given a submission in flight, when the sheet renders, then the button label reads 'Sending…' and returns to 'Send' when the request settles.
- Given a successful submission, when it resolves, then an inline role=status message 'Suggestion sent' is shown and a failed submission still shows the existing role=alert error.


## Scope
- In scope: ContributionSheet Send button disabled and loading states
- In scope: Inline success message
- Out of scope: Backend API changes
- Out of scope: Contribution history list changes
- Out of scope: Quota or max length constants
- Preserve: Existing handleSubmit guards and validation messages
- Preserve: errorMessage mapping
- Preserve: Radix Dialog focus behavior
- Preserve: API contract of submitContribution and listMine


## Technical constraints
- Frontend only: React + TypeScript in game/frontend
- No new dependencies


## Definition of done
- All three requirements are implemented and their unit tests pass


## Non-functional requirements
- Disabled and status states are announced accessibly (disabled attribute, role=status)


## Clarifying questions
- None
