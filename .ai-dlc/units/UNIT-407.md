# UNIT-407 — Act: Update node_modules/phaser lock entry to 3.90.0

## Summary
Edit version, resolved, integrity and dependencies

## Description
Rewrite the node_modules/phaser block in game/frontend/package-lock.json with the 3.90.0 registry values.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package-lock.json` · `packages["node_modules/phaser"]` · L3445-L3453
- **Do:** Replace version, resolved and integrity with the 3.90.0 values and change the eventemitter3 range from ^5.0.4 to ^5.0.1

```
version 4.2.1 -> 3.90.0; resolved .../phaser-4.2.1.tgz -> https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz; integrity -> sha512-/cziz/5ZIn02uDkC9RzN8VF9x3Gs3XdFFf9nkiMEQT3p7hQlWuyjy4QWosU802qqno2YSLn2BfqwOKLv/sSVfQ==; eventemitter3 ^5.0.4 -> ^5.0.1
```

- **Expected:** node_modules/phaser entry describes 3.90.0

## Acceptance criteria
- version is 3.90.0 with matching resolved URL and integrity
- eventemitter3 range is ^5.0.1

## Definition of done
- Block matches 3.90.0 registry metadata
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-407.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-081
- Requirement: REQ-204
- Unit (Act): UNIT-407
- Unit (Verify): UNIT-409
- Status: completed
- Change: UPDATE
