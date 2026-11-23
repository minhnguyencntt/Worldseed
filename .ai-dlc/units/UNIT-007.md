# UNIT-007 — Verify: Backend config LoadFS and healthz unit tests

## Summary
Add Go unit tests for LoadFS via fstest.MapFS and NewRouter healthz via httptest.

## Description
Context: ACT-BE added LoadFS and NewRouter without tests.
Desired behavior: Unit-test config decoding and /healthz with MapFS and httptest; no live server Listen.
Expected result: go test filtered to LoadFS and NewRouter tests passes.
Why: Proves REQ-BE config and wiring ACs with mocked FS/HTTP.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `config_test.go` · `new: TestLoadFS_Success` · new
- **Do:** Create TestLoadFS_Success using fstest.MapFS with file config.yaml content matching example (server.addr :8080, git.repo_path .); assert LoadFS returns nil error and those field values. Create TestLoadFS_MissingAddr with YAML missing addr; assert error != nil. Package main.

```
package main

import (
  "testing"
  "testing/fstest"
)

func TestLoadFS_Success(t *testing.T) {
  fsys := fstest.MapFS{
    "config.yaml": &fstest.MapFile{Data: []byte("server:\n  addr: \":8080\"\ngit:\n  repo_path: \".\"\n")},
  }
  cfg, err := LoadFS(fsys, "config.yaml")
  if err != nil {
    t.Fatalf("LoadFS: %v", err)
  }
  if cfg.Server.Addr != ":8080" || cfg.Git.RepoPath != "." {
    t.Fatalf("unexpected cfg: %+v", cfg)
  }
}

func TestLoadFS_MissingAddr(t *testing.T) {
  fsys := fstest.MapFS{
    "config.yaml": &fstest.MapFile{Data: []byte("server: {}\ngit:\n  repo_path: \".\"\n")},
  }
  if _, err := LoadFS(fsys, "config.yaml"); err == nil {
    t.Fatal("expected error for missing server.addr")
  }
}
```

- **Run:** `go test . -run 'TestLoadFS_' -count=1`
- **Expected:** TestLoadFS_Success and TestLoadFS_MissingAddr pass.

### Step 2 — `router_test.go` · `new: TestNewRouter_Healthz` · new
- **Do:** Create TestNewRouter_Healthz that does httptest.NewRequest GET /healthz, serves via NewRouter, asserts status 200 and body ok. Package main.

```
package main

import (
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestNewRouter_Healthz(t *testing.T) {
  req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
  rec := httptest.NewRecorder()
  NewRouter().ServeHTTP(rec, req)
  if rec.Code != http.StatusOK {
    t.Fatalf("status=%d", rec.Code)
  }
  if rec.Body.String() != "ok" {
    t.Fatalf("body=%q", rec.Body.String())
  }
}
```

- **Run:** `go test . -run TestNewRouter_Healthz -count=1`
- **Expected:** TestNewRouter_Healthz passes without listening on a real port.

## Acceptance criteria
- Given MapFS containing valid YAML, when LoadFS reads config.yaml, then Addr is :8080 and RepoPath is .
- Given MapFS missing server.addr, when LoadFS runs, then it returns a non-nil error.
- Given NewRouter, when httptest GET /healthz, then status is 200 and body is ok.

## Definition of done
- Unit tests exist and filtered go test commands pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-007.md`

## Links
- Evidence: EVD-002
- Requirement: REQ-003
- Unit (Act): UNIT-003
- Unit (Verify): UNIT-007
- Status: completed
- Change: UPDATE
