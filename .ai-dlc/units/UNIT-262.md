# UNIT-262 — Act: Implement FileStore.FrozenIDs

## Summary
Add FrozenIDs reading snapshot.yaml in store.go

## Description
Add FrozenIDs to FileStore in backend/internal/contribution/store.go next to ListByRound.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/store.go` · `FileStore.FrozenIDs` · after L169
- **Do:** Add method FrozenIDs(_ context.Context, worldID, roundID string) ([]string, error): validate worldID and roundID with safepath.Segment (wrap errors as 'contribution: world id: %w' / 'contribution: round id: %w'), read filepath.Join(s.Root,"worlds",worldID,"rounds",strings.ToLower(roundID),"snapshot.yaml"), map errors.Is(err, fs.ErrNotExist) to ErrNotFound, yaml.Unmarshal into a local struct {Contributions []struct{ID string `yaml:"id"`} `yaml:"contributions"`}, return ids in order (empty non-nil slice when none). Add import gopkg.in/yaml.v3.

```
func (s *FileStore) FrozenIDs(_ context.Context, worldID, roundID string) ([]string, error) { ... }
```

- **Expected:** go build ./internal/contribution succeeds

## Acceptance criteria
- FrozenIDs returns ids from snapshot.yaml in order
- Missing snapshot returns ErrNotFound
- Unsafe ids are rejected

## Definition of done
- Method compiles and follows ListByRound id validation style
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-262.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-052
- Requirement: REQ-131
- Unit (Act): UNIT-262
- Unit (Verify): UNIT-264
- Status: completed
- Change: UPDATE
