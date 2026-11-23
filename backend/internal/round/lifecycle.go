// Package round runs the Round lifecycle: Create, Open and Close. Closing a round freezes
// its contributions into snapshot.yaml and records the Git HEAD the freeze was committed at.
// Round files live at worlds/<world>/rounds/<round>/round.yaml under Root.
package round

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"gopkg.in/yaml.v3"

	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/gitrepo"
	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// Status is the lifecycle state of a Round.
type Status string

const (
	StatusScheduled Status = "SCHEDULED"
	StatusOpen      Status = "OPEN"
	StatusClosed    Status = "CLOSED"
	StatusCompleted Status = "COMPLETED"
	StatusFailed    Status = "FAILED"
	StatusCancelled Status = "CANCELLED"
)

// DefaultDuration is used when neither the round nor Open supplies a duration.
const DefaultDuration = 24 * time.Hour

// DefaultBaseRelease is used when neither the round nor Open supplies a base release.
// It matches the bootstrap pointer in current-release.yaml.
const DefaultBaseRelease = "1.0.0"

// transitions lists the states each Status may move to.
var transitions = map[Status][]Status{
	StatusScheduled: {StatusOpen, StatusCancelled},
	StatusOpen:      {StatusClosed},
	StatusClosed:    {StatusCompleted, StatusFailed},
}

var (
	// ErrNotFound is returned when the requested round does not exist.
	ErrNotFound = errors.New("round: not found")
	// ErrActiveRound is returned by Create when a round in the world has not reached a terminal state.
	ErrActiveRound = errors.New("round: an earlier round is still active")
	// ErrInvalidTransition is returned when a Status change is not allowed.
	ErrInvalidTransition = errors.New("round: invalid status transition")
)

// CanTransition reports whether a round may move from one Status to another.
func CanTransition(from, to Status) bool {
	for _, next := range transitions[from] {
		if next == to {
			return true
		}
	}
	return false
}

// Round is one round record from worlds/<world>/rounds/<round>/round.yaml.
type Round struct {
	ID           string        `yaml:"id"`
	WorldID      string        `yaml:"world"`
	Number       int           `yaml:"number"`
	Status       Status        `yaml:"status"`
	StartsAt     time.Time     `yaml:"starts_at"`
	EndsAt       time.Time     `yaml:"ends_at"`
	Duration     time.Duration `yaml:"duration"`
	BaseRelease  string        `yaml:"base_release"`
	ClosedAt     time.Time     `yaml:"closed_at,omitempty"`
	FreezeCommit string        `yaml:"freeze_commit,omitempty"`
}

// Transition moves the round to the given Status, or returns ErrInvalidTransition and leaves it unchanged.
func (r *Round) Transition(to Status) error {
	if !CanTransition(r.Status, to) {
		return fmt.Errorf("%w: %s -> %s", ErrInvalidTransition, r.Status, to)
	}
	r.Status = to
	return nil
}

// OpenOptions overrides the duration and base release that Open applies.
type OpenOptions struct {
	Duration    time.Duration
	BaseRelease string
}

// ContributionLister lists the contributions submitted to a round. contribution.FileStore satisfies it.
type ContributionLister interface {
	ListByRound(ctx context.Context, worldID, roundID string) ([]contribution.Contribution, error)
}

// Service runs round lifecycle operations. Each mutating call holds mu and commits its files to Git.
type Service struct {
	Root          string
	Committer     gitrepo.Committer
	Revisions     gitrepo.Revisioner
	Contributions ContributionLister
	// Now returns the current time. Nil means time.Now in UTC.
	Now func() time.Time

	mu sync.Mutex
}

func (s *Service) now() time.Time {
	if s.Now != nil {
		return s.Now()
	}
	return time.Now().UTC()
}

