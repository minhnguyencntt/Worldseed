package contribution

import (
	"context"
	"go/parser"
	"go/token"
	"strings"
	"testing"
)

// fakeSource is an in-memory ExportSource used to exercise the interface
// contract without touching the file-backed store.
type fakeSource struct {
	contributions []Contribution
}

func (f *fakeSource) ListByRound(_ context.Context, _, _ string) ([]Contribution, error) {
	return f.contributions, nil
}

// TestExportSource_Fake verifies that a fake source satisfies ExportSource and
// returns the round's contributions.
//
// Given a fake source holding two contributions,
// When ListByRound is called for world "w" and round "ROUND-0000001",
// Then the fake returns exactly two contributions.
func TestExportSource_Fake(t *testing.T) {
	var src ExportSource = &fakeSource{contributions: []Contribution{
		{ID: "c", WorldID: "w", RoundID: "ROUND-0000001"},
		{ID: "d", WorldID: "w", RoundID: "ROUND-0000001"},
	}}

	list, err := src.ListByRound(context.Background(), "w", "ROUND-0000001")
	if err != nil {
		t.Fatalf("ListByRound: %v", err)
	}
	if len(list) != 2 {
		t.Fatalf("ListByRound returned %d entries, want 2", len(list))
	}
}

// TestExportFiles_NoRemovedImports verifies that the export format and the
// export source contract do not import worker or execution packages, which
// were removed from the contribution package.
//
// Given export.go and export_source.go in the contribution package,
// When their import declarations are parsed,
// Then no import path contains "worker" or "execution".
func TestExportFiles_NoRemovedImports(t *testing.T) {
	fset := token.NewFileSet()
	for _, name := range []string{"export.go", "export_source.go"} {
		f, err := parser.ParseFile(fset, name, nil, parser.ImportsOnly)
		if err != nil {
			t.Fatalf("parse %s: %v", name, err)
		}
		for _, imp := range f.Imports {
			path := strings.Trim(imp.Path.Value, `"`)
			if strings.Contains(path, "worker") || strings.Contains(path, "execution") {
				t.Errorf("%s imports %q, which must not be imported", name, path)
			}
		}
	}
}
