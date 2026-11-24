# UNIT-362 — Act: Implement loadManifestFile with on-disk reference check

## Summary
Add the manifest file loader.

## Description
Create game/src/assets/loaders/manifestLoader.ts exporting loadManifestFile.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `new: loadManifestFile` · new
- **Do:** Export loadManifestFile(manifestPath: string, assetsRoot: string): ParseResult<AssetManifest>. Wrap readFileSync and JSON.parse in try/catch returning {ok:false,errors:[{path:'manifest',message:`cannot read manifest: ${manifestPath}`}]}. Call parseManifest; if not ok return it. Then for each asset index i, if !existsSync(join(assetsRoot, asset.path)) push {path:`assets.${i}.path`, message:`missing asset file: ${asset.path}`}. Return {ok:false,errors} if any, else {ok:true,data}.

```
import { existsSync, readFileSync } from 'node:fs'; import { join } from 'node:path'; import { parseManifest, type ParseResult, type ManifestIssue, type AssetManifest } from '../manifest';
```

- **Expected:** Module compiles and exports loadManifestFile

## Acceptance criteria
- Given a valid manifest and files, when called, then returns ok with data
- Given a missing file or bad JSON, when called, then returns issues and does not throw

## Definition of done
- Loader exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-362.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-071
- Requirement: REQ-182
- Unit (Act): UNIT-362
- Unit (Verify): UNIT-365
- Status: completed
- Change: UPDATE
