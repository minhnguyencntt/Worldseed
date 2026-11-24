# UNIT-411 — Act: Update node_modules/phaser lock entry to 3.90.0

## Summary
Rewrite node_modules/phaser version, URL, integrity and dependency range

## Description
Replace the 4.2.1 entry with the registry data for phaser 3.90.0.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package-lock.json` · `packages["node_modules/phaser"]` · L3445-L3453
- **Do:** Set version to 3.90.0, resolved to the 3.90.0 tarball URL, integrity to the 3.90.0 sha512 hash, and dependencies.eventemitter3 to ^5.0.1.

```
"version": "3.90.0",
"resolved": "https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz",
"integrity": "sha512-/cziz/5ZIn02uDkC9RzN8VF9x3Gs3XdFFf9nkiMEQT3p7hQlWuyjy4QWosU802qqno2YSLn2BfqwOKLv/sSVfQ==",
"license": "MIT",
"dependencies": { "eventemitter3": "^5.0.1" }
```

- **Expected:** node -e "console.log(require('./game/frontend/package-lock.json').packages['node_modules/phaser'].version)" prints 3.90.0

## Acceptance criteria
- version, resolved, integrity match phaser@3.90.0.
- eventemitter3 range is ^5.0.1.

## Definition of done
- Entry matches phaser 3.90.0 registry metadata
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-411.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-082
- Requirement: REQ-206
- Unit (Act): UNIT-411
- Unit (Verify): UNIT-413
- Status: completed
- Change: NEW
