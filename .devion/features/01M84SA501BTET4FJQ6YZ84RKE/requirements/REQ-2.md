---
id: "01M84SA5018K3J2BAEWYY1K5C2"
kind: requirement
parent: 01M84SA501BTET4FJQ6YZ84RKE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · node_modules/phaser lock entry resolves 3.90.0 with URL and integrity

Context: node_modules/phaser (L3445-L3453) is 4.2.1 with eventemitter3 ^5.0.4. Desired: version 3.90.0, tarball URL, integrity from the registry and eventemitter3 ^5.0.1. Expected: npm ci installs 3.90.0. Why: reproducible installs on the pinned engine.

## Acceptance criteria
- Given package-lock.json, when node_modules/phaser is read, then version is 3.90.0 and resolved is https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz.
- Given the entry, when integrity is read, then it is the 3.90.0 sha512 hash and dependencies.eventemitter3 is ^5.0.1.


## Scope
- In scope: node_modules/phaser entry
- Out of scope: node_modules/eventemitter3 entry (5.0.4 already satisfies ^5.0.1)
- Preserve: license MIT field


## Technical constraints
- Integrity must be the registry value for phaser@3.90.0


## Definition of done
- node_modules/phaser entry describes 3.90.0


## Clarifying questions
- None
