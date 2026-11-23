package contribution

import (
	"encoding/json"
	"os"
	"sort"
	"strings"
	"testing"
	"time"
)

// readDoc reads a documentation file relative to the backend module root.
// The contribution package lives two levels below it.
func readDoc(t *testing.T, rel string) string {
	t.Helper()
	raw, err := os.ReadFile(rel)
	if err != nil {
		t.Fatalf("read %s: %v", rel, err)
	}
	return string(raw)
}

// TestHandoffDocs_ReadmeNamesWorkseed verifies that the backend README names
// devion workseed as the consumer of the Round export.
//
// Given backend/README.md,
// When its text is read,
// Then it contains the phrase "devion workseed".
func TestHandoffDocs_ReadmeNamesWorkseed(t *testing.T) {
	readme := readDoc(t, "../../README.md")
	if !strings.Contains(readme, "devion workseed") {
		t.Errorf("backend/README.md does not contain %q", "devion workseed")
	}
}

// TestHandoffDocs_KeysMatchExport verifies that every top-level and
// per-contribution JSON key produced by Export is documented in handoff.md.
//
// Given an Export holding one ExportContribution,
// When it is marshaled to JSON and decoded into a generic map,
// Then each top-level key and each contributions[0] key appears as a quoted
// JSON key in backend/docs/handoff.md.
func TestHandoffDocs_KeysMatchExport(t *testing.T) {
	export := Export{
		Version: ExportVersion,
		WorldID: "world-1",
		RoundID: "round-3",
		Contributions: []ExportContribution{
			{
				ID:        "c-001",
				Author:    "alice",
				Content:   "The gate opens at dawn.",
				CreatedAt: time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC),
			},
		},
	}

	raw, err := json.Marshal(export)
	if err != nil {
		t.Fatalf("marshal Export: %v", err)
	}

	var doc map[string]any
	if err := json.Unmarshal(raw, &doc); err != nil {
		t.Fatalf("unmarshal Export into map: %v", err)
	}

	contributions, ok := doc["contributions"].([]any)
	if !ok || len(contributions) != 1 {
		t.Fatalf("contributions = %#v, want one-entry array", doc["contributions"])
	}
	entry, ok := contributions[0].(map[string]any)
	if !ok {
		t.Fatalf("contributions[0] is %T, want object", contributions[0])
	}

	handoff := readDoc(t, "../../docs/handoff.md")

	keys := append(keysOf(doc), keysOf(entry)...)
	sort.Strings(keys)
	for _, key := range keys {
		quoted := `"` + key + `"`
		if !strings.Contains(handoff, quoted) {
			t.Errorf("backend/docs/handoff.md does not document export key %s", quoted)
		}
	}
}

// TestHandoffDocs_NoRemovedTerms verifies that neither doc still mentions
// terms from the removed worker, execution panel, or external agent tooling.
//
// Given backend/README.md and backend/docs/handoff.md,
// When their text is lowercased,
// Then neither contains "worker", "executionpanel", "claude code", or "cursor".
func TestHandoffDocs_NoRemovedTerms(t *testing.T) {
	removed := []string{"worker", "executionpanel", "claude code", "cursor"}
	docs := map[string]string{
		"../../README.md":       readDoc(t, "../../README.md"),
		"../../docs/handoff.md": readDoc(t, "../../docs/handoff.md"),
	}

	for path, text := range docs {
		lower := strings.ToLower(text)
		for _, term := range removed {
			if strings.Contains(lower, term) {
				t.Errorf("%s contains removed term %q", path, term)
			}
		}
	}
}
