---
id: "01M84S559NWCSW0D395RW6VH4B"
kind: requirement
parent: 01M84S559NWVQM1R4P3G8ANC81
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · node_modules/phaser lock entry resolves 3.90.0 with URL and integrity

Context: node_modules/phaser (L3445-L3453) records 4.2.1. Desired behavior: version 3.90.0, resolved https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz, integrity sha512-/cziz/5ZIn02uDkC9RzN8VF9x3Gs3XdFFf9nkiMEQT3p7hQlWuyjy4QWosU802qqno2YSLn2BfqwOKLv/sSVfQ==, and dependencies eventemitter3 ^5.0.1 as published. Why: reproducible install of the 3.90 line.

## Acceptance criteria
- Given the lockfile, when node_modules/phaser is read, then version is 3.90.0 and resolved is the phaser-3.90.0.tgz registry URL
- Given the lockfile, when node_modules/phaser integrity is read, then it equals the 3.90.0 sha512 value and its eventemitter3 range is satisfied by the locked 5.0.4


## Scope
- In scope: node_modules/phaser lockfile entry
- Out of scope: root dependencies entry
- Preserve: eventemitter3 5.0.4 entry
- Preserve: license field MIT


## Technical constraints
- Values must come from npm registry metadata for phaser@3.90.0


## Definition of done
- Entry matches registry metadata for 3.90.0


## Clarifying questions
- None
