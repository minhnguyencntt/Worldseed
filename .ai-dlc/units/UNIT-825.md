# UNIT-825 — Act: Render moonlight shaft, lamp glow, door light and vignette in the Phaser effect context

## Summary
Add four cases to createPhaserEffectContext

## Description
Implement the new cases with Phaser 3.90 game objects at spec.depth and destroy handles removing all created objects.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `new: parseColor` · after L7
- **Do:** Add a module-level helper parseColor(hex: string): number returning parseInt(hex.slice(1), 16), and use it in the ambientLight case too.

```
const parseColor = (hex: string): number => parseInt(hex.slice(1), 16);
```

- **Expected:** ambientLight still passes the same numeric colour

### Step 2 — `game/frontend/src/phaser/effectContext.ts` · `createEffect cases moonlightShaft and doorLight` · before the transition case (~L56)
- **Do:** Add case 'moonlightShaft' and case 'doorLight': each adds scene.add.rectangle(area.x, area.y, area.width, area.height, parseColor(spec.color), spec.alpha).setOrigin(0).setDepth(spec.depth).setBlendMode('ADD') and returns { destroy: () => rect.destroy() }.
- **Expected:** Each case returns a handle whose destroy destroys one rectangle

### Step 3 — `game/frontend/src/phaser/effectContext.ts` · `createEffect case lampGlow` · before the transition case
- **Do:** Add case 'lampGlow': scene.add.circle(spec.x, spec.y, spec.radius, parseColor(spec.color), spec.alpha).setDepth(spec.depth).setBlendMode('ADD'); destroy destroys the circle.
- **Expected:** A circle is added at depth spec.depth

### Step 4 — `game/frontend/src/phaser/effectContext.ts` · `createEffect case vignette` · before the transition case
- **Do:** Add case 'vignette': for each lineWidth in [24, 16, 8] create scene.add.rectangle(w/2, h/2, w, h) with w=scene.scale.width, h=scene.scale.height, then .setStrokeStyle(lineWidth, parseColor(spec.color), spec.alpha / 3).setDepth(spec.depth); collect in an array; destroy destroys all.

```
const bands = [24, 16, 8].map((lw) => scene.add.rectangle(w / 2, h / 2, w, h).setStrokeStyle(lw, parseColor(spec.color), spec.alpha / 3).setDepth(spec.depth));
return { destroy: () => bands.forEach((b) => b.destroy()) };
```

- **Expected:** Three bands created and all destroyed together

## Acceptance criteria
- Each new case sets depth to spec.depth
- Vignette destroy removes all bands

## Definition of done
- Switch exhaustive and typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-825.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-167
- Requirement: REQ-413
- Unit (Act): UNIT-825
- Unit (Verify): UNIT-828
- Status: completed
- Change: UPDATE
