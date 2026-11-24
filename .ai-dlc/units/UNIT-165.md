# UNIT-165 — Act: Implement the mock provider and Claude Code CLI adapter

## Summary
Add provider.Provider, Mock and Claude with injectable Exec

## Description
Implement provider package with no tests.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/provider/provider.go` · `new: Provider, Mock, New` · new
- **Do:** Define Provider interface{Run(ctx context.Context, workDir, prompt string) (float64, string, error)}. Mock{CostUSD float64; Output string; Err error} implements Run returning those values after checking ctx.Err(), plus Mock() bool true method. New(kind, command string, args []string) (Provider, error) returns Mock for 'mock', *Claude for 'claude' and an error for other kinds
- **Expected:** New('mock',...) returns a Mock

### Step 2 — `worker/internal/provider/claude.go` · `new: Claude, Exec, Claude.Run` · new
- **Do:** Define Exec func(ctx context.Context, dir string, stdin io.Reader, name string, args ...string) ([]byte, error) with a default using exec.CommandContext(ctx,name,args...), cmd.Dir=dir, cmd.Stdin=stdin, cmd.Env limited to PATH, HOME. Claude{Command string; ExtraArgs []string; Exec Exec}. Run builds args = ['-p','--output-format','json','--allowedTools','Read,Edit,Write,Glob,Grep','--permission-mode','acceptEdits'] + ExtraArgs, calls Exec with strings.NewReader(prompt), wraps errors with fmt.Errorf('provider: claude: %w', err), truncates output to 1 MiB and returns cost 0

```
args := []string{"-p", "--output-format", "json", "--allowedTools", "Read,Edit,Write,Glob,Grep", "--permission-mode", "acceptEdits"}
```

- **Expected:** Prompt appears only on stdin

## Acceptance criteria
- Mock and Claude implement Run(ctx, workDir, prompt)
- Claude never puts prompt text into argv

## Definition of done
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-165.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-035
- Requirement: REQ-085
- Unit (Act): UNIT-165
- Unit (Verify): UNIT-170
- Status: completed
- Change: UPDATE
