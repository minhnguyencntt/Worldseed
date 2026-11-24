---
id: "01M84VMJ3A52YFCQ2ACYAXZW9B"
kind: requirement
parent: 01M84VMJ393J7MJQ4X11HHFE16
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · parseGitLsFiles deduplicates conflict stage entries

Context: parseGitLsFiles currently splits NUL-separated output and returns every entry, so a conflicted path appears up to three times, and staged lines of the form '<mode> <sha> <stage>\t<path>' would be returned with their prefix. Desired behavior: strip the stage prefix when present and return unique paths in first-seen order. Why: guard reports and cleanup counts must not be inflated by conflict entries.

## Acceptance criteria
- Given NUL-separated output where the same path appears three times, when parsed, then the result contains it once.
- Given lines like '100644 <sha> 2\tnode_modules/.vite/vitest/results.json', when parsed, then the result is the bare path once.
- Given plain unique paths, when parsed, then order and content are unchanged.


## Scope
- In scope: parseGitLsFiles in src/lib/trackedNodeModules.ts
- Out of scope: Changing the git command used by checkTrackedFiles
- Preserve: Return type string[]
- Preserve: Empty-string filtering


## Technical constraints
- Pure function, no I/O


## Definition of done
- Parser dedupes and strips stage prefix


## Clarifying questions
- None
