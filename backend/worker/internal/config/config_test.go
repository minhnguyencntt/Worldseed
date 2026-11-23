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
