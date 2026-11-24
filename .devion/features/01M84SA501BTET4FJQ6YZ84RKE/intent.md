---
id: "01M84SA501BTET4FJQ6YZ84RKE"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1.2 Lock phaser to 3.90.x in package-lock.json

Context: game/frontend/package.json already declares phaser ~3.90.0, but game/frontend/package-lock.json still lists the root phaser specifier as ^4.2.1 and node_modules/phaser as 4.2.1. Desired behavior: the lockfile agrees with package.json. Expected result: npm ci installs phaser 3.90.0. Why: Phaser 3.90 is the required engine version and the lockfile is out of sync.

## Acceptance criteria
- Given package-lock.json, when packages[""].dependencies.phaser is read, then it equals ~3.90.0 and package.json's phaser value.
- Given package-lock.json, when packages["node_modules/phaser"] is read, then version is 3.90.0 with the 3.90.0 tarball URL and its integrity hash.
- Given the lockfile unit tests, when run against the real file, then they pass and would fail on 4.2.1.


## Scope
- In scope: game/frontend/package-lock.json phaser entries
- In scope: lockfile unit tests
- Out of scope: Other dependencies
- Out of scope: package.json changes
- Out of scope: Phaser source code changes
- Preserve: Other lockfile entries
- Preserve: lockfileVersion 3


## Technical constraints
- Resolved version 3.90.0, URL https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz
- Integrity sha512-/cziz/5ZIn02uDkC9RzN8VF9x3Gs3XdFFf9nkiMEQT3p7hQlWuyjy4QWosU802qqno2YSLn2BfqwOKLv/sSVfQ==
- Phaser 3.90.0 depends on eventemitter3 ^5.0.1


## Definition of done
- Lockfile phaser entries describe 3.90.0 and tests pass


## Clarifying questions
- None
