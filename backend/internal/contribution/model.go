// Package contribution stores player prompts as immutable Markdown files under
// the Round GitOps layout: worlds/<world>/rounds/<round>/contributions/<id>.md.
package contribution

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

// Contribution is one player prompt submitted during a Round.
type Contribution struct {
	ID        string
	WorldID   string
	RoundID   string
	PlayerID  string
	Prompt    string
	CreatedAt time.Time
}

// ErrMalformed is returned by parse when a contribution file lacks valid front matter.
var ErrMalformed = errors.New("contribution: malformed file")

const (
	fmOpen      = "---\n"
	fmClose     = "\n---\n\n" // closing delimiter, as it follows the YAML body
	fmEnd       = "---\n\n"    // closing delimiter, as written after the YAML body
	timeLayout  = time.RFC3339
	idPrefix    = "CON-"
	idRandBytes = 16
)

// frontMatter is the YAML header written at the top of every contribution file.
type frontMatter struct {
	ID        string `yaml:"id"`
	World     string `yaml:"world"`
	Round     string `yaml:"round"`
	Player    string `yaml:"player"`
	CreatedAt string `yaml:"created_at"`
}

// NewID returns "CON-" followed by 32 lowercase hex characters from crypto/rand.
func NewID() (string, error) {
	var b [idRandBytes]byte
	if _, err := rand.Read(b[:]); err != nil {
		return "", fmt.Errorf("contribution: generate id: %w", err)
	}
	return idPrefix + hex.EncodeToString(b[:]), nil
}

// render serializes c as YAML front matter followed by a blank line and the prompt.
func render(c Contribution) ([]byte, error) {
	fm, err := yaml.Marshal(frontMatter{
		ID:        c.ID,
		World:     c.WorldID,
		Round:     c.RoundID,
		Player:    c.PlayerID,
		CreatedAt: c.CreatedAt.Format(timeLayout),
	})
	if err != nil {
		return nil, fmt.Errorf("contribution: encode front matter: %w", err)
	}

	var sb strings.Builder
	sb.WriteString(fmOpen)
	sb.Write(fm)
	sb.WriteString(fmEnd)
	sb.WriteString(c.Prompt)
	return []byte(sb.String()), nil
}

// parse reverses render. It returns ErrMalformed when the front matter is missing,
// unterminated, or does not decode to a valid timestamp.
func parse(data []byte) (Contribution, error) {
	body, ok := strings.CutPrefix(string(data), fmOpen)
	if !ok {
		return Contribution{}, ErrMalformed
	}
	i := strings.Index(body, fmClose)
	if i < 0 {
		return Contribution{}, ErrMalformed
	}

	var fm frontMatter
	if err := yaml.Unmarshal([]byte(body[:i+1]), &fm); err != nil {
		return Contribution{}, fmt.Errorf("%w: %v", ErrMalformed, err)
	}
	created, err := time.Parse(timeLayout, fm.CreatedAt)
	if err != nil {
		return Contribution{}, fmt.Errorf("%w: created_at: %v", ErrMalformed, err)
	}

	return Contribution{
		ID:        fm.ID,
		WorldID:   fm.World,
		RoundID:   fm.Round,
		PlayerID:  fm.Player,
		Prompt:    body[i+len(fmClose):],
		CreatedAt: created,
	}, nil
}
