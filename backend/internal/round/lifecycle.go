package round

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/gitrepo"
)

// DefaultDuration is the round length used when a round has no usable window.
const DefaultDuration = 24 * time.Hour

// DefaultBaseRelease is used when a round has no base release. It matches the
// bootstrap pointer in current-release.yaml.
const DefaultBaseRelease = "1.0.0"

// ErrActiveRound is returned by Create when a round in the world has not reached a terminal state.
var ErrActiveRound = errors.New("round: an earlier round is still active")

// ContributionLister lists the contributions submitted to a round. contribution.FileStore satisfies it.
type ContributionLister interface {
	ListByRound(ctx context.Context, worldID, roundID string) ([]contribution.Contribution, error)
}

// Service runs the round lifecycle. Mutating calls hold mu, write round files through Store
// and commit them to Git. Service satisfies Controller, so the Scheduler can drive it.
type Service struct {
	Store         *FileStore
	Committer     gitrepo.Committer
	Revisions     gitrepo.Revisioner
	Contributions ContributionLister
	// Now returns the current time. Nil means time.Now in UTC.
	Now func() time.Time

	mu sync.Mutex
}

var _ Controller = (*Service)(nil)

func (s *Service) now() time.Time {
	if s.Now != nil {
		return s.Now()
	}
	return time.Now().UTC()
}

// Create adds the next round of worldID in SCHEDULED state. The round runs from startsAt for
// duration. It returns ErrActiveRound when any existing round is not COMPLETED, FAILED or CANCELLED.
// An empty baseRelease is stored as DefaultBaseRelease.
func (s *Service) Create(ctx context.Context, worldID string, startsAt time.Time, duration time.Duration, baseRelease string) (Round, error) {
	if duration <= 0 {
		return Round{}, fmt.Errorf("round: duration must be positive, got %s", duration)
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	existing, err := s.Store.List(worldID)
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
	if baseRelease == "" {
		baseRelease = DefaultBaseRelease
	}

	r := Round{
		ID:          fmt.Sprintf("ROUND-%07d", next),
		WorldID:     worldID,
		Number:      next,
		Status:      StatusScheduled,
		StartsAt:    startsAt.UTC(),
		EndsAt:      startsAt.Add(duration).UTC(),
		BaseRelease: baseRelease,
	}
	if err := s.Store.Save(r); err != nil {
		return Round{}, err
	}
	if err := s.commit(ctx, worldID, r.ID, "round.yaml", "round "+r.ID+" create"); err != nil {
		return Round{}, err
	}
	return r, nil
}

// Open moves a SCHEDULED round to OPEN and starts it now. The round keeps the length its
// Create window gave it, or DefaultDuration if that is unusable. OpenOptions has no fields yet.
func (s *Service) Open(ctx context.Context, worldID, roundID string, _ OpenOptions) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	r, err := s.Store.Get(worldID, roundID)
	if err != nil {
		return err
	}
	if err := r.Transition(StatusOpen); err != nil {
		return err
	}

	duration := r.EndsAt.Sub(r.StartsAt)
	if duration <= 0 {
		duration = DefaultDuration
	}
	if r.BaseRelease == "" {
		r.BaseRelease = DefaultBaseRelease
	}
	r.StartsAt = s.now().UTC()
	r.EndsAt = r.StartsAt.Add(duration)

	if err := s.Store.Save(r); err != nil {
		return err
	}
	return s.commit(ctx, worldID, r.ID, "round.yaml", "round "+r.ID+" open")
}

// Close freezes an OPEN round. It writes snapshot.yaml listing every contribution and commits it.
// It then records the Git HEAD as FreezeCommit, sets ClosedAt and moves the round to CLOSED.
func (s *Service) Close(ctx context.Context, worldID, roundID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	r, err := s.Store.Get(worldID, roundID)
	if err != nil {
		return err
	}
	if !CanTransition(r.Status, StatusClosed) {
		return fmt.Errorf("%w: %s -> %s", ErrIllegalTransition, r.Status, StatusClosed)
	}
	if s.Contributions == nil {
		return errors.New("round: no contribution lister configured")
	}
	if s.Revisions == nil {
		return errors.New("round: no revisioner configured")
	}

	list, err := s.Contributions.ListByRound(ctx, worldID, r.ID)
	if err != nil {
		return fmt.Errorf("round: list contributions: %w", err)
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

	dir, err := s.Store.RoundDir(worldID, r.ID)
	if err != nil {
		return err
	}
	frozenAt := s.now().UTC()
	if err := writeSnapshot(dir, Snapshot{Round: r.ID, World: worldID, FrozenAt: frozenAt, Contributions: entries}); err != nil {
		return err
	}
	if err := s.commit(ctx, worldID, r.ID, SnapshotFile, "round "+r.ID+" snapshot"); err != nil {
		// Remove the uncommitted snapshot so the caller can retry Close.
		os.Remove(filepath.Join(dir, SnapshotFile))
		return err
	}

	head, err := s.Revisions.Head(ctx)
	if err != nil {
		return fmt.Errorf("round: head: %w", err)
	}

	r.FreezeCommit = head
	r.ClosedAt = &frozenAt
	if err := r.Transition(StatusClosed); err != nil {
		return err
	}
	if err := s.Store.Save(r); err != nil {
		return err
	}
	return s.commit(ctx, worldID, r.ID, "round.yaml", "round "+r.ID+" close")
}

// Get returns the round with the given IDs. It returns ErrNotFound when the round does not exist.
func (s *Service) Get(worldID, roundID string) (Round, error) {
	return s.Store.Get(worldID, roundID)
}

func isTerminal(st Status) bool {
	return st == StatusCompleted || st == StatusFailed || st == StatusCancelled
}

// commit commits one file of a round directory with the given message.
func (s *Service) commit(ctx context.Context, worldID, roundID, file, message string) error {
	if s.Committer == nil {
		return errors.New("round: no git committer configured")
	}
	rel := filepath.ToSlash(filepath.Join("worlds", worldID, "rounds", strings.ToLower(roundID), file))
	if err := s.Committer.Commit(ctx, []string{rel}, message); err != nil {
		return fmt.Errorf("round: commit: %w", err)
	}
	return nil
}
