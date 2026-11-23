// Package contribution validates and stores player prompt contributions.
package contribution

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

var (
	ErrPromptLength  = errors.New("contribution: prompt length out of range")
	ErrWorldNotFound = errors.New("contribution: world not found")
	ErrRoundNotOpen  = errors.New("contribution: round is not open")
	ErrLimitReached  = errors.New("contribution: per-player contribution limit reached")
	ErrRateLimited   = errors.New("contribution: rate limit exceeded")
	ErrDuplicate     = errors.New("contribution: duplicate prompt")
	ErrSpam          = errors.New("contribution: prompt looks like spam")
)

// spamRunLength is the number of identical consecutive runes that marks a prompt as spam.
const spamRunLength = 10

// Round is the round a contribution is submitted to.
type Round struct {
	ID     string
	Status string
}

// RoundSource resolves the current round for a world. It returns
// ErrWorldNotFound for an unknown world.
type RoundSource interface {
	Current(worldID string) (Round, error)
}

// Contribution is a validated player prompt bound to a world and round.
type Contribution struct {
	WorldID    string
	RoundID    string
	PlayerID   string
	Prompt     string
	PromptHash string
	CreatedAt  time.Time
}

// Store persists contributions and answers the lookups used by validation.
type Store interface {
	Save(ctx context.Context, c Contribution) error
	CountByPlayer(worldID, roundID, playerID string) (int, error)
	HasPrompt(worldID, roundID, playerID, hash string) (bool, error)
}

// Limits configures the validation thresholds.
type Limits struct {
	MinPromptLen int
	MaxPromptLen int
	MaxPerPlayer int
	RateMax      int
	RateWindow   time.Duration
}

// Input is a single contribution submission.
type Input struct {
	WorldID  string
	PlayerID string
	Prompt   string
}

// Service validates contribution submissions against Limits and saves them.
// Now is the injected clock; when nil, time.Now is used.
type Service struct {
	Rounds RoundSource
	Store  Store
	Limits Limits
	Now    func() time.Time

	limiterOnce sync.Once
	limiter     *rateLimiter
}

func (s *Service) now() time.Time {
	if s.Now != nil {
		return s.Now()
	}
	return time.Now()
}

func (s *Service) rate() *rateLimiter {
	s.limiterOnce.Do(func() {
		s.limiter = newRateLimiter(s.Limits.RateMax, s.Limits.RateWindow)
	})
	return s.limiter
}

// Submit validates in.Prompt and saves it as a Contribution. Rules are checked
// in order: length, world/round, round OPEN, spam, rate, per-player limit,
// duplicate. Store.Save is called only when every rule passes.
func (s *Service) Submit(ctx context.Context, in Input) (Contribution, error) {
	prompt := strings.TrimSpace(in.Prompt)

	if n := utf8.RuneCountInString(prompt); n < s.Limits.MinPromptLen || n > s.Limits.MaxPromptLen {
		return Contribution{}, ErrPromptLength
	}

	round, err := s.Rounds.Current(in.WorldID)
	if err != nil {
		if errors.Is(err, ErrWorldNotFound) {
			return Contribution{}, ErrWorldNotFound
		}
		return Contribution{}, fmt.Errorf("contribution: resolve round: %w", err)
	}

	if round.Status != "OPEN" {
		return Contribution{}, ErrRoundNotOpen
	}

	if hasSpamRun(prompt, spamRunLength) {
		return Contribution{}, ErrSpam
	}

	now := s.now()
	if !s.rate().Allow(in.PlayerID, now) {
		return Contribution{}, ErrRateLimited
	}

	count, err := s.Store.CountByPlayer(in.WorldID, round.ID, in.PlayerID)
	if err != nil {
		return Contribution{}, fmt.Errorf("contribution: count by player: %w", err)
	}
	if count >= s.Limits.MaxPerPlayer {
		return Contribution{}, ErrLimitReached
	}

	hash := promptHash(prompt)
	dup, err := s.Store.HasPrompt(in.WorldID, round.ID, in.PlayerID, hash)
	if err != nil {
		return Contribution{}, fmt.Errorf("contribution: check duplicate: %w", err)
	}
	if dup {
		return Contribution{}, ErrDuplicate
	}

	c := Contribution{
		WorldID:    in.WorldID,
		RoundID:    round.ID,
		PlayerID:   in.PlayerID,
		Prompt:     prompt,
		PromptHash: hash,
		CreatedAt:  now,
	}
	if err := s.Store.Save(ctx, c); err != nil {
		return Contribution{}, fmt.Errorf("contribution: save: %w", err)
	}
	return c, nil
}

// hasSpamRun reports whether s contains a run of at least n identical runes.
func hasSpamRun(s string, n int) bool {
	var prev rune
	run := 0
	for i, r := range s {
		if i > 0 && r == prev {
			run++
		} else {
			run = 1
		}
		prev = r
		if run >= n {
			return true
		}
	}
	return false
}

// promptHash returns the hex SHA-256 of the lower-cased, whitespace-collapsed prompt.
func promptHash(prompt string) string {
	normalized := strings.ToLower(strings.Join(strings.Fields(prompt), " "))
	sum := sha256.Sum256([]byte(normalized))
	return hex.EncodeToString(sum[:])
}
