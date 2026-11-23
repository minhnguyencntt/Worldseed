// Package safepath validates untrusted values before they are used as path segments.
package safepath

import (
	"errors"
	"regexp"
)

// ErrUnsafe is returned when a value is not a safe single path segment.
var ErrUnsafe = errors.New("safepath: unsafe path segment")

var segmentRE = regexp.MustCompile(`^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$`)

// Segment returns ErrUnsafe unless s is a single, plain path segment: it starts
// with a letter or digit, contains only letters, digits, '_' or '-', and is at
// most 64 characters long. Dots, separators and empty strings are rejected.
func Segment(s string) error {
	if !segmentRE.MatchString(s) {
		return ErrUnsafe
	}
	return nil
}
