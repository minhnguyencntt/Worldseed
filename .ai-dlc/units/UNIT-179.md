# UNIT-179 — Act: Add work root, max budget, auto-publish and provider kind fields with defaults

## Summary
Extend WorkerConfig and LoadFS defaults

## Description
Add four fields to WorkerConfig, default constants, default assignment in LoadFS and example YAML keys.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/config/config.go` · `const block` · L14-L23
- **Do:** Add constants defaultWorkRoot = ".storyforge/work", defaultMaxBudget = 5.0, defaultProviderKind = "mock" inside the existing const block.

```
defaultWorkRoot     = ".storyforge/work"
defaultMaxBudget    = 5.0
defaultProviderKind = "mock"
```

- **Expected:** Constants compile alongside the existing ones.

### Step 2 — `backend/worker/internal/config/config.go` · `WorkerConfig` · L33-L39
- **Do:** Append four fields after MaxRetries.

```
WorkRoot     string  `yaml:"work_root"`
MaxBudget    float64 `yaml:"max_budget"`
AutoPublish  bool    `yaml:"auto_publish"`
ProviderKind string  `yaml:"provider_kind"`
```

- **Expected:** yaml keys work_root, max_budget, auto_publish, provider_kind unmarshal into the struct.

### Step 3 — `backend/worker/internal/config/config.go` · `LoadFS` · L74-L89
- **Do:** After the MaxRetries default, set WorkRoot to defaultWorkRoot when empty, MaxBudget to defaultMaxBudget when 0, ProviderKind to defaultProviderKind when empty. AutoPublish stays as parsed (false default).

```
if cfg.Worker.WorkRoot == "" { cfg.Worker.WorkRoot = defaultWorkRoot }
if cfg.Worker.MaxBudget == 0 { cfg.Worker.MaxBudget = defaultMaxBudget }
if cfg.Worker.ProviderKind == "" { cfg.Worker.ProviderKind = defaultProviderKind }
```

- **Expected:** Omitted keys yield documented defaults.

### Step 4 — `backend/worker/configs/config.example.yaml` · `worker` · L1-L6
- **Do:** Append under worker: work_root, max_budget, auto_publish and provider_kind lines.

```
  work_root: ".storyforge/work"
  max_budget: 5
  auto_publish: false
  provider_kind: "mock"
```

- **Expected:** Example config lists all new keys with defaults.

## Acceptance criteria
- WorkerConfig has WorkRoot, MaxBudget, AutoPublish, ProviderKind with yaml tags
- LoadFS applies defaults for omitted keys

## Definition of done
- Fields and defaults implemented
- Example YAML lists new keys
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-179.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-037
- Requirement: REQ-090
- Unit (Act): UNIT-179
- Unit (Verify): UNIT-181
- Status: completed
- Change: UPDATE
