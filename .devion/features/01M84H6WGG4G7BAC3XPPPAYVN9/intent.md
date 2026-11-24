---
id: "01M84H6WGG4G7BAC3XPPPAYVN9"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.10 Claude Code CLI adapter with restricted permissions and no raw community text

Context: backend/worker/internal/provider/claude.go already has a Claude adapter that calls an Exec interface with `claude -p <fixed prompt>`, with unit tests using a recording fake Exec. It passes no permission restrictions. Desired behavior: the adapter limits what the CLI may do, never uses a shell, and receives only a constant instruction that points at structured tasks under development/tasks, never raw community text. Expected result: unit tests with a fake Exec prove all of this. Why: community prompts are untrusted and the coding agent must run restricted.

## Acceptance criteria
- Given the Claude adapter, when Run is called, then the Exec receives permission-restricting flags that exclude shell and network tools
- Given the Claude adapter, when Run is called, then the args contain only a fixed prompt naming development/tasks and no caller-supplied text
- Given an empty work directory, when Run is called, then it returns an error and Exec is not called


## Scope
- In scope: backend/worker/internal/provider/claude.go
- In scope: backend/worker/internal/provider/claude_test.go
- Out of scope: Real command executor implementation
- Out of scope: Runner changes
- Out of scope: Mock provider
- Preserve: Exec interface signature
- Preserve: NewClaude nil-Exec error
- Preserve: Cost 0 return and error wrapping with the 'provider claude' prefix
- Preserve: provider.New factory behavior


## Technical constraints
- No shell: command name and args are passed to Exec as a list
- Tests use a fake Exec only


## Definition of done
- Adapter restricted and unit tests pass with go test ./internal/provider


## Non-functional requirements
- Security: untrusted community text never reaches the agent command line


## Clarifying questions
- None
