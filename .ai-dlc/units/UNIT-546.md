# UNIT-546 — Act: Confirm BootScene constructor takes zero arguments

## Summary
BootScene constructor arity fixed at zero

## Description
BootScene constructor calls super('BootScene') with no parameters. Confirm so tests construct it with new BootScene().

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.constructor` · L24-L26
- **Do:** Confirm the constructor has no parameters and calls super('BootScene'); leave unchanged

```
constructor() { super('BootScene'); }
```

- **Expected:** Constructor is unchanged

## Acceptance criteria
- constructor has no parameters
- super is called with 'BootScene'

## Definition of done
- Constructor confirmed unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-546.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-110
- Requirement: REQ-274
- Unit (Act): UNIT-546
- Unit (Verify): UNIT-549
- Status: completed
- Change: UPDATE
