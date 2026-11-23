package config

import (
	"strings"
	"testing"
	"testing/fstest"
	"time"
)

// noEnv is a fake getenv that reports every variable as unset.
func noEnv(string) string { return "" }

// TestLoadFS_Defaults verifies that when the YAML only sets worker.repo_path
// and no environment overrides are present, LoadFS fills every other field
// with its documented default value.
func TestLoadFS_Defaults(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": {Data: []byte("worker:\n  repo_path: /r\n")},
	}

	cfg, err := LoadFS(fsys, "config.yaml", noEnv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}

	if cfg.Worker.PollInterval != 30*time.Second {
		t.Errorf("PollInterval = %v; want 30s", cfg.Worker.PollInterval)
	}
	if cfg.Worker.ExecutionTimeout != 30*time.Minute {
		t.Errorf("ExecutionTimeout = %v; want 30m", cfg.Worker.ExecutionTimeout)
	}
	if cfg.Worker.MaxRetries != 2 {
		t.Errorf("MaxRetries = %d; want 2", cfg.Worker.MaxRetries)
	}
	if cfg.Store.Dir != ".storyforge/executions" {
		t.Errorf("Store.Dir = %q; want %q", cfg.Store.Dir, ".storyforge/executions")
	}
	if cfg.Log.Level != "info" {
		t.Errorf("Log.Level = %q; want %q", cfg.Log.Level, "info")
	}
}

// TestLoadFS_NewFieldDefaults verifies that when the YAML only sets
// worker.repo_path, LoadFS fills the newly added worker fields (work_root,
// max_budget, auto_publish, provider_kind) with their documented defaults.
func TestLoadFS_NewFieldDefaults(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": {Data: []byte("worker:\n  repo_path: /r\n")},
	}

	cfg, err := LoadFS(fsys, "config.yaml", noEnv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}

	if cfg.Worker.WorkRoot != ".storyforge/work" {
		t.Errorf("WorkRoot = %q; want %q", cfg.Worker.WorkRoot, ".storyforge/work")
	}
	if cfg.Worker.MaxBudget != 5 {
		t.Errorf("MaxBudget = %v; want 5", cfg.Worker.MaxBudget)
	}
	if cfg.Worker.AutoPublish {
		t.Errorf("AutoPublish = true; want false")
	}
	if cfg.Worker.ProviderKind != "mock" {
		t.Errorf("ProviderKind = %q; want %q", cfg.Worker.ProviderKind, "mock")
	}
}

// TestLoadFS_NewFieldExplicit verifies that explicit values for the newly
// added worker fields (work_root, max_budget, auto_publish, provider_kind)
// are loaded verbatim from the YAML instead of being replaced by defaults.
func TestLoadFS_NewFieldExplicit(t *testing.T) {
	yamlData := "worker:\n" +
		"  repo_path: /r\n" +
		"  work_root: /w\n" +
		"  max_budget: 12.5\n" +
		"  auto_publish: true\n" +
		"  provider_kind: claude\n"
	fsys := fstest.MapFS{
		"config.yaml": {Data: []byte(yamlData)},
	}

	cfg, err := LoadFS(fsys, "config.yaml", noEnv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}

	if cfg.Worker.RepoPath != "/r" {
		t.Errorf("RepoPath = %q; want %q", cfg.Worker.RepoPath, "/r")
	}
	if cfg.Worker.WorkRoot != "/w" {
		t.Errorf("WorkRoot = %q; want %q", cfg.Worker.WorkRoot, "/w")
	}
	if cfg.Worker.MaxBudget != 12.5 {
		t.Errorf("MaxBudget = %v; want 12.5", cfg.Worker.MaxBudget)
	}
	if !cfg.Worker.AutoPublish {
		t.Errorf("AutoPublish = false; want true")
	}
	if cfg.Worker.ProviderKind != "claude" {
		t.Errorf("ProviderKind = %q; want %q", cfg.Worker.ProviderKind, "claude")
	}
}

