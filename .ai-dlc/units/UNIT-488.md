# UNIT-488 — Act: Add effectSchema and bedroom effects content

## Summary
Add effects to sceneSchema and author them in bedroom.yaml

## Description
Add effectSchema and an optional effects array to sceneSchema, export EffectSpec, and add dust, ambientLight and fade entries to bedroom.yaml.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `new: effectSchema` · after L8
- **Do:** Add a z.discriminatedUnion on 'type' with three variants: dust, ambientLight and transition

```
export const effectSchema = z.discriminatedUnion('type', [
 z.object({ type: z.literal('dust'), asset: z.string(), count: z.number().int().positive(), area: boundsSchema }),
 z.object({ type: z.literal('ambientLight'), color: z.string(), alpha: z.number().min(0).max(1) }),
 z.object({ type: z.literal('transition'), kind: z.literal('fade'), durationMs: z.number().int().nonnegative() }),
]);
```

- **Expected:** effectSchema parses the three variants

### Step 2 — `game/src/content/schema.ts` · `sceneSchema` · L37-L43
- **Do:** Add field `effects: z.array(effectSchema).optional(),` after objects, and export type EffectSpec = z.infer<typeof effectSchema>
- **Expected:** SceneSpec has optional effects

### Step 3 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `effects` · after objects list end
- **Do:** Append top-level `effects:` with dust (asset effect:dust, count 20, area {x:0,y:0,width:320,height:180}), ambientLight (color '#ffd9a0', alpha 0.15) and transition (kind fade, durationMs 400)
- **Expected:** File loads through the loader without errors

## Acceptance criteria
- effectSchema is exported and sceneSchema.effects is optional
- bedroom.yaml has one dust, one ambientLight and one fade effect

## Definition of done
- Scene content validates
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-488.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-098
- Requirement: REQ-244
- Unit (Act): UNIT-488
- Unit (Verify): UNIT-491
- Status: completed
- Change: UPDATE
