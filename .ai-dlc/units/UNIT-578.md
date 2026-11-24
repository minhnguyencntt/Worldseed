# UNIT-578 — Act: Add characters schema, animation resolver and Phaser character rendering

## Summary
Data-driven characters rendered and animated in BootScene

## Description
Add characters to sceneSchema and SceneDef, a pure resolver, preload of character spritesheets and Phaser sprites in BootScene driven by yaml.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `new: characterSchema, sceneSchema.characters` · after L33
- **Do:** Add characterSchema with id, name, position {x,y}, scale default 1, layer default 'characters', animations record with required idle and optional walk and interact, each {asset: string, animation: string}; add optional characters array to sceneSchema; export CharacterSpec type.

```
export const characterSchema = z.object({ id: z.string(), name: z.string(), position: z.object({x:z.number(),y:z.number()}), scale: z.number().positive().default(1), layer: layerSchema.default('characters'), animations: z.object({ idle: animRef, walk: animRef.optional(), interact: animRef.optional() }) })
```

- **Expected:** sceneSchema.parse accepts a characters list and rejects missing idle

### Step 2 — `game/src/state/types.ts` · `SceneDef` · L57-L65
- **Do:** Add optional field characters?: CharacterSpec[] (import type from ../content/schema) to SceneDef.

```
characters?: CharacterSpec[];
```

- **Expected:** tsc accepts scene.characters

### Step 3 — `game/src/engine/characterAnimation.ts` · `new: resolveCharacterAnimation` · new
- **Do:** Export resolveCharacterAnimation(spec: CharacterSpec, name: 'idle'|'walk'|'interact', manifest: AssetManifest): {asset: string; animation: string}. Use spec.animations[name]; if absent, or its asset is missing from manifest.assets or lacks that animation in asset.animations, return spec.animations.idle.
- **Expected:** Returns idle ref for missing or unknown entries

### Step 4 — `game/src/engine/planPreload.ts` · `planPreload` · L6-L9
- **Do:** After the objects loop add a loop over scene.characters ?? [] adding every animations.*.asset id to refs.

```
for (const c of scene.characters ?? []) for (const a of Object.values(c.animations)) if (a) refs.add(a.asset)
```

- **Expected:** load includes character:boy, character:boy-walk, character:boy-interact

### Step 5 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload and BootScene.create` · L38-L69
- **Do:** In preload, for entries of type spritesheet call this.load.spritesheet(entry.id, `assets/${entry.path}`, {frameWidth: entry.frames.frameWidth, frameHeight: entry.frames.frameHeight}). In create, for each scene.characters entry register anims via this.anims.create keyed `${asset}:${animation}` from the manifest animation, add a sprite at position with origin from the manifest, play the idle key, and in the objectClick handler play interact then idle on animationcomplete.
- **Expected:** Boy sprite idles and plays interact on click

### Step 6 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `characters` · after L10
- **Do:** Add a characters list with id boy, name The Boy, position {x:150,y:140}, animations idle {asset: character:boy, animation: idle}, walk {asset: character:boy-walk, animation: walk}, interact {asset: character:boy-interact, animation: interact}.
- **Expected:** Scene parses with one character

## Acceptance criteria
- sceneSchema accepts characters with required animations.idle
- resolveCharacterAnimation returns manifest animation or idle fallback
- BootScene creates sprites for each character and plays idle then interact on objectClick

## Definition of done
- Boy defined in bedroom.yaml and animates in BootScene
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-578.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-116
- Requirement: REQ-289
- Unit (Act): UNIT-578
- Unit (Verify): UNIT-582
- Status: completed
- Change: UPDATE
