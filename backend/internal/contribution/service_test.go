package contribution

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"
)

// fakeRounds resolves a fixed round per world. Unknown worlds return ErrWorldNotFound.
type fakeRounds struct {
	rounds map[string]Round
}

func (f fakeRounds) Current(worldID string) (Round, error) {
	r, ok := f.rounds[worldID]
	if !ok {
		return Round{}, ErrWorldNotFound
	}
	return r, nil
}

// fakeStore records Save calls and answers lookups from preset values.
type fakeStore struct {
	saved []Contribution
	count int
	dup   bool
}

func (f *fakeStore) Save(_ context.Context, c Contribution) error {
	f.saved = append(f.saved, c)
	return nil
}

func (f *fakeStore) CountByPlayer(_, _, _ string) (int, error) {
	return f.count, nil
}

func (f *fakeStore) HasPrompt(_, _, _, _ string) (bool, error) {
	return f.dup, nil
}

// fakeClock is a settable clock injected through Service.Now.
type fakeClock struct {
	now time.Time
}

func (c *fakeClock) Now() time.Time {
	return c.now
}

var fixedNow = time.Date(2026, 11, 23, 12, 0, 0, 0, time.UTC)

const (
	testWorld  = "world-1"
	testRound  = "round-1"
	testPlayer = "player-1"
)

// newTestService builds a Service with the backend default limits
// (min 3, max 500 runes, 5 per player, 3 per minute) and fakes for every dependency.
func newTestService(status string, store *fakeStore, clock *fakeClock) *Service {
	return &Service{
		Rounds: fakeRounds{rounds: map[string]Round{
			testWorld: {ID: testRound, Status: status},
		}},
		Store: store,
		Limits: Limits{
			MinPromptLen: 3,
			MaxPromptLen: 500,
			MaxPerPlayer: 5,
			RateMax:      3,
			RateWindow:   time.Minute,
		},
		Now: clock.Now,
	}
}

// TestSubmit_Rejects covers each validation rule that must reject a submission
// before anything is written to the Store.
func TestSubmit_Rejects(t *testing.T) {
	tests := []struct {
		name      string
		worldID   string
		status    string
		count     int
		dup       bool
		prompt    string
		wantError error
	}{
		{
			name:      "prompt of 2 runes is shorter than the minimum",
			worldID:   testWorld,
			status:    "OPEN",
			prompt:    "ab",
			wantError: ErrPromptLength,
		},
		{
			name:      "prompt of 501 runes is longer than the maximum",
			worldID:   testWorld,
			status:    "OPEN",
			prompt:    strings.Repeat("ab", 250) + "a",
			wantError: ErrPromptLength,
		},
		{
			name:      "unknown world is rejected",
			worldID:   "world-missing",
			status:    "OPEN",
			prompt:    "a valid prompt",
			wantError: ErrWorldNotFound,
		},
		{
			name:      "closed round rejects submissions",
			worldID:   testWorld,
			status:    "CLOSED",
			prompt:    "a valid prompt",
			wantError: ErrRoundNotOpen,
		},
		{
			name:      "player at the per-round limit is rejected",
			worldID:   testWorld,
			status:    "OPEN",
			count:     5,
			prompt:    "a valid prompt",
			wantError: ErrLimitReached,
		},
		{
			name:      "repeated prompt by the same player is a duplicate",
			worldID:   testWorld,
			status:    "OPEN",
			dup:       true,
			prompt:    "a valid prompt",
			wantError: ErrDuplicate,
		},
		{
			name:      "prompt with 11 identical runes is flagged as spam",
			worldID:   testWorld,
			status:    "OPEN",
			prompt:    strings.Repeat("a", 11),
			wantError: ErrSpam,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			store := &fakeStore{count: tc.count, dup: tc.dup}
			clock := &fakeClock{now: fixedNow}
			svc := newTestService(tc.status, store, clock)

			_, err := svc.Submit(context.Background(), Input{
				WorldID:  tc.worldID,
				PlayerID: testPlayer,
				Prompt:   tc.prompt,
			})

			if !errors.Is(err, tc.wantError) {
				t.Fatalf("Submit error = %v, want %v", err, tc.wantError)
			}
			if n := len(store.saved); n != 0 {
				t.Fatalf("Store.Save called %d times, want 0", n)
			}
		})
	}
}

// TestSubmit_RateLimit checks that the fourth submission inside the window is refused
// and that a submission succeeds again once the window has passed.
func TestSubmit_RateLimit(t *testing.T) {
	store := &fakeStore{}
	clock := &fakeClock{now: fixedNow}
	svc := newTestService("OPEN", store, clock)
	ctx := context.Background()

	for i, prompt := range []string{"first prompt", "second prompt", "third prompt"} {
		if _, err := svc.Submit(ctx, Input{WorldID: testWorld, PlayerID: testPlayer, Prompt: prompt}); err != nil {
			t.Fatalf("submit %d: unexpected error %v", i+1, err)
		}
	}

	_, err := svc.Submit(ctx, Input{WorldID: testWorld, PlayerID: testPlayer, Prompt: "fourth prompt"})
	if !errors.Is(err, ErrRateLimited) {
		t.Fatalf("4th submit error = %v, want ErrRateLimited", err)
	}
	if n := len(store.saved); n != 3 {
		t.Fatalf("Store.Save calls after rate limit = %d, want 3", n)
	}

	clock.now = fixedNow.Add(time.Minute + time.Second)
	if _, err := svc.Submit(ctx, Input{WorldID: testWorld, PlayerID: testPlayer, Prompt: "fifth prompt"}); err != nil {
		t.Fatalf("submit after window: unexpected error %v", err)
	}
	if n := len(store.saved); n != 4 {
		t.Fatalf("Store.Save calls after window = %d, want 4", n)
	}
}

// TestSubmit_OK checks that a valid submission is saved once, trimmed, and stamped
// with the injected clock.
func TestSubmit_OK(t *testing.T) {
	store := &fakeStore{}
	clock := &fakeClock{now: fixedNow}
	svc := newTestService("OPEN", store, clock)

	got, err := svc.Submit(context.Background(), Input{
		WorldID:  testWorld,
		PlayerID: testPlayer,
		Prompt:   "  Build a lighthouse on the north cliff  ",
	})
	if err != nil {
		t.Fatalf("Submit: unexpected error %v", err)
	}

	if !got.CreatedAt.Equal(fixedNow) {
		t.Errorf("CreatedAt = %v, want %v", got.CreatedAt, fixedNow)
	}
	if got.WorldID != testWorld || got.RoundID != testRound || got.PlayerID != testPlayer {
		t.Errorf("ids = (%q, %q, %q), want (%q, %q, %q)",
			got.WorldID, got.RoundID, got.PlayerID, testWorld, testRound, testPlayer)
	}
	if want := "Build a lighthouse on the north cliff"; got.Prompt != want {
		t.Errorf("Prompt = %q, want %q", got.Prompt, want)
	}
	if n := len(store.saved); n != 1 {
		t.Fatalf("Store.Save called %d times, want 1", n)
	}
	if saved := store.saved[0]; !saved.CreatedAt.Equal(fixedNow) || saved.Prompt != got.Prompt {
		t.Errorf("saved contribution = %+v, want the returned contribution", saved)
	}
}
