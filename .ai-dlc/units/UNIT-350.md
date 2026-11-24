# UNIT-350 — Act: Add parseManifest validators and index exports

## Summary
Create validate.ts and index.ts

## Description
Implement non-throwing validators using the schemas and export the public API.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/manifest/validate.ts` · `new: parseManifest, parseAsset` · new
- **Do:** Import manifestSchema, assetSchema and types from ./schema. Export type ValidationResult<T> = {ok:true;data:T}|{ok:false;errors:string[]}. parseAsset(input: unknown) uses assetSchema.safeParse and maps issues to `${issue.path.join('.')}: ${issue.message}`. parseManifest(input: unknown) uses manifestSchema.safeParse, same mapping, then on success collects duplicate asset ids and returns ok:false with error `duplicate asset id: <id>` for each
- **Expected:** Functions never throw for any input

### Step 2 — `game/src/assets/manifest/index.ts` · `new: barrel` · new
- **Do:** Re-export everything from ./schema and ./validate with export * statements

```
export * from './schema';
export * from './validate';
```

- **Expected:** Importing game/src/assets/manifest exposes schemas, types and validators

## Acceptance criteria
- parseManifest returns {ok:true,data} or {ok:false,errors}
- Duplicate asset ids are reported in the errors list

## Definition of done
- Compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-350.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-069
- Requirement: REQ-176
- Unit (Act): UNIT-350
- Unit (Verify): UNIT-353
- Status: completed
- Change: UPDATE
