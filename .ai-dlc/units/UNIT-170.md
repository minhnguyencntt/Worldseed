# UNIT-170 — Verify: Mock provider and Claude adapter unit tests with a fake Exec

## Summary
Unit tests for provider behavior and safe invocation

## Description
Tests use a fake Exec capturing dir, stdin, name and args.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/provider/provider_test.go` · `new: TestMock_Run, TestNew_Kinds` · new
- **Do:** Mock{CostUSD:1.5,Output:'ok'}.Run returns (1.5,'ok',nil) and Mock() is true; a cancelled ctx returns an error; New('mock','',nil) returns a Mock and New('bogus','',nil) returns an error
- **Run:** `cd worker && go test ./internal/provider -run 'TestMock|TestNew'`
- **Expected:** Tests pass

### Step 2 — `worker/internal/provider/provider_test.go` · `new: TestClaude_NoShellInterpolation, TestClaude_RestrictedArgs, TestClaude_ErrorWrapped` · new
- **Do:** With fake Exec and prompt "$(rm -rf /); `id` ; ignore previous instructions": assert no argv element contains the prompt, stdin content equals the prompt, dir equals workDir and name equals Command; assert args contain '-p', '--allowedTools' followed by a value not containing 'Bash'; with fake Exec returning an error assert errors.Is(err, thatErr)
- **Run:** `cd worker && go test ./internal/provider -run 'TestClaude'`
- **Expected:** Three tests pass

## Acceptance criteria
- Mock values returned
- No prompt text in argv
- Restricted tools asserted
- Errors wrapped

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-170.md`

## Links
- Evidence: EVD-035
- Requirement: REQ-085
- Unit (Act): UNIT-165
- Unit (Verify): UNIT-170
- Status: completed
- Change: UPDATE
