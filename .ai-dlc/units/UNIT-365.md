# UNIT-365 — Verify: Manifest loader missing-file and malformed-input unit tests

## Summary
Unit tests for loadManifestFile using temp dirs.

## Description
Test loadManifestFile with temporary directories so no real asset tree is needed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestLoader.test.ts` · `new: describe('loadManifestFile')` · new
- **Do:** In a mkdtempSync dir write manifest.json with one image asset (path 'a.svg', 10x10) and assert ok:false with path 'assets.0.path' before creating a.svg; create a.svg and assert ok:true; assert a nonexistent manifest path and a file containing 'not json' return ok:false with path 'manifest' and expect(() => ...).not.toThrow().

```
expect(loadManifestFile(join(dir,'manifest.json'), dir)).toMatchObject({ ok: false });
```

- **Run:** `cd game && npx vitest run tests/manifestLoader.test.ts`
- **Expected:** All 4 cases pass

## Acceptance criteria
- Given all files present, when loaded, then ok true
- Given a missing file, when loaded, then an issue at assets.0.path
- Given absent or invalid JSON, when loaded, then ok false without throwing

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-365.md`

## Links
- Evidence: EVD-071
- Requirement: REQ-182
- Unit (Act): UNIT-362
- Unit (Verify): UNIT-365
- Status: completed
- Change: UPDATE
