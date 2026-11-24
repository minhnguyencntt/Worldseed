# UNIT-427 — Act: Add isIgnoredByDirRule helper for .gitignore directory rules

## Summary
Pure helper that tells whether a path is ignored by directory rules

## Description
Add game/frontend/src/lib/gitignore.ts exporting isIgnoredByDirRule(ignoreText, path) that returns true when some non-comment line ending in `/` without other slashes equals a path segment, and handles anchored rules (containing a slash) by prefix match.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/gitignore.ts` · `new: isIgnoredByDirRule` · new
- **Do:** Export isIgnoredByDirRule(ignoreText: string, path: string): boolean. Split into trimmed lines, skip empty and # lines. For each rule ending in '/', strip the trailing slash; if it has no '/', return true when the directory segments of the path include it; if it has a '/', return true when path starts with rule + '/'.

```
export function isIgnoredByDirRule(ignoreText: string, path: string): boolean { const dirs = path.split('/').slice(0, -1); for (const raw of ignoreText.split('\n')) { const line = raw.trim(); if (!line || line.startsWith('#') || !line.endsWith('/')) continue; const rule = line.slice(0, -1); if (rule.includes('/') ? path.startsWith(rule + '/') : dirs.includes(rule)) return true; } return false; }
```

- **Expected:** Function compiles and returns booleans per the criteria

## Acceptance criteria
- Given `node_modules/` and path a/b/node_modules/x, then true
- Given `game/node_modules/` and path game/frontend/node_modules/x, then false

## Definition of done
- Helper exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-427.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-086
- Requirement: REQ-214
- Unit (Act): UNIT-427
- Unit (Verify): UNIT-429
- Status: completed
- Change: UPDATE
