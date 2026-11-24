# UNIT-422 — Act: Ignore node_modules at any depth and untrack it

## Summary
Edit .gitignore and git rm --cached node_modules

## Description
Add node_modules/ to .gitignore and remove tracked node_modules from the index, keeping files on disk.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `.gitignore` · `ignore rules` · after L9
- **Do:** Append the line node_modules/ after game/node_modules/ so node_modules at any depth is ignored.

```
game/node_modules/
node_modules/
```

- **Expected:** git check-ignore game/frontend/node_modules/phaser/README.md prints the path

### Step 2 — `.gitignore` · `git index` · L1-L10
- **Do:** Run git rm -r --cached -q game/frontend/node_modules to untrack vendored files while leaving them on disk, resolving the UU vitest results.json conflict.

```
git rm -r --cached -q --ignore-unmatch game/frontend/node_modules
```

- **Run:** `git rm -r --cached -q --ignore-unmatch game/frontend/node_modules`
- **Expected:** git ls-files | grep node_modules prints nothing

## Acceptance criteria
- Given .gitignore, then a node_modules/ line exists
- Given the index, then no node_modules path is tracked

## Definition of done
- node_modules/ ignored; git ls-files has no node_modules paths
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-422.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-085
- Requirement: REQ-211
- Unit (Act): UNIT-422
- Unit (Verify): UNIT-424
- Status: completed
- Change: UPDATE
