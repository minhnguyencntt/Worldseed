package safepath

import (
	"errors"
	"strings"
	"testing"
)

// Given values that are not a single plain path segment,
// When Segment validates them,
// Then it returns ErrUnsafe.
// Given plain single segments made of letters, digits, '_' and '-',
// When Segment validates them,
// Then it returns nil.
func TestSegment(t *testing.T) {
	cases := []struct {
		name    string
		input   string
		wantErr bool
	}{
		{name: "parent directory", input: "..", wantErr: true},
		{name: "forward slash separator", input: "a/b", wantErr: true},
		{name: "backslash separator", input: `a\b`, wantErr: true},
		{name: "empty string", input: "", wantErr: true},
		{name: "65 characters", input: strings.Repeat("a", 65), wantErr: true},
		{name: "round id with digits", input: "ROUND-0000001", wantErr: false},
		{name: "world slug", input: "the-boys-room", wantErr: false},
		{name: "64 characters", input: strings.Repeat("a", 64), wantErr: false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := Segment(tc.input)
			if tc.wantErr {
				if !errors.Is(err, ErrUnsafe) {
					t.Fatalf("Segment(%q) error = %v, want ErrUnsafe", tc.input, err)
				}
				return
			}
			if err != nil {
				t.Fatalf("Segment(%q) error = %v, want nil", tc.input, err)
			}
		})
	}
}
