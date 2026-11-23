package round

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	"gopkg.in/yaml.v3"
)

// SnapshotFile is the name of the frozen contribution list written into a closed round's directory.
const SnapshotFile = "snapshot.yaml"

// ErrSnapshotExists is returned by writeSnapshot when the round already has a snapshot.
var ErrSnapshotExists = errors.New("round: snapshot already exists")

// Snapshot is the immutable record of a round's contributions taken when it closes.
type Snapshot struct {
	Round         string          `yaml:"round"`
	World         string          `yaml:"world"`
	FrozenAt      time.Time       `yaml:"frozen_at"`
	Contributions []SnapshotEntry `yaml:"contributions"`
}

// SnapshotEntry records one contribution as it stood at freeze time. The prompt itself is
// not copied; PromptSHA256 pins its content.
type SnapshotEntry struct {
	ID           string    `yaml:"id"`
	Player       string    `yaml:"player"`
	CreatedAt    time.Time `yaml:"created_at"`
	PromptSHA256 string    `yaml:"prompt_sha256"`
}

// writeSnapshot creates dir/snapshot.yaml with mode 0444. It never overwrites an existing
// snapshot and returns ErrSnapshotExists if one is already present.
func writeSnapshot(dir string, s Snapshot) error {
	data, err := yaml.Marshal(s)
	if err != nil {
		return fmt.Errorf("round: marshal snapshot: %w", err)
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("round: create dir: %w", err)
	}

	path := filepath.Join(dir, SnapshotFile)
	f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o444)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			return ErrSnapshotExists
		}
		return fmt.Errorf("round: create snapshot: %w", err)
	}
	if _, err := f.Write(data); err != nil {
		f.Close()
		os.Remove(path)
		return fmt.Errorf("round: write snapshot: %w", err)
	}
	if err := f.Close(); err != nil {
		os.Remove(path)
		return fmt.Errorf("round: close snapshot: %w", err)
	}
	return nil
}

// promptSHA256 returns the hex SHA-256 digest of a contribution prompt.
func promptSHA256(prompt string) string {
	sum := sha256.Sum256([]byte(prompt))
	return hex.EncodeToString(sum[:])
}
