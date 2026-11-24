# UNIT-255 — Act: Implement FileStore.FrozenIDs from snapshot.yaml

## Summary
Read frozen ids from the round snapshot

## Description
Add FrozenIDs to FileStore.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/frozen.go` · `new: FileStore.FrozenIDs` · new
- **Do:** Validate worldID and roundID with safepath.Segment; read filepath.Join(s.Root,"worlds",worldID,"rounds",strings.ToLower(roundID),"snapshot.yaml"); on fs.ErrNotExist return nil,false,nil; otherwise yaml.Unmarshal into a local struct {Contributions []struct{ID string `yaml:"id"`} `yaml:"contributions"`} and return the ids and true. Add `var _ ExportSource = (*FileStore)(nil)`.

```
func (s *FileStore) FrozenIDs(_ context.Context, worldID, roundID string) ([]string, bool, error)
```

- **Expected:** Compiles and satisfies ExportSource

## Acceptance criteria
- Ids read from snapshot.yaml
- Missing snapshot reported as not frozen

## Definition of done
- var _ ExportSource = (*FileStore)(nil) compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-255.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-050
- Requirement: REQ-128
- Unit (Act): UNIT-255
- Unit (Verify): UNIT-257
- Status: completed
- Change: UPDATE
