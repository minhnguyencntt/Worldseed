package round

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"

	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// roundFile is the file name that holds one round record inside its round directory.
const roundFile = "round.yaml"

// ErrNotFound is returned by Get when the round has no round.yaml.
var ErrNotFound = errors.New("round: not found")

// FileStore keeps rounds as YAML under Root: worlds/<world>/rounds/<round>/round.yaml.
// Root is the GitOps repository root.
type FileStore struct {
	Root string
}

// RoundDir returns the directory of one round. Both IDs must be safe path segments;
// the round directory name is the lower-cased round ID.
func (s *FileStore) RoundDir(worldID, roundID string) (string, error) {
	if err := safepath.Segment(worldID); err != nil {
		return "", fmt.Errorf("round: world id: %w", err)
	}
	if err := safepath.Segment(roundID); err != nil {
		return "", fmt.Errorf("round: round id: %w", err)
	}
	return filepath.Join(s.Root, "worlds", worldID, "rounds", strings.ToLower(roundID)), nil
}

// Get reads the round with the given world and round IDs. It returns ErrNotFound when
// round.yaml does not exist, and an error wrapping safepath.ErrUnsafe for unsafe IDs.
func (s *FileStore) Get(worldID, roundID string) (Round, error) {
	dir, err := s.RoundDir(worldID, roundID)
	if err != nil {
		return Round{}, err
	}
	rd, err := decodeRound(filepath.Join(dir, roundFile))
	if err != nil {
		return Round{}, err
	}
	return rd, nil
}

// Save writes rd to its round.yaml. The file is written to a temporary file in the same
// directory and then renamed over round.yaml, so readers never see a partial record.
// rd.WorldID and rd.ID must be safe path segments.
func (s *FileStore) Save(rd Round) error {
	dir, err := s.RoundDir(rd.WorldID, rd.ID)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("round: create dir: %w", err)
	}
	data, err := yaml.Marshal(rd)
	if err != nil {
		return fmt.Errorf("round: marshal: %w", err)
	}

	tmp, err := os.CreateTemp(dir, ".round-*.yaml.tmp")
	if err != nil {
		return fmt.Errorf("round: create temp: %w", err)
	}
	tmpName := tmp.Name()
	committed := false
	defer func() {
		if !committed {
			_ = os.Remove(tmpName)
		}
	}()
	if _, err := tmp.Write(data); err != nil {
		_ = tmp.Close()
		return fmt.Errorf("round: write temp: %w", err)
	}
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("round: close temp: %w", err)
	}
	if err := os.Rename(tmpName, filepath.Join(dir, roundFile)); err != nil {
		return fmt.Errorf("round: rename: %w", err)
	}
	committed = true
	return nil
}

// List returns every round of the world, sorted by Number. A world with no rounds
// directory yields an empty list. Directories without round.yaml are skipped. It
// returns an error wrapping safepath.ErrUnsafe for an unsafe world ID.
func (s *FileStore) List(worldID string) ([]Round, error) {
	if err := safepath.Segment(worldID); err != nil {
		return nil, fmt.Errorf("round: world id: %w", err)
	}
	roundsDir := filepath.Join(s.Root, "worlds", worldID, "rounds")
	entries, err := os.ReadDir(roundsDir)
	if errors.Is(err, fs.ErrNotExist) {
		return []Round{}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("round: list: %w", err)
	}

	rounds := make([]Round, 0, len(entries))
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		rd, err := decodeRound(filepath.Join(roundsDir, e.Name(), roundFile))
		if errors.Is(err, ErrNotFound) {
			continue
		}
		if err != nil {
			return nil, err
		}
		rounds = append(rounds, rd)
	}
	sort.SliceStable(rounds, func(i, j int) bool { return rounds[i].Number < rounds[j].Number })
	return rounds, nil
}

// decodeRound reads one round.yaml. A missing file is reported as ErrNotFound.
func decodeRound(path string) (Round, error) {
	data, err := os.ReadFile(path)
	if errors.Is(err, fs.ErrNotExist) {
		return Round{}, ErrNotFound
	}
	if err != nil {
		return Round{}, fmt.Errorf("round: read %s: %w", path, err)
	}
	var rd Round
	if err := yaml.Unmarshal(data, &rd); err != nil {
		return Round{}, fmt.Errorf("round: decode %s: %w", path, err)
	}
	return rd, nil
}
