---
id: "01M84ESEAHBWH8RE5PX59GVS0P"
kind: requirement
parent: 01M84ESEAGPPDS6300VDZMTFWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Coding agent providers: mock and Claude Code CLI adapter with restricted permissions and no shell interpolation

Context: community text is untrusted. Desired behavior: provider.Provider has Run(ctx, workDir, prompt) (cost, output, err); Mock returns a deterministic result and is flagged as mock; Claude builds an argument slice for the configured command with restricted permission flags, runs it with Dir=workDir through an injected Exec function, and sends the structured prompt on stdin, never in a shell string. Why: safe coding-agent invocation.

## Acceptance criteria
- Given the mock provider, when Run is called, then it returns its configured cost and output and Mock() is true
- Given the Claude adapter, when Run is called with a prompt containing shell metacharacters, then the argument slice contains no prompt text and the prompt is passed on stdin
- Given the Claude adapter, then args include print mode and an explicit allowed-tools list excluding Bash and the working directory equals workDir
- Given the command fails or ctx is cancelled, then Run returns an error wrapping the cause


## Scope
- In scope: worker/internal/provider
- Out of scope: Running the real Claude binary in tests
- Preserve: Agent signature used by runner


## Technical constraints
- exec.CommandContext with an argument slice; never sh -c


## Definition of done
- Providers satisfy the runner Agent signature


## Non-functional requirements
- Stdout capture bounded to 1 MiB


## Clarifying questions
- None
