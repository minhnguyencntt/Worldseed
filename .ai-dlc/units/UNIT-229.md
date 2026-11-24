# UNIT-229 — Act: Validate workDir in Claude.Run before executing

## Summary
Reject empty work directory without calling Exec

## Description
Add a guard at the top of Claude.Run using strings.TrimSpace.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude.go` · `import block` · L4-L7
- **Do:** Add the "strings" import to the import block.

```
import (
	"context"
	"fmt"
	"strings"
)
```

- **Expected:** strings is available.

### Step 2 — `backend/worker/internal/provider/claude.go` · `Claude.Run` · L33-L38
- **Do:** Insert a guard as the first statement of Run returning 0 and an error when strings.TrimSpace(workDir) is empty.

```
if strings.TrimSpace(workDir) == "" {
	return 0, fmt.Errorf("provider claude: work dir is empty")
}
```

- **Expected:** Empty workDir returns an error before Exec is called.

## Acceptance criteria
- Empty or whitespace workDir returns an error containing work dir
- Exec is not called in that case

## Definition of done
- Guard present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-229.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-045
- Requirement: REQ-115
- Unit (Act): UNIT-229
- Unit (Verify): UNIT-231
- Status: completed
- Change: UPDATE
