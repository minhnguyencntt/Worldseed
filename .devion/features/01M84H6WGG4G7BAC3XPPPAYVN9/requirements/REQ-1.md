---
id: "01M84H6WGGV2NNFWP0JQH0SHK1"
kind: requirement
parent: 01M84H6WGG4G7BAC3XPPPAYVN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Claude adapter passes restricted-permission flags to the CLI

Context: Claude.Run currently calls Exec with only `-p` and the prompt. Desired behavior: also pass `--permission-mode acceptEdits`, `--allowedTools Read,Edit,Write,Glob,Grep` and `--disallowedTools Bash,WebFetch,WebSearch`. Expected result: the agent can edit workspace files but not run shell commands or reach the network. Why: restricted permissions are mandated for coding agents.

## Acceptance criteria
- Given a fake Exec, when Run is called, then args contain --permission-mode followed by acceptEdits
- Given a fake Exec, when Run is called, then --disallowedTools lists Bash and --allowedTools does not list Bash


## Scope
- In scope: Argument list built in Claude.Run
- Out of scope: Executor implementation
- Preserve: Exec interface
- Preserve: Run return values


## Technical constraints
- Args are a []string, never a joined command string


## Definition of done
- Flags present in args


## Clarifying questions
- None
