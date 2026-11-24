---
id: "01M84H6WGGZ6QAD267HECPGFSD"
kind: requirement
parent: 01M84H6WGG4G7BAC3XPPPAYVN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Claude adapter accepts only structured input and rejects an empty work directory

Context: claudePrompt is a constant but Run does not validate workDir. Desired behavior: Run returns an error containing 'work dir' when workDir is empty or whitespace, without calling Exec; the prompt arg remains exactly claudePrompt. Expected result: no caller-controlled text can enter the command line and the CLI never runs in an unspecified directory. Why: untrusted-input and workspace isolation.

## Acceptance criteria
- Given workDir is empty, when Run is called, then it returns an error mentioning work dir and Exec is not called
- Given a valid workDir, when Run is called, then the argument after -p equals the fixed prompt and the args contain no workDir text


## Scope
- In scope: Claude.Run validation and prompt use
- Out of scope: Requirement file generation
- Preserve: Error wrapping of Exec failures


## Technical constraints
- No new Run parameters; Agent interface unchanged


## Definition of done
- Validation and fixed prompt covered


## Clarifying questions
- None
