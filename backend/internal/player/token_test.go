package player

import (
	"testing"
	"time"
)

// Spec: a token signed for id "abc" at time T verifies at T+1m with a 1h ttl
// and yields the same id with no error.
func TestSignVerifyRoundTrip(t *testing.T) {
	secret := []byte("s1")
	issued := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)

	token := Sign(secret, "abc", issued)

	id, err := Verify(secret, token, issued.Add(time.Minute), time.Hour)
	if err != nil {
		t.Fatalf("Verify() error = %v, want nil", err)
	}
	if id != "abc" {
		t.Fatalf("Verify() id = %q, want %q", id, "abc")
	}
}
