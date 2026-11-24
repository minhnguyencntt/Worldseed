# UNIT-109 — Act: Add token-gated AdminApp with Round controls

## Summary
Admin client calls, TokenGate, AdminApp and hash route

## Description
Implement admin client functions taking a token, the TokenGate form, AdminApp round view and route selection by location.hash.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: adminRequest, getAdminRound, openRound, closeRound, listRoundContributions` · after getCurrentRound
- **Do:** Add adminRequest(token,path,init) adding header Authorization 'Bearer '+token to request; getAdminRound(token,id) GET /api/v1/admin/rounds/{id}?world=the-boys-room; openRound/closeRound POST .../{id}/open|close?world=the-boys-room; listRoundContributions(token,id) GET .../{id}/contributions?world=the-boys-room returning AdminContribution[] (Contribution plus prompt_hash)
- **Expected:** Each call carries the Bearer header

### Step 2 — `game/frontend/src/components/TokenGate.tsx` · `new: TokenGate` · new
- **Do:** Export TokenGate({onToken,error}) form with <input type='password' aria-label='Admin token'> and button 'Enter'; calls onToken(value) on submit and renders error text when set
- **Expected:** Form submits the typed token

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `new: AdminApp` · new
- **Do:** Export AdminApp with token state (memory only), roundId state initialised from getCurrentRound().id; when token is empty render TokenGate; else load getAdminRound and listRoundContributions, render heading with world 'the-boys-room', Round id/number/status, number inputs 'Duration (hours)' and 'Max contributions per player', buttons 'Open round' and 'Close round' calling openRound/closeRound then reloading, and a list named 'Contributions' of prompts; on ApiError 401 clear token and pass error 'Invalid token' to TokenGate
- **Expected:** Gate then console renders

### Step 4 — `game/frontend/src/main.tsx` · `render` · L10-L11
- **Do:** Replace render(<App />) with render(window.location.hash.startsWith('#/admin') ? <AdminApp /> : <App />) importing AdminApp

```
createRoot(rootEl).render(<App />) -> createRoot(rootEl).render(window.location.hash.startsWith('#/admin') ? <AdminApp /> : <App />)
```

- **Expected:** #/admin shows the admin console

## Acceptance criteria
- Admin calls send the Bearer header
- AdminApp renders gate until token set
- Route #/admin renders AdminApp

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-109.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-022
- Requirement: REQ-056
- Unit (Act): UNIT-109
- Unit (Verify): UNIT-114
- Status: completed
- Change: UPDATE
