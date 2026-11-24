# UNIT-155 — Act: Add getWorld client and show the World title in AdminApp

## Summary
Fetch the World and render its title in the heading

## Description
Add getWorld to the API client and use it in AdminApp to show the title.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: World, getWorld` · after L74
- **Do:** Add exported interface World {id: string; title: string} and exported async function getWorld(worldId: string = WORLD_ID) that fetches the public world endpoint and returns readJSON<World>(res), after getCurrentRound.

```
export interface World { id: string; title: string }
export async function getWorld(worldId: string = WORLD_ID): Promise<World> {
  const res = await fetch(`/api/v1/worlds/${encodeURIComponent(worldId)}`);
  return readJSON<World>(res);
}
```

- **Expected:** getWorld resolves with the parsed world and throws ApiError on non-2xx.

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp` · L14, L34, L40-L53, L134
- **Do:** Import getWorld from ../api/client; add state const [worldTitle, setWorldTitle] = useState<string | undefined>(undefined) after maxContributions state; in the first useEffect, also call getWorld(WORLD_ID).then(w => { if (!cancelled) setWorldTitle(w.title); }, () => {}) ; change the h1 to render Admin · {worldTitle ?? WORLD_ID}.

```
<h1>Admin · {worldTitle ?? WORLD_ID}</h1>
```

- **Expected:** Heading shows the title once loaded and WORLD_ID before or on failure.

## Acceptance criteria
- getWorld GETs /api/v1/worlds/{id} and returns {id,title}.
- AdminApp heading shows the title, falling back to WORLD_ID.

## Definition of done
- Type-checks; heading uses title
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-155.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-034
- Requirement: REQ-078
- Unit (Act): UNIT-155
- Unit (Verify): UNIT-158
- Status: completed
- Change: UPDATE
