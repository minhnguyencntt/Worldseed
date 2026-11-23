// Round export format.
//
// An Export is a versioned JSON document that bundles the contributions of a
// single Round of a World. It is produced from the immutable contribution
// files and consumed by external tools. Every field is explicit and serialized
// with a snake_case JSON key so producers and consumers can evolve
// independently: a consumer checks Version before reading the other fields,
// and additive changes must keep existing keys intact.
//
// Example document (Version 1):
//
//	{
//	  "version": 1,
//	  "world_id": "world-1",
//	  "round_id": "round-3",
//	  "contributions": [
//	    {
//	      "id": "c-001",
//	      "author": "alice",
//	      "content": "The gate opens at dawn.",
//	      "created_at": "2026-01-02T03:04:05Z"
//	    }
//	  ]
//	}
package contribution

import "time"

// ExportVersion is the format version written into every Export. Bump it when
// a change is not backward compatible for consumers.
const ExportVersion = 1

// ExportContribution is a single player contribution as it appears in an
// Export. ID identifies the contribution, Author names the player who submitted
// it, Content holds the submitted prompt text, and CreatedAt records when it
// was submitted (serialized in RFC 3339 form).
type ExportContribution struct {
	ID        string    `json:"id"`
	Author    string    `json:"author"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

// Export is the top-level JSON document for one Round of a World. Version is
// the format version (see ExportVersion), WorldID and RoundID identify the
// World and Round the contributions belong to, and Contributions lists the
// Round's contributions in the order they were produced.
type Export struct {
	Version       int                  `json:"version"`
	WorldID       string               `json:"world_id"`
	RoundID       string               `json:"round_id"`
	Contributions []ExportContribution `json:"contributions"`
}
