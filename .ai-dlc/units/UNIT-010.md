# UNIT-010 — Verify: GitOps layout validator and round seed YAML unit tests

## Summary
Add Go tests for ValidateLayout and ROUND-0000001 YAML seed fields using MapFS fixtures.

## Description
Context: ACT-GITOPS added ValidateLayout and seed YAML without tests.
Desired behavior: Unit-test layout success/failure with MapFS; unit-test round seed decoding from a fixture that mirrors round.yaml contract.
Expected result: Filtered go test for layout/round seed passes without reading the real repository disk.
Why: Proves REQ-GITOPS path and ROUND-0000001 seed ACs with mocked FS.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `layout_test.go` · `new: TestValidateLayout_OK` · new
- **Do:** Create TestValidateLayout_OK with MapFS entries for each RequiredPaths key (empty file bodies ok); assert ValidateLayout returns nil. Create TestValidateLayout_MissingRound that omits round.yaml; assert error string contains missing required path and round.yaml. Package main.

```
package main

import (
  "strings"
  "testing"
  "testing/fstest"
)

func TestValidateLayout_OK(t *testing.T) {
  fsys := fstest.MapFS{}
  for _, p := range RequiredPaths {
    fsys[p] = &fstest.MapFile{Data: []byte("x: 1\n")}
  }
  if err := ValidateLayout(fsys); err != nil {
    t.Fatalf("ValidateLayout: %v", err)
  }
}

func TestValidateLayout_MissingRound(t *testing.T) {
  fsys := fstest.MapFS{
    "world.yaml":           &fstest.MapFile{Data: []byte("id: the-boys-room\n")},
    "current-release.yaml": &fstest.MapFile{Data: []byte("version: \"1.0.0\"\n")},
  }
  err := ValidateLayout(fsys)
  if err == nil {
    t.Fatal("expected missing path error")
  }
  if !strings.Contains(err.Error(), "missing required path") || !strings.Contains(err.Error(), "round.yaml") {
    t.Fatalf("unexpected err: %v", err)
  }
}
```

- **Run:** `go test . -run 'TestValidateLayout_' -count=1`
- **Expected:** ValidateLayout success and missing-path unit tests pass.

### Step 2 — `layout_test.go` · `new: TestRoundSeedFixture_Fields` · after TestValidateLayout_MissingRound
- **Do:** In the same test file, add TestRoundSeedFixture_Fields that yaml-decodes a ROUND_YAML fixture mirroring round.yaml contract into a local struct with fields Id, Number, Status, DurationHours, MaxContributionsPerPlayer, BaseRelease and asserts ROUND-0000001 / 1 / OPEN / 24 / 5 / 1.0.0. Import gopkg.in/yaml.v3 in the test.

```
package main

import (
  "strings"
  "testing"
  "testing/fstest"

  "gopkg.in/yaml.v3"
)

// ... existing TestValidateLayout_* tests remain ...

type roundSeed struct {
  Id                        string `yaml:"id"`
  Number                    int    `yaml:"number"`
  Status                    string `yaml:"status"`
  DurationHours             int    `yaml:"duration_hours"`
  MaxContributionsPerPlayer int    `yaml:"max_contributions_per_player"`
  BaseRelease               string `yaml:"base_release"`
}

func TestRoundSeedFixture_Fields(t *testing.T) {
  const ROUND_YAML = "id: ROUND-0000001\nnumber: 1\nstatus: OPEN\nduration_hours: 24\nmax_contributions_per_player: 5\nbase_release: \"1.0.0\"\n"
  var seed roundSeed
  if err := yaml.Unmarshal([]byte(ROUND_YAML), &seed); err != nil {
    t.Fatalf("yaml: %v", err)
  }
  if seed.Id != "ROUND-0000001" || seed.Number != 1 || seed.Status != "OPEN" || seed.DurationHours != 24 || seed.MaxContributionsPerPlayer != 5 || seed.BaseRelease != "1.0.0" {
    t.Fatalf("unexpected seed: %+v", seed)
  }
}
```

- **Run:** `go test . -run TestRoundSeedFixture_Fields -count=1`
- **Expected:** ROUND-0000001 seed field unit test passes against the round.yaml contract fixture.

## Acceptance criteria
- Given MapFS containing all RequiredPaths, when ValidateLayout runs, then error is nil.
- Given MapFS missing round.yaml, when ValidateLayout runs, then error message contains missing required path and round.yaml.
- Given fixture YAML mirroring round.yaml contract, when decoded into a RoundSeed struct in the test file, then id/number/status/duration/max/base_release match OPEN seed values.

## Definition of done
- layout_test.go covers success, missing path, and round seed field assertions
- Filtered go test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-010.md`

## Links
- Evidence: EVD-002
- Requirement: REQ-001
- Unit (Act): UNIT-006
- Unit (Verify): UNIT-010
- Status: completed
- Change: UPDATE
