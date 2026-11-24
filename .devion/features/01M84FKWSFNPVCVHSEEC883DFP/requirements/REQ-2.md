---
id: "01M84FKWSFKJZD41BPD82DNBN9"
kind: requirement
parent: 01M84FKWSFNPVCVHSEEC883DFP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Run retries up to the configured limit and stops when the budget is exceeded

Context: config exposes MaxRetries and MaxBudget. Desired behavior: Run attempts the agent up to MaxRetries+1 times, recording Execution.Attempt, summing cost returned by each attempt, and stopping with ErrBudgetExceeded as soon as total cost exceeds MaxBudget. Expected result: bounded, budget-safe agent runs. Why: avoid runaway cost and endless loops.

## Acceptance criteria
- Given an agent failing twice then succeeding and MaxRetries 2, when Run is called, then the agent is called 3 times and the stored Attempt is 3
- Given an agent that always fails and MaxRetries 1, when Run is called, then the agent is called 2 times, the status is FAILED and Error contains the agent error
- Given each attempt costs 3.0 and MaxBudget 5.0, when the second attempt finishes, then Run returns an error satisfying errors.Is(err, ErrBudgetExceeded) and no third attempt runs


## Scope
- In scope: retry loop in Run's execute step
- In scope: ErrBudgetExceeded
- Out of scope: backoff delays
- Preserve: R1 lock and timeout behavior


## Technical constraints
- Budget check runs after each attempt, including a failed one


## Dependencies
- R1


## Definition of done
- Retry and budget limits enforced


## Clarifying questions
- None
