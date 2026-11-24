# UNIT-025 — Act: Port strict field validation into loader.ts loadWorld

## Summary
Replace the unchecked cast in loader.ts loadWorld with world.ts's checked parsing, keeping scenes as an array.

## Description
Context: loader.ts L10-L25 reads world.yaml and scenes with plain casts. Desired behavior: reuse world.ts helpers isRecord, requireString and requireStringArray and its scene id mismatch check. Expected result: loadWorld throws descriptive errors for malformed content and returns scenes as SceneDef[].

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/src/content/loader.ts` · `new: isRecord, requireString, requireStringArray` · after L9
- **Do:** Add three private helper functions above loadWorld, copied from world.ts L25-L43: isRecord(value), requireString(data, key, file), requireStringArray(data, key, file), each throwing Error with the messages `${file} missing string field: ${key}` and `${file} field must be a list of strings: ${key}`.

```
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value); }
```

- **Expected:** File compiles with the three helpers available.

### Step 2 — `backend/game/src/content/loader.ts` · `readYaml` · L11-L13
- **Do:** Wrap fs.readFileSync in try/catch and throw new Error(`missing content file: ${file}`) on failure, so the message contains the file name such as s2.yaml.

```
before: return parse(fs.readFileSync(file, 'utf8')); -> after: let source: string; try { source = fs.readFileSync(file, 'utf8'); } catch { throw new Error(`missing content file: ${file}`); } return parse(source);
```

- **Expected:** Reading a nonexistent file throws an error containing the path.

### Step 3 — `backend/game/src/content/loader.ts` · `loadWorld` · L15-L28
- **Do:** Rewrite the body: read world.yaml into raw, throw if !isRecord(raw), throw 'world.yaml field must be a list: characters' if raw.characters is not an array, build world: WorldDef via requireString for id, title, startScene and requireStringArray for scenes and flags. For each sceneId read scenes/<sceneId>.yaml, require isRecord, require id via requireString, throw `${relPath} declares id ${id}, expected ${sceneId}` on mismatch, push the record cast as SceneDef onto an array. Remove the existsSync check. Return { ...world, scenes } where scenes stays SceneDef[].

```
const scenes: SceneDef[] = []; for (const sceneId of world.scenes) { const relPath = path.join('scenes', `${sceneId}.yaml`); const sceneRaw = readYaml(path.join(worldDir, relPath)); if (!isRecord(sceneRaw)) throw new Error(`${relPath} must be a YAML mapping`); const id = requireString(sceneRaw, 'id', relPath); if (id !== sceneId) throw new Error(`${relPath} declares id ${id}, expected ${sceneId}`); scenes.push(sceneRaw as unknown as SceneDef); }
```

- **Expected:** loadWorld('content/worlds/the-boys-room') returns scenes array containing bedroom.

## Acceptance criteria
- loadWorld throws when world.yaml lacks a string id, title or startScene
- loadWorld throws naming the missing file, such as s2.yaml, when a listed scene file is absent
- loadWorld throws when a scene file's id differs from the listed id
- loadWorld returns LoadedWorld whose scenes is an array in world.yaml order

## Definition of done
- npm run typecheck passes in backend/game
- loadWorld on the-boys-room still succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-025.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-005
- Requirement: REQ-013
- Unit (Act): UNIT-025
- Unit (Verify): UNIT-027
- Status: completed
- Change: UPDATE
