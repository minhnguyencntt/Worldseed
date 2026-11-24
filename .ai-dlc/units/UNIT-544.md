# UNIT-544 — Act: Confirm BootScene reads content only via the named content import

## Summary
BootScene content import stays mockable

## Description
BootScene.ts imports manifest, scene and sceneSpec as named imports from '../runtime/content', so a vi.mock of that module controls them. Confirm and keep it; no behavior change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene imports` · L9-L9
- **Do:** Confirm line 9 imports manifest, scene and sceneSpec as named imports from '../runtime/content' and leave it unchanged

```
import { manifest, scene, sceneSpec } from '../runtime/content';
```

- **Expected:** Line 9 is unchanged

## Acceptance criteria
- BootScene.ts imports content only from '../runtime/content'
- BootScene constructor stays zero-argument

## Definition of done
- Import line confirmed unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-544.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-110
- Requirement: REQ-272
- Unit (Act): UNIT-544
- Unit (Verify): UNIT-547
- Status: completed
- Change: UPDATE
