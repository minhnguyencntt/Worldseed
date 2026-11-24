# UNIT-377 — Verify: ambient-room.wav resolves and has a RIFF header unit tests

## Summary
Unit tests for the audio manifest path

## Description
Add game/tests/publicAssetAudio.test.ts that reads the manifest and the WAV read-only and asserts existence, non-empty size and RIFF/WAVE header.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/publicAssetAudio.test.ts` · `new: describe('the-boys-room audio asset')` · new
- **Do:** Find the manifest asset with id audio:ambient-room. Add it('file exists and is non-empty') using statSync(join(root, asset.path)).size > 0; it('has RIFF WAVE header') reading the buffer and asserting toString('ascii',0,4)==='RIFF' and toString('ascii',8,12)==='WAVE'.
- **Run:** `cd game && npx vitest run tests/publicAssetAudio.test.ts`
- **Expected:** Two tests pass.

## Acceptance criteria
- WAV path exists and is non-empty
- First 12 bytes are RIFF....WAVE

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-377.md`

## Links
- Evidence: EVD-074
- Requirement: REQ-188
- Unit (Act): UNIT-375
- Unit (Verify): UNIT-377
- Status: completed
- Change: UPDATE
