# UNIT-275 — Act: Write the backend README and handoff doc for devion workseed

## Summary
Replace the placeholder README and add backend/docs/handoff.md

## Description
Rewrite backend/README.md, which currently holds the single line 'hello Worldseed', and create backend/docs/handoff.md describing the Export v1 format, taken from backend/internal/contribution/export.go and exporter.go.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/README.md` · `README body` · L1
- **Do:** Replace the line 'hello Worldseed' with a title, a paragraph saying the backend serves the game, contribution intake and round lifecycle, a sentence saying player contributions frozen at the end of a Round are handed off to devion workseed, which develops the game, and a link to docs/handoff.md.

```
# Worldseed backend

Worldseed keeps the game, the contribution intake and the round lifecycle. Frozen contributions are handed off to devion workseed, which develops the game. See [docs/handoff.md](docs/handoff.md).
```

- **Expected:** README names devion workseed and links to the handoff doc.

### Step 2 — `backend/docs/handoff.md` · `new: handoff document` · new
- **Do:** Create the doc. Describe Exporter.Export(ctx, worldID, roundID) in internal/contribution, which includes only contributions whose ids are frozen in the Round snapshot, in snapshot order, with an empty list when none exist. Include the version 1 JSON example with keys version, world_id, round_id and contributions[id, author, content, created_at as RFC 3339]. State that consumers check version first and that devion workseed is the consumer.
- **Expected:** The doc exists and matches the Export struct tags.

## Acceptance criteria
- Given the README, when it is read, then it names the kept parts and links to docs/handoff.md
- Given the handoff doc, when it is read, then it matches the Export JSON keys

## Definition of done
- Both files exist with the required content
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-275.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-055
- Requirement: REQ-138
- Unit (Act): UNIT-275
- Unit (Verify): UNIT-277
- Status: completed
- Change: UPDATE
