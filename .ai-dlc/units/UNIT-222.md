# UNIT-222 — Act: Implement the labelled Mock agent

## Summary
Create mock.go with Mock.Run writing MOCK-EXECUTION.md

## Description
Create backend/worker/internal/provider/mock.go with type Mock and Run that honours ctx and writes the marker file.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/mock.go` · `new: Mock.Run` · new
- **Do:** Create package provider with type Mock struct{}, const MockMarkerFile = "MOCK-EXECUTION.md", method Name() string returning "mock" and method Run(ctx context.Context, workDir string) (float64, error). Run returns ctx.Err() when it is already non-nil, otherwise writes MockMarkerFile in workDir with os.WriteFile mode 0o644 and returns 0 and nil, wrapping a write failure as provider mock.

```
const mockNotice = "# MOCK EXECUTION\n\nThis run used the MOCK provider. No real development happened.\n"
```

- **Expected:** go build ./internal/provider succeeds and the file is written on Run

## Acceptance criteria
- Mock.Run writes MOCK-EXECUTION.md containing MOCK in workDir
- Mock.Run returns cost 0 and a nil error on success

## Definition of done
- package compiles with go build ./internal/provider
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-222.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-044
- Requirement: REQ-111
- Unit (Act): UNIT-222
- Unit (Verify): UNIT-225
- Status: completed
- Change: UPDATE
