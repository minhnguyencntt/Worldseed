# UNIT-674 — Act: Guard every history effect update with the cancelled flag

## Summary
Skip status and entries writes after cleanup in then and catch

## Description
Ensure both promise branches return early when cancelled is true.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history effect .then` · L48-L59
- **Do:** Keep the existing if (cancelled) return; as the first line so neither setEntries nor setHistoryStatus('ready') run after cleanup.
- **Expected:** Resolve path guarded

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet history effect .catch` · L60-L62
- **Do:** Make the catch callback start with if (cancelled) return; before setHistoryStatus('error').

```
.catch(() => { if (cancelled) return; setHistoryStatus('error'); })
```

- **Expected:** Reject path guarded

## Acceptance criteria
- No writes after cleanup on resolve
- No writes after cleanup on reject

## Definition of done
- Both branches guarded
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-674.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-135
- Requirement: REQ-338
- Unit (Act): UNIT-674
- Unit (Verify): UNIT-677
- Status: completed
- Change: UPDATE
