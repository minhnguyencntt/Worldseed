# UNIT-456 — Act: Dedupe and strip stage prefixes in parseGitLsFiles

## Summary
Update parseGitLsFiles to return unique bare paths.

## Description
Modify parseGitLsFiles in trackedNodeModules.ts so conflict stage entries collapse to one path.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `parseGitLsFiles` · L5-L7
- **Do:** Replace the body: split output on '\0', also split each chunk on '\n', strip a leading '<mode> <sha> <stage>\t' prefix with a regex, drop empty strings and return the unique paths via a Set preserving first-seen order.

```
return [...new Set(output.split('\0').flatMap((c) => c.split('\n')).map((l) => l.replace(/^\d{6} [0-9a-f]+ [0-3]\t/, '')).filter((p) => p.length > 0))];
```

- **Expected:** Duplicated and stage-prefixed entries collapse to one bare path each.

## Acceptance criteria
- parseGitLsFiles returns each path once for stage 1-3 duplicates.
- Stage-prefixed lines yield the bare path.

## Definition of done
- Implementation merged; npx tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-456.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-092
- Requirement: REQ-228
- Unit (Act): UNIT-456
- Unit (Verify): UNIT-458
- Status: completed
- Change: UPDATE
