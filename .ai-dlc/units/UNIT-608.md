# UNIT-608 — Act: Document the scene character contract on characterSchema

## Summary
Comment characterSchema as accepting multiple NPC entries

## Description
Add a doc comment on characterSchema stating that scene.characters may hold any number of NPCs, each with a required idle animation. No behavior change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `characterSchema` · L56-L63
- **Do:** Add a one-line comment above export const characterSchema saying scene.characters may list several NPCs and each must declare an idle animation ref.

```
// A scene may list several characters (boy and NPCs); each requires an idle animation ref.
```

- **Expected:** characterSchema has the comment and its fields are unchanged

## Acceptance criteria
- characterSchema carries a comment naming idle as required
- Schema behavior is unchanged

## Definition of done
- Comment added and tsc still passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-608.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-123
- Requirement: REQ-304
- Unit (Act): UNIT-608
- Unit (Verify): UNIT-611
- Status: approved
- Change: UPDATE
