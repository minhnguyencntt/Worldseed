---
id: "01M85GJGAW0FWZZZVYNQQZNE89"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.5 Unit tests for ContributionSheet with the API client mocked

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) already implements submit, history, validation and Radix dialog focus behaviour, with many partial suites in game/frontend/tests. Desired behavior: four focused test files exist and pass, covering submit success, API error, quota exhausted, history loading/empty/error/list, empty and over-length validation, Escape, focus trap and focus restore. Expected result: each behaviour is asserted by a named test. Why: SG-8.5 requires the test files to actually exist and pass.

## Acceptance criteria
- Given the API is mocked, when a submit succeeds, fails with 500 or fails with 409, then each outcome is asserted by a test that passes
- Given the history endpoint is mocked, when it is pending, empty, failing or returns entries, then each state is asserted by a test that passes
- Given empty and 501-character text, when Send is attempted, then the validation tests assert no POST is made
- Given an open dialog, when Escape is pressed, focus moves outside or the dialog closes, then the Escape, focus trap and focus restore tests pass


## Scope
- In scope: Test ids on existing ContributionSheet elements
- In scope: Four new vitest files under game/frontend/tests
- Out of scope: Backend changes
- Out of scope: Browser or e2e tests
- Out of scope: Changing user-visible text or behaviour
- Preserve: Existing contribution tests
- Preserve: API client contracts in game/frontend/src/api/client.ts


## Technical constraints
- vitest with jsdom and mocked fetch
- No real network


## Definition of done
- All four new test files pass


## Clarifying questions
- None