// Create adds the next round in worldID in SCHEDULED state, starting at startsAt and lasting duration.
// It returns ErrActiveRound if any existing round in the world is not COMPLETED, FAILED or CANCELLED.
func (s *Service) Create(ctx context.Context, worldID string, startsAt time.Time, duration time.Duration, baseRelease string) (Round, error) {
	if err := safepath.Segment(worldID); err != nil {
		return Round{}, fmt.Errorf("round: world id: %w", err)
	}
	if duration <= 0 {
		return Round{}, fmt.Errorf("round: duration must be positive, got %s", duration)
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	existing, err := s.list(worldID)
	if err != nil {
		return Round{}, err
	}
	next := 1
	for _, r := range existing {
		if !isTerminal(r.Status) {
			return Round{}, fmt.Errorf("%w: %s is %s", ErrActiveRound, r.ID, r.Status)
		}
		if r.Number >= next {
			next = r.Number + 1
		}
	}

	r := Round{
		ID:          fmt.Sprintf("ROUND-%07d", next),
		WorldID:     worldID,
		Number:      next,
		Status:      StatusScheduled,
		StartsAt:    startsAt.UTC(),
		EndsAt:      startsAt.Add(duration).UTC(),
		Duration:    duration,
		BaseRelease: baseRelease,
	}
	if err := s.save(r); err != nil {
		return Round{}, err
	}
	if err := s.Committer.Commit(ctx, []string{s.relPath(worldID, r.ID, "round.yaml")}, "round "+r.ID+" create"); err != nil {
		return Round{}, fmt.Errorf("round: commit: %w", err)
	}
	return r, nil
}

// Open moves a SCHEDULED round to OPEN, starting it now. The duration and base release come from
// opts when set, otherwise from the values given at Create, otherwise from the defaults.
func (s *Service) Open(ctx context.Context, worldID, roundID string, opts OpenOptions) (Round, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	r, err := s.load(worldID, roundID)
	if err != nil {
		return Round{}, err
	}
	if err := r.Transition(StatusOpen); err != nil {
		return Round{}, err
	}

	duration := opts.Duration
	if duration <= 0 {
		duration = r.Duration
	}
	if duration <= 0 {
		duration = DefaultDuration
	}
	baseRelease := opts.BaseRelease
	if baseRelease == "" {
		baseRelease = r.BaseRelease
	}
	if baseRelease == "" {
		baseRelease = DefaultBaseRelease
	}

	r.StartsAt = s.now().UTC()
	r.EndsAt = r.StartsAt.Add(duration)
	r.Duration = duration
	r.BaseRelease = baseRelease

	if err := s.save(r); err != nil {
		return Round{}, err
	}
	if err := s.Committer.Commit(ctx, []string{s.relPath(worldID, r.ID, "round.yaml")}, "round "+r.ID+" open"); err != nil {
		return Round{}, fmt.Errorf("round: commit: %w", err)
	}
	return r, nil
}

// Close freezes an OPEN round. It writes snapshot.yaml listing every contribution and commits it,
// then records the Git HEAD as FreezeCommit, sets ClosedAt and moves the round to CLOSED.
func (s *Service) Close(ctx context.Context, worldID, roundID string) (Round, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	r, err := s.load(worldID, roundID)
	if err != nil {
		return Round{}, err
	}
	if !CanTransition(r.Status, StatusClosed) {
		return Round{}, fmt.Errorf("%w: %s -> %s", ErrInvalidTransition, r.Status, StatusClosed)
	}
	if s.Contributions == nil {
		return Round{}, errors.New("round: no contribution lister configured")
	}
	if s.Revisions == nil {
		return Round{}, errors.New("round: no revisioner configured")
	}

	list, err := s.Contributions.ListByRound(ctx, worldID, r.ID)
	if err != nil {
		return Round{}, fmt.Errorf("round: list contributions: %w", err)
	}
	entries := make([]SnapshotEntry, 0, len(list))
	for _, c := range list {
		entries = append(entries, SnapshotEntry{
			ID:           c.ID,
			Player:       c.PlayerID,
			CreatedAt:    c.CreatedAt,
			PromptSHA256: promptSHA256(c.Prompt),
		})
	}

	frozenAt := s.now().UTC()
	snap := Snapshot{Round: r.ID, World: worldID, FrozenAt: frozenAt, Contributions: entries}
	if err := writeSnapshot(s.roundDir(worldID, r.ID), snap); err != nil {
		return Round{}, err
	}
	if err := s.Committer.Commit(ctx, []string{s.relPath(worldID, r.ID, SnapshotFile)}, "round "+r.ID+" snapshot"); err != nil {
		return Round{}, fmt.Errorf("round: commit snapshot: %w", err)
	}

	head, err := s.Revisions.Head(ctx)
	if err != nil {
		return Round{}, fmt.Errorf("round: head: %w", err)
	}

	r.FreezeCommit = head
	r.ClosedAt = frozenAt
	if err := r.Transition(StatusClosed); err != nil {
		return Round{}, err
	}
	if err := s.save(r); err != nil {
		return Round{}, err
	}
	if err := s.Committer.Commit(ctx, []string{s.relPath(worldID, r.ID, "round.yaml")}, "round "+r.ID+" close"); err != nil {
		return Round{}, fmt.Errorf("round: commit: %w", err)
	}
	return r, nil
}

// Get returns the round with the given ID in worldID. It returns ErrNotFound when the round does not exist.
func (s *Service) Get(_ context.Context, worldID, roundID string) (Round, error) {
	return s.load(worldID, roundID)
}

func isTerminal(st Status) bool {
	return st == StatusCompleted || st == StatusFailed || st == StatusCancelled
}

func (s *Service) roundDir(worldID, roundID string) string {
	return filepath.Join(s.Root, "worlds", worldID, "rounds", strings.ToLower(roundID))
}

// relPath returns a repository-relative, slash-separated path for a file in a round's directory.
func (s *Service) relPath(worldID, roundID, file string) string {
	return filepath.ToSlash(filepath.Join("worlds", worldID, "rounds", strings.ToLower(roundID), file))
}

func (s *Service) load(worldID, roundID string) (Round, error) {
	if err := safepath.Segment(worldID); err != nil {
		return Round{}, fmt.Errorf("round: world id: %w", err)
	}
	if err := safepath.Segment(roundID); err != nil {
		return Round{}, fmt.Errorf("round: round id: %w", err)
	}
	data, err := os.ReadFile(filepath.Join(s.roundDir(worldID, roundID), "round.yaml"))
	if errors.Is(err, fs.ErrNotExist) {
		return Round{}, ErrNotFound
	}
	if err != nil {
		return Round{}, fmt.Errorf("round: read: %w", err)
	}
	var r Round
	if err := yaml.Unmarshal(data, &r); err != nil {
		return Round{}, fmt.Errorf("round: decode: %w", err)
	}
	return r, nil
}

// list returns every round in worldID ordered by Number.
func (s *Service) list(worldID string) ([]Round, error) {
	matches, err := filepath.Glob(filepath.Join(s.Root, "worlds", worldID, "rounds", "*", "round.yaml"))
	if err != nil {
		return nil, fmt.Errorf("round: glob: %w", err)
	}
	out := make([]Round, 0, len(matches))
	for _, m := range matches {
		data, err := os.ReadFile(m)
		if err != nil {
			return nil, fmt.Errorf("round: read: %w", err)
		}
		var r Round
		if err := yaml.Unmarshal(data, &r); err != nil {
			return nil, fmt.Errorf("round: decode %s: %w", filepath.Base(filepath.Dir(m)), err)
		}
		out = append(out, r)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Number < out[j].Number })
	return out, nil
}

func (s *Service) save(r Round) error {
	data, err := yaml.Marshal(r)
	if err != nil {
		return fmt.Errorf("round: marshal: %w", err)
	}
	dir := s.roundDir(r.WorldID, r.ID)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("round: create dir: %w", err)
	}
	if err := os.WriteFile(filepath.Join(dir, "round.yaml"), data, 0o644); err != nil {
		return fmt.Errorf("round: write: %w", err)
	}
	return nil
}
