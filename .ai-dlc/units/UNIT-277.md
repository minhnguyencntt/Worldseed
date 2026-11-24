# UNIT-277 — Verify: Docs name devion workseed, match the export keys and avoid removed terms

## Summary
Add a Go unit test that reads the docs and checks content against the Export type

## Description
Add a test that reads backend/README.md and backend/docs/handoff.md from the temp-free repo files and asserts content. No network or processes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/handoff_docs_test.go` · `new: TestHandoffDocs` · new
- **Do:** Add package contribution tests. TestHandoffDocs_ReadmeNamesWorkseed: read ../../README.md, assert it contains 'devion workseed'. TestHandoffDocs_KeysMatchExport: json.Marshal an Export holding one ExportContribution, unmarshal into map[string]any, collect the top-level keys and the keys of contributions[0], and assert handoff.md contains each. TestHandoffDocs_NoRemovedTerms: for both docs, assert the lowercased text contains none of 'worker', 'executionpanel', 'claude code', 'cursor'.
- **Run:** `cd backend && go test ./internal/contribution -run TestHandoffDocs`
- **Expected:** All three tests pass.

## Acceptance criteria
- Given the README, when read, then it contains 'devion workseed'
- Given the handoff doc, when read, then it contains every JSON key of Export and ExportContribution as encoded by json.Marshal
- Given both docs, when lowercased, then they contain none of 'worker', 'executionpanel', 'claude code', 'cursor'

## Definition of done
- The test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-277.md`

## Links
- Evidence: EVD-055
- Requirement: REQ-138
- Unit (Act): UNIT-275
- Unit (Verify): UNIT-277
- Status: completed
- Change: UPDATE
