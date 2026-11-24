# UNIT-108 — Act: Add Countdown, RoundBadge and Round fetch in App

## Summary
Countdown and badge components with getCurrentRound

## Description
Add getCurrentRound to the client, Countdown and RoundBadge components, and wire them into App using the fetched Round.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: RoundInfo, getCurrentRound` · after submitContribution
- **Do:** Export interface RoundInfo {id:string;number:number;status:string;starts_at:string;ends_at:string} and getCurrentRound() GETting /api/v1/worlds/the-boys-room/round/current via request
- **Expected:** Returns RoundInfo or throws ApiError

### Step 2 — `game/frontend/src/components/Countdown.tsx` · `new: Countdown, formatRemaining` · new
- **Do:** Export formatRemaining(ms) returning 'HH:MM:SS' zero-padded or 'Round closed' when ms<=0; Countdown({endsAt, now=()=>Date.now()}) uses useState/useEffect with setInterval 1000 and clears it on unmount, rendering <time role='timer'>
- **Expected:** Timer text updates each second

### Step 3 — `game/frontend/src/components/RoundBadge.tsx` · `new: RoundBadge` · new
- **Do:** Export RoundBadge({status}) rendering <span className='round-badge' data-status={status}>{status ?? 'Round unavailable'}</span>
- **Expected:** Badge shows the status or fallback

### Step 4 — `game/frontend/src/App.tsx` · `App` · L10-L47
- **Do:** Add useState round and useEffect calling getCurrentRound().then(setRound).catch(()=>setRound(undefined)); render <RoundBadge status={round?.status}/> and, when round exists, <Countdown endsAt={round.ends_at}/> above SceneView
- **Expected:** Playing view shows badge and countdown

## Acceptance criteria
- Countdown formats HH:MM:SS from an injectable clock
- Badge renders status text
- App passes round.id to ContributionSheet

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-108.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-022
- Requirement: REQ-055
- Unit (Act): UNIT-108
- Unit (Verify): UNIT-113
- Status: completed
- Change: UPDATE
