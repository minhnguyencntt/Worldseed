# UNIT-180 — Act: Validate execution timeout, retries, budget and provider kind in LoadFS

## Summary
Add validate function rejecting invalid values

## Description
Add a validate(cfg *Config) error helper checking execution_timeout, max_retries, max_budget and provider_kind, called at the end of LoadFS.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/config/config.go` · `new: validate` · after L110
- **Do:** Add func validate(cfg *Config) error returning fmt.Errorf errors that name worker.execution_timeout (<0), worker.max_retries (<0), worker.max_budget (<0) and worker.provider_kind (not mock or claude).

```
func validate(cfg *Config) error {
	w := cfg.Worker
	if w.ExecutionTimeout < 0 { return errors.New("config: worker.execution_timeout must not be negative") }
	if w.MaxRetries < 0 { return errors.New("config: worker.max_retries must not be negative") }
	if w.MaxBudget < 0 { return errors.New("config: worker.max_budget must not be negative") }
	if w.ProviderKind != "mock" && w.ProviderKind != "claude" { return fmt.Errorf("config: worker.provider_kind %q must be mock or claude", w.ProviderKind) }
	return nil
}
```

- **Expected:** Function compiles.

### Step 2 — `backend/worker/internal/config/config.go` · `LoadFS` · L74-L92
- **Do:** Before `return &cfg, nil` call validate(&cfg) and return nil, err when it fails.

```
if err := validate(&cfg); err != nil {
	return nil, err
}
```

- **Expected:** Invalid configs return nil config and a key-naming error.

## Acceptance criteria
- Negative timeout, retries, budget and unknown provider return key-naming errors
- Valid values return no error

## Definition of done
- validate wired into LoadFS
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-180.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-037
- Requirement: REQ-091
- Unit (Act): UNIT-180
- Unit (Verify): UNIT-182
- Status: completed
- Change: UPDATE
