// Package world reads world, round and game content from the repository layout.
package world

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"time"

	"gopkg.in/yaml.v3"

	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// ErrNotFound is returned when a requested world or round does not exist.
var ErrNotFound = errors.New("world: not found")

// Repo reads world data from Root and game content from ContentDir.
//
// Root holds worlds/<id>/world.yaml and rounds/<round>/round.yaml.
// ContentDir holds worlds/<id>/world.yaml and worlds/<id>/scenes/*.yaml.
type Repo struct {
	Root       string
	ContentDir string
}

// World is the metadata for one world.
type World struct {
	ID    string `yaml:"id" json:"id"`
	Title string `yaml:"title" json:"title"`
}

// Round is one round record from rounds/<round>/round.yaml.
type Round struct {
	ID       string    `yaml:"id" json:"id"`
	Number   int       `yaml:"number" json:"number"`
	Status   string    `yaml:"status" json:"status"`
	StartsAt time.Time `yaml:"starts_at" json:"starts_at"`
	EndsAt   time.Time `yaml:"ends_at" json:"ends_at"`
}

// List returns every world found under Root/worlds, ordered by directory name.
// A missing worlds directory yields an empty list.
func (r *Repo) List() ([]World, error) {
	entries, err := os.ReadDir(filepath.Join(r.Root, "worlds"))
	if errors.Is(err, fs.ErrNotExist) {
		return []World{}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("world: list: %w", err)
	}

	out := make([]World, 0, len(entries))
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		var w World
		if err := decodeYAML(filepath.Join(r.Root, "worlds", e.Name(), "world.yaml"), &w); err != nil {
			return nil, err
		}
		out = append(out, w)
	}
	return out, nil
}

// Get returns the world with the given id. It returns ErrNotFound for an unsafe
// or unknown id.
func (r *Repo) Get(id string) (World, error) {
	if err := safepath.Segment(id); err != nil {
		return World{}, ErrNotFound
	}
	var w World
	if err := decodeYAML(filepath.Join(r.Root, "worlds", id, "world.yaml"), &w); err != nil {
		return World{}, err
	}
	return w, nil
}

// CurrentRound returns the round with the highest Number under Root/rounds. It
// returns ErrNotFound for an unsafe or unknown world id, or when no round exists.
func (r *Repo) CurrentRound(worldID string) (Round, error) {
	if _, err := r.Get(worldID); err != nil {
		return Round{}, err
	}

	entries, err := os.ReadDir(filepath.Join(r.Root, "rounds"))
	if errors.Is(err, fs.ErrNotExist) {
		return Round{}, ErrNotFound
	}
	if err != nil {
		return Round{}, fmt.Errorf("world: current round: %w", err)
	}

	var best Round
	found := false
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		var rd Round
		if err := decodeYAML(filepath.Join(r.Root, "rounds", e.Name(), "round.yaml"), &rd); err != nil {
			return Round{}, err
		}
		if !found || rd.Number > best.Number {
			best = rd
			found = true
		}
	}
	if !found {
		return Round{}, ErrNotFound
	}
	return best, nil
}

// Game returns the world metadata and scene documents for a world as
// {"world": {...}, "scenes": [{...}, ...]}. Scenes are ordered by file name.
// It returns ErrNotFound for an unsafe or unknown world id.
func (r *Repo) Game(id string) (map[string]any, error) {
	if err := safepath.Segment(id); err != nil {
		return nil, ErrNotFound
	}

	base := filepath.Join(r.ContentDir, "worlds", id)
	var world map[string]any
	if err := decodeYAML(filepath.Join(base, "world.yaml"), &world); err != nil {
		return nil, err
	}

	paths, err := filepath.Glob(filepath.Join(base, "scenes", "*.yaml"))
	if err != nil {
		return nil, fmt.Errorf("world: glob scenes: %w", err)
	}
	sort.Strings(paths)

	scenes := make([]map[string]any, 0, len(paths))
	for _, p := range paths {
		var scene map[string]any
		if err := decodeYAML(p, &scene); err != nil {
			return nil, err
		}
		scenes = append(scenes, scene)
	}

	return map[string]any{"world": world, "scenes": scenes}, nil
}

// decodeYAML reads path into v. A missing file is reported as ErrNotFound; any
// other failure is wrapped with the path.
func decodeYAML(path string, v any) error {
	raw, err := os.ReadFile(path)
	if errors.Is(err, fs.ErrNotExist) {
		return ErrNotFound
	}
	if err != nil {
		return fmt.Errorf("world: read %s: %w", path, err)
	}
	if err := yaml.Unmarshal(raw, v); err != nil {
		return fmt.Errorf("world: parse %s: %w", path, err)
	}
	return nil
}
