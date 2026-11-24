# UNIT-157 — Act: Disable the contribution-limit input with an explanatory note

## Summary
Max contributions input disabled; note added

## Description
No endpoint exists, so disable the input in AdminApp.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp (Max contributions label)` · L165-L172
- **Do:** Add the disabled attribute to the Max contributions per player input and add a <small> element after the label with text 'Set in server configuration (contribution.max_per_player); not editable here.' Keep the label text unchanged.

```
<input type="number" min={1} value={maxContributions} disabled onChange={...} />
<small>Set in server configuration (contribution.max_per_player); not editable here.</small>
```

- **Expected:** Input is disabled and note is rendered.

## Acceptance criteria
- Input has disabled attribute.
- Note text visible.

## Definition of done
- Type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-157.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-034
- Requirement: REQ-080
- Unit (Act): UNIT-157
- Unit (Verify): UNIT-160
- Status: completed
- Change: UPDATE
