package contribution

import (
	"sync"
	"time"
)

// rateLimiter is a per-key sliding-window limiter. It allows at most max
// hits per key within window.
type rateLimiter struct {
	mu     sync.Mutex
	hits   map[string][]time.Time
	max    int
	window time.Duration
}

func newRateLimiter(max int, window time.Duration) *rateLimiter {
	return &rateLimiter{
		hits:   make(map[string][]time.Time),
		max:    max,
		window: window,
	}
}

// Allow reports whether key may perform another action at now. A permitted
// action is recorded; a denied one is not.
func (r *rateLimiter) Allow(key string, now time.Time) bool {
	r.mu.Lock()
	defer r.mu.Unlock()

	cutoff := now.Add(-r.window)
	kept := r.hits[key][:0]
	for _, t := range r.hits[key] {
		if !t.Before(cutoff) {
			kept = append(kept, t)
		}
	}
	r.hits[key] = kept

	if len(kept) >= r.max {
		return false
	}
	r.hits[key] = append(kept, now)
	return true
}
