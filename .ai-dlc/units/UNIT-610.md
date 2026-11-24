# UNIT-610 — Act: Document NPC id rejection in validateWorld

## Summary
Comment validateWorld's scene character check as the NPC rejection rule

## Description
Add a comment on the scene.characters loop in validateWorld stating that unknown NPC ids produce a path-tagged error. No behavior change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/loader.ts` · `validateWorld` · L142-L146
- **Do:** Add a comment above the (scene.characters ?? []).forEach call saying every NPC id must exist in world.characters or a path-tagged error is pushed.

```
// Every scene NPC id must be in world.characters; otherwise push a path-tagged error.
```

- **Expected:** Comment present and the forEach body unchanged

## Acceptance criteria
- Comment present above the characters loop
- Error message text unchanged

## Definition of done
- Comment added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-610.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-123
- Requirement: REQ-306
- Unit (Act): UNIT-610
- Unit (Verify): UNIT-613
- Status: approved
- Change: UPDATE
