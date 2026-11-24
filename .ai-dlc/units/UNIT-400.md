# UNIT-400 — Act: Pin phaser to ~3.90.0 in package.json and regenerate the lockfile

## Summary
Change phaser range and reinstall

## Description
Edit the phaser range in game/frontend/package.json and run npm to regenerate package-lock.json with a 3.90.x release.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies.phaser` · L15
- **Do:** Change the phaser range from ^4.2.1 to ~3.90.0 by running npm install so the lockfile is regenerated.

```
"phaser": "^4.2.1" -> "phaser": "~3.90.0"
```

- **Expected:** package.json shows ~3.90.0

### Step 2 — `game/frontend/package-lock.json` · `node_modules/phaser` · L3445-L3450
- **Do:** From game/frontend run `npm install phaser@~3.90.0` so the node_modules/phaser entry and root dependencies entry resolve to 3.90.x.

```
"version": "4.2.1" -> "version": "3.90.0"
```

- **Expected:** Lockfile phaser version starts with 3.90.

## Acceptance criteria
- package.json lists phaser ~3.90.0
- Lockfile resolves phaser to 3.90.x

## Definition of done
- Both files updated by npm
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-400.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-079
- Requirement: REQ-200
- Unit (Act): UNIT-400
- Unit (Verify): UNIT-402
- Status: completed
- Change: UPDATE
