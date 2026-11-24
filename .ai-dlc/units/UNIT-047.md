# UNIT-047 — Act: Expose object id on the ActionMenu root

## Summary
Add data-object-id to the ActionMenu section

## Description
Add data-object-id={object.id} to the ActionMenu root section so the open menu is identifiable by object.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ActionMenu.tsx` · `ActionMenu` · L15
- **Do:** On the <section className="action-menu" aria-label={object.name}> element add the attribute data-object-id={object.id}.

```
<section className="action-menu" aria-label={object.name}> -> <section className="action-menu" aria-label={object.name} data-object-id={object.id}>
```

- **Expected:** The rendered menu section carries data-object-id equal to the object id.

## Acceptance criteria
- Given an object, when ActionMenu renders, then the section has data-object-id equal to object.id
- Given object undefined, when ActionMenu renders, then it still returns null

## Definition of done
- Attribute rendered on the menu section
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-047.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-010
- Requirement: REQ-024
- Unit (Act): UNIT-047
- Unit (Verify): UNIT-050
- Status: completed
- Change: UPDATE
