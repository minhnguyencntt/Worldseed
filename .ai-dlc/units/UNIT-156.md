# UNIT-156 — Act: Add createRound client and Create round button sending the duration

## Summary
Post duration in hours to the admin create endpoint

## Description
Add createRound and a button in AdminApp using durationHours.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: createRound` · after L99
- **Do:** Add exported createRound(token, durationHours) that calls adminRequest<Round>(token, '/api/v1/admin/rounds', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({world_id: WORLD_ID, duration: `${durationHours}h`})}), placed after closeRound.

```
export function createRound(token: string, durationHours: number): Promise<Round> {
  return adminRequest<Round>(token, '/api/v1/admin/rounds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ world_id: WORLD_ID, duration: `${durationHours}h` }),
  });
}
```

- **Expected:** Calling it POSTs the expected JSON with the Bearer header.

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp` · after L94-L102, L172-L180
- **Do:** Import createRound; add async function handleCreateRound() that try { const created = await createRound(token, durationHours); setRoundId(created.id); setReloads(n => n + 1); } catch (err) { handleError(err); }; add <button type="button" onClick={handleCreateRound}>Create round</button> before the Open round button.
- **Expected:** Clicking Create round sends the POST with the entered hours.

## Acceptance criteria
- createRound POSTs world_id and duration to /api/v1/admin/rounds.
- Button triggers it, reloads current round, 401 returns to gate.

## Definition of done
- Type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-156.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-034
- Requirement: REQ-079
- Unit (Act): UNIT-156
- Unit (Verify): UNIT-159
- Status: completed
- Change: UPDATE
