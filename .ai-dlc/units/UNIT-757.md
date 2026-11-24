# UNIT-757 — Act: Confirm SHUTDOWN handler calls and nulls unsubscribeTransition

## Summary
Verify and keep the transitionTo release in the SHUTDOWN callback

## Description
The SHUTDOWN callback already calls unsubscribeTransition?.() and sets it to null. Read and keep it; add only if missing.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN callback` · L84-L99
- **Do:** Confirm the callback ends with `this.unsubscribeTransition?.(); this.unsubscribeTransition = null;`; add these two lines if either is missing

```
this.unsubscribeTransition?.();
this.unsubscribeTransition = null;
```

- **Expected:** Callback releases and clears the transitionTo handle

## Acceptance criteria
- SHUTDOWN handler calls unsubscribeTransition?.()
- The field is set to null afterward

## Definition of done
- Both lines present in SHUTDOWN
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-757.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-154
- Requirement: REQ-379
- Unit (Act): UNIT-757
- Unit (Verify): UNIT-759
- Status: completed
- Change: UPDATE