// TestLoadFS_EnvOverride verifies that the STORYFORGE_WORKER_REPO_PATH
// environment variable takes precedence over worker.repo_path from the YAML.
func TestLoadFS_EnvOverride(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": {Data: []byte("worker:\n  repo_path: /yaml\n")},
	}
	env := map[string]string{"STORYFORGE_WORKER_REPO_PATH": "/env"}
	getenv := func(key string) string { return env[key] }

	cfg, err := LoadFS(fsys, "config.yaml", getenv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}

	if cfg.Worker.RepoPath != "/env" {
		t.Errorf("Worker.RepoPath = %q; want %q (env override)", cfg.Worker.RepoPath, "/env")
	}
}

// TestLoadFS_EmptyRepoPath verifies that a config without worker.repo_path,
// and with no environment override, is rejected with an error that names the
// missing field.
func TestLoadFS_EmptyRepoPath(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": {Data: []byte("log:\n  level: info\n")},
	}

	cfg, err := LoadFS(fsys, "config.yaml", noEnv)
	if err == nil {
		t.Fatalf("LoadFS returned config %+v and nil error; want error mentioning repo_path", cfg)
	}
	if cfg != nil {
		t.Errorf("LoadFS returned non-nil config %+v alongside error", cfg)
	}
	if !strings.Contains(err.Error(), "repo_path") {
		t.Errorf("error = %q; want it to mention repo_path", err.Error())
	}
}

// TestLoadFS_Validation is a table-driven test asserting that each invalid
// worker setting is rejected, and that the returned error names the offending
// key. Every case uses an in-memory fstest.MapFS and a fake getenv.
func TestLoadFS_Validation(t *testing.T) {
	const prefix = "worker:\n  repo_path: /r\n"
	tests := []struct {
		name    string
		yaml    string
		wantKey string
	}{
		{
			name:    "rejects a negative execution_timeout and names the key",
			yaml:    prefix + "  execution_timeout: -1m\n",
			wantKey: "execution_timeout",
		},
		{
			name:    "rejects a negative max_retries and names the key",
			yaml:    prefix + "  max_retries: -1\n",
			wantKey: "max_retries",
		},
		{
			name:    "rejects a negative max_budget and names the key",
			yaml:    prefix + "  max_budget: -1\n",
			wantKey: "max_budget",
		},
		{
			name:    "rejects an unknown provider_kind and names the key",
			yaml:    prefix + "  provider_kind: gpt\n",
			wantKey: "provider_kind",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			fsys := fstest.MapFS{
				"config.yaml": {Data: []byte(tc.yaml)},
			}

			cfg, err := LoadFS(fsys, "config.yaml", noEnv)
			if err == nil {
				t.Fatalf("LoadFS returned config %+v and nil error; want error mentioning %q", cfg, tc.wantKey)
			}
			if cfg != nil {
				t.Errorf("LoadFS returned non-nil config %+v alongside error", cfg)
			}
			if !strings.Contains(err.Error(), tc.wantKey) {
				t.Errorf("error = %q; want it to mention %q", err.Error(), tc.wantKey)
			}
		})
	}
}

// TestLoadFS_ValidProviders verifies that the two supported provider kinds,
// mock and claude, are accepted and that ProviderKind keeps the input value.
func TestLoadFS_ValidProviders(t *testing.T) {
	for _, kind := range []string{"mock", "claude"} {
		t.Run(kind, func(t *testing.T) {
			fsys := fstest.MapFS{
				"config.yaml": {Data: []byte("worker:\n  repo_path: /r\n  provider_kind: " + kind + "\n")},
			}

			cfg, err := LoadFS(fsys, "config.yaml", noEnv)
			if err != nil {
				t.Fatalf("LoadFS returned error for provider_kind %q: %v", kind, err)
			}
			if cfg.Worker.ProviderKind != kind {
				t.Errorf("ProviderKind = %q; want %q", cfg.Worker.ProviderKind, kind)
			}
		})
	}
}
