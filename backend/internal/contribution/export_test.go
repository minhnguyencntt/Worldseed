package contribution

import (
	"encoding/json"
	"go/ast"
	"go/parser"
	"go/token"
	"path/filepath"
	"runtime"
	"testing"
	"time"
)

// TestExport_JSONShape verifies that an Export marshals to the documented
// snake_case JSON keys and that CreatedAt is written as RFC 3339.
func TestExport_JSONShape(t *testing.T) {
	createdAt := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	export := Export{
		Version: ExportVersion,
		WorldID: "w",
		RoundID: "ROUND-0000001",
		Contributions: []ExportContribution{
			{
				ID:        "CON-1",
				Author:    "p1",
				Content:   "hi",
				CreatedAt: createdAt,
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

	for _, key := range []string{"version", "world_id", "round_id", "contributions"} {
		if _, ok := doc[key]; !ok {
			t.Errorf("Export JSON missing key %q; got keys %v", key, keysOf(doc))
		}
	}

	if got, want := doc["version"], float64(ExportVersion); got != want {
		t.Errorf("version = %v, want %v", got, want)
	}
	if got, want := doc["world_id"], "w"; got != want {
		t.Errorf("world_id = %v, want %v", got, want)
	}
	if got, want := doc["round_id"], "ROUND-0000001"; got != want {
		t.Errorf("round_id = %v, want %v", got, want)
	}

	contributions, ok := doc["contributions"].([]any)
	if !ok {
		t.Fatalf("contributions is %T, want array", doc["contributions"])
	}
	if len(contributions) != 1 {
		t.Fatalf("contributions has %d entries, want 1", len(contributions))
	}

	entry, ok := contributions[0].(map[string]any)
	if !ok {
		t.Fatalf("contributions[0] is %T, want object", contributions[0])
	}

	for _, key := range []string{"id", "author", "content", "created_at"} {
		if _, ok := entry[key]; !ok {
			t.Errorf("ExportContribution JSON missing key %q; got keys %v", key, keysOf(entry))
		}
	}

	if got, want := entry["id"], "CON-1"; got != want {
		t.Errorf("id = %v, want %v", got, want)
	}
	if got, want := entry["author"], "p1"; got != want {
		t.Errorf("author = %v, want %v", got, want)
	}
	if got, want := entry["content"], "hi"; got != want {
		t.Errorf("content = %v, want %v", got, want)
	}
	if got, want := entry["created_at"], "2026-01-02T03:04:05Z"; got != want {
		t.Errorf("created_at = %v, want %v", got, want)
	}
}

// TestExport_TypesDocumented verifies that the Export and ExportContribution
// type declarations carry doc comments in export.go.
func TestExport_TypesDocumented(t *testing.T) {
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("cannot determine test file location")
	}
	exportPath := filepath.Join(filepath.Dir(thisFile), "export.go")

	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, exportPath, nil, parser.ParseComments)
	if err != nil {
		t.Fatalf("parse %s: %v", exportPath, err)
	}

	want := map[string]bool{"Export": false, "ExportContribution": false}

	for _, decl := range file.Decls {
		gen, ok := decl.(*ast.GenDecl)
		if !ok || gen.Tok != token.TYPE {
			continue
		}
		for _, spec := range gen.Specs {
			ts, ok := spec.(*ast.TypeSpec)
			if !ok {
				continue
			}
			if _, tracked := want[ts.Name.Name]; !tracked {
				continue
			}
			if gen.Doc == nil || len(gen.Doc.List) == 0 {
				t.Errorf("type %s has no doc comment", ts.Name.Name)
				continue
			}
			want[ts.Name.Name] = true
		}
	}

	for name, found := range want {
		if !found {
			t.Errorf("type %s not declared in export.go", name)
		}
	}
}

func keysOf(m map[string]any) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}
