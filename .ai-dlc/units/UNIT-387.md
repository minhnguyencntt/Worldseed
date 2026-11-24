# UNIT-387 — Act: Validate frame counts and animation frames in assetSchema

## Summary
Extend superRefine in schema.ts

## Description
Add dimension and animation index checks to the spritesheet superRefine.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/manifest/schema.ts` · `assetSchema.superRefine` · L41-L58
- **Do:** After the existing frames/dimensions checks, add: when both asset.frames and asset.dimensions are defined, if frames.frameWidth*frames.frameCount > dimensions.width add an issue at path ['frames','frameCount'] message 'frameCount exceeds sheet width'; if frames.frameHeight > dimensions.height add an issue at ['frames','frameHeight'] message 'frameHeight exceeds sheet height'; then for each [name, anim] of Object.entries(asset.animations ?? {}) if any frame >= frames.frameCount add an issue at ['animations', name, 'frames'] message 'animation frame out of range'. Also apply the animation check when type is not spritesheet is unnecessary; keep it spritesheet-only.

```
if (asset.frames && asset.dimensions && asset.frames.frameWidth * asset.frames.frameCount > asset.dimensions.width) { ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['frames','frameCount'], message: 'frameCount exceeds sheet width' }); }
```

- **Expected:** Invalid sheets produce path-named issues; valid ones unchanged

## Acceptance criteria
- Over-wide frame counts are reported
- Out-of-range animation frames are reported

## Definition of done
- Checks implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-387.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-077
- Requirement: REQ-195
- Unit (Act): UNIT-387
- Unit (Verify): UNIT-392
- Status: completed
- Change: UPDATE
