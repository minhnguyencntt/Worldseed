package config

import (
	"os"
	"reflect"
	"sort"
	"testing"
	"testing/fstest"
	"time"

	"gopkg.in/yaml.v3"
)

// expectedTopLevelKeys is the exact set of top-level configuration sections
// that the backend accepts. No worker or execution section may appear here.
var expectedTopLevelKeys = []string{
	"admin", "auth", "contribution", "git", "hosting", "round", "server", "storage",
}

func sortedCopy(in []string) []string {
	out := append([]string(nil), in...)
	sort.Strings(out)
	return out
}

// Given the Config struct type,
// when its exported fields are enumerated,
// then the set of field names equals Server, Auth, Git, Hosting, Storage,
// Contribution, Admin and Round, with no worker or execution field.
func TestConfig_HasNoWorkerFields(t *testing.T) {
	typ := reflect.TypeOf(Config{})
	got := make([]string, 0, typ.NumField())
	for i := 0; i < typ.NumField(); i++ {
		got = append(got, typ.Field(i).Name)
	}

	want := []string{"Server", "Auth", "Git", "Hosting", "Storage", "Contribution", "Admin", "Round"}
	if !reflect.DeepEqual(sortedCopy(got), sortedCopy(want)) {
		t.Errorf("Config fields = %v, want exactly %v", sortedCopy(got), sortedCopy(want))
	}
}

// Given the checked-in backend/configs/config.example.yaml,
// when it is unmarshalled into a generic map,
// then its top-level keys are exactly server, auth, git, hosting, storage,
// contribution, admin and round.
func TestExampleYAML_TopLevelKeys(t *testing.T) {
	raw, err := os.ReadFile("../../configs/config.example.yaml")
	if err != nil {
		t.Fatalf("read example config: %v", err)
	}

	var doc map[string]any
	if err := yaml.Unmarshal(raw, &doc); err != nil {
		t.Fatalf("parse example config: %v", err)
	}

	got := make([]string, 0, len(doc))
	for k := range doc {
		got = append(got, k)
	}
	if !reflect.DeepEqual(sortedCopy(got), sortedCopy(expectedTopLevelKeys)) {
		t.Errorf("example config top-level keys = %v, want exactly %v", sortedCopy(got), sortedCopy(expectedTopLevelKeys))
	}
}

// Given a YAML file containing a legacy worker section alongside auth.token_secret,
// when LoadFS is called,
// then the worker section is ignored, no error is returned, and the auth secret is loaded.
func TestLoadFS_IgnoresWorkerSection(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": &fstest.MapFile{Data: []byte("auth:\n  token_secret: s\nworker:\n  work_root: /tmp\n")},
	}
	noEnv := func(string) string { return "" }

	cfg, err := LoadFS(fsys, "config.yaml", noEnv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}
	if cfg.Auth.TokenSecret != "s" {
		t.Errorf("Auth.TokenSecret = %q, want %q", cfg.Auth.TokenSecret, "s")
	}
}

// Given a YAML file whose values are overridden by STORYFORGE_* variables,
// when LoadFS is called, then the environment values win over the YAML values.
func TestLoadFS_EnvOverrides(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": &fstest.MapFile{Data: []byte(`
auth:
  token_secret: 'yaml-secret'
git:
  token: 'yaml-git'
`)},
	}
	env := map[string]string{
		"STORYFORGE_TOKEN_SECRET":     "env-secret",
		"STORYFORGE_GIT_TOKEN":        "env-git",
		"STORYFORGE_HOSTING_PROVIDER": "cloudflare",
	}
	getenv := func(k string) string { return env[k] }

	cfg, err := LoadFS(fsys, "config.yaml", getenv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}
	if cfg.Auth.TokenSecret != "env-secret" {
		t.Errorf("Auth.TokenSecret = %q, want %q", cfg.Auth.TokenSecret, "env-secret")
	}
	if cfg.Git.Token != "env-git" {
		t.Errorf("Git.Token = %q, want %q", cfg.Git.Token, "env-git")
	}
	if cfg.Hosting.Provider != "cloudflare" {
		t.Errorf("Hosting.Provider = %q, want %q", cfg.Hosting.Provider, "cloudflare")
	}
}

// Given a YAML file without auth.token_secret and no environment override,
// when LoadFS is called, then it returns an error.
// Given a YAML file with a secret but no cookie name or TTL,
// when LoadFS is called, then the defaults sf_session and 720h are applied.
func TestLoadFS_MissingSecretAndDefaults(t *testing.T) {
	noEnv := func(string) string { return "" }

	t.Run("missing secret is rejected", func(t *testing.T) {
		fsys := fstest.MapFS{
			"config.yaml": &fstest.MapFile{Data: []byte("server:\n  addr: ':8080'\n")},
		}
		cfg, err := LoadFS(fsys, "config.yaml", noEnv)
		if err == nil {
			t.Fatalf("LoadFS returned nil error, want error for empty token_secret")
		}
		if cfg != nil {
			t.Errorf("LoadFS returned config %+v alongside error, want nil", cfg)
		}
	})

	t.Run("defaults fill cookie name and token TTL", func(t *testing.T) {
		fsys := fstest.MapFS{
			"config.yaml": &fstest.MapFile{Data: []byte("auth:\n  token_secret: 'secret'\n")},
		}
		cfg, err := LoadFS(fsys, "config.yaml", noEnv)
		if err != nil {
			t.Fatalf("LoadFS returned error: %v", err)
		}
		if cfg.Auth.CookieName != "sf_session" {
			t.Errorf("Auth.CookieName = %q, want %q", cfg.Auth.CookieName, "sf_session")
		}
		if cfg.Auth.TokenTTL != 720*time.Hour {
			t.Errorf("Auth.TokenTTL = %v, want %v", cfg.Auth.TokenTTL, 720*time.Hour)
		}
	})
}

// Given a YAML file that sets only auth.token_secret,
// when LoadFS is called, then storage.repo_path defaults to "." and the contribution
// limits default to max_per_player 5 and max_prompt_len 500.
// Given a YAML file with explicit storage and contribution blocks,
// when LoadFS is called, then those values override the defaults.
func TestLoadFS_ContributionDefaults(t *testing.T) {
	noEnv := func(string) string { return "" }

	t.Run("defaults apply when only auth is configured", func(t *testing.T) {
		fsys := fstest.MapFS{
			"config.yaml": &fstest.MapFile{Data: []byte("auth:\n  token_secret: 'secret'\n")},
		}
		cfg, err := LoadFS(fsys, "config.yaml", noEnv)
		if err != nil {
			t.Fatalf("LoadFS returned error: %v", err)
		}
		if cfg.Storage.RepoPath != "." {
			t.Errorf("Storage.RepoPath = %q, want %q", cfg.Storage.RepoPath, ".")
		}
		if cfg.Contribution.MaxPerPlayer != 5 {
			t.Errorf("Contribution.MaxPerPlayer = %d, want 5", cfg.Contribution.MaxPerPlayer)
		}
		if cfg.Contribution.MaxPromptLen != 500 {
			t.Errorf("Contribution.MaxPromptLen = %d, want 500", cfg.Contribution.MaxPromptLen)
		}
	})

	t.Run("explicit storage and contribution blocks override defaults", func(t *testing.T) {
		fsys := fstest.MapFS{
			"config.yaml": &fstest.MapFile{Data: []byte(`
auth:
  token_secret: 'secret'
storage:
  repo_path: '/srv/content'
  content_dir: 'game/custom'
contribution:
  min_prompt_len: 10
  max_prompt_len: 120
  max_per_player: 2
  rate_max: 7
  rate_window: 30s
`)},
		}
		cfg, err := LoadFS(fsys, "config.yaml", noEnv)
		if err != nil {
			t.Fatalf("LoadFS returned error: %v", err)
		}
		if cfg.Storage.RepoPath != "/srv/content" {
			t.Errorf("Storage.RepoPath = %q, want %q", cfg.Storage.RepoPath, "/srv/content")
		}
		if cfg.Storage.ContentDir != "game/custom" {
			t.Errorf("Storage.ContentDir = %q, want %q", cfg.Storage.ContentDir, "game/custom")
		}
		if cfg.Contribution.MinPromptLen != 10 {
			t.Errorf("Contribution.MinPromptLen = %d, want 10", cfg.Contribution.MinPromptLen)
		}
		if cfg.Contribution.MaxPromptLen != 120 {
			t.Errorf("Contribution.MaxPromptLen = %d, want 120", cfg.Contribution.MaxPromptLen)
		}
		if cfg.Contribution.MaxPerPlayer != 2 {
			t.Errorf("Contribution.MaxPerPlayer = %d, want 2", cfg.Contribution.MaxPerPlayer)
		}
		if cfg.Contribution.RateMax != 7 {
			t.Errorf("Contribution.RateMax = %d, want 7", cfg.Contribution.RateMax)
		}
		if cfg.Contribution.RateWindow != 30*time.Second {
			t.Errorf("Contribution.RateWindow = %v, want %v", cfg.Contribution.RateWindow, 30*time.Second)
		}
	})
}

// Given a YAML file that sets only auth.token_secret and an environment where
// STORYFORGE_ADMIN_TOKEN is "tok",
// when LoadFS is called, then round defaults (24h, 1.0.0, 30s) are applied and
// Admin.Token takes the environment value.
func TestLoadFS_AdminAndRoundDefaults(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": &fstest.MapFile{Data: []byte("auth:\n  token_secret: 'secret'\n")},
	}
	getenv := func(k string) string {
		if k == "STORYFORGE_ADMIN_TOKEN" {
			return "tok"
		}
		return ""
	}

	cfg, err := LoadFS(fsys, "config.yaml", getenv)
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}
	if cfg.Round.Duration != 24*time.Hour {
		t.Errorf("Round.Duration = %v, want %v", cfg.Round.Duration, 24*time.Hour)
	}
	if cfg.Round.BaseRelease != "1.0.0" {
		t.Errorf("Round.BaseRelease = %q, want %q", cfg.Round.BaseRelease, "1.0.0")
	}
	if cfg.Round.SchedulerInterval != 30*time.Second {
		t.Errorf("Round.SchedulerInterval = %v, want %v", cfg.Round.SchedulerInterval, 30*time.Second)
	}
	if cfg.Admin.Token != "tok" {
		t.Errorf("Admin.Token = %q, want %q", cfg.Admin.Token, "tok")
	}
}

// Given the checked-in backend/configs/config.example.yaml,
// when Load reads it from disk,
// then no error is returned, Server.Addr is ":8080", Round.Duration is 24h
// and Contribution.MaxPromptLen is 500.
func TestLoad_ExampleConfig(t *testing.T) {
	cfg, err := Load("../../configs/config.example.yaml")
	if err != nil {
		t.Fatalf("Load returned error: %v", err)
	}
	if cfg.Server.Addr != ":8080" {
		t.Errorf("Server.Addr = %q, want %q", cfg.Server.Addr, ":8080")
	}
	if cfg.Round.Duration != 24*time.Hour {
		t.Errorf("Round.Duration = %v, want %v", cfg.Round.Duration, 24*time.Hour)
	}
	if cfg.Contribution.MaxPromptLen != 500 {
		t.Errorf("Contribution.MaxPromptLen = %d, want 500", cfg.Contribution.MaxPromptLen)
	}
}

// Given a minimal YAML file containing only auth.token_secret,
// when LoadFS is called with a getenv that returns "" for every key,
// then Round.SchedulerInterval is 30s, Storage.ContentDir is "game/content"
// and Contribution.RateMax is 3.
func TestLoadFS_MinimalDefaults(t *testing.T) {
	fsys := fstest.MapFS{
		"config.yaml": &fstest.MapFile{Data: []byte("auth:\n  token_secret: s\n")},
	}
	cfg, err := LoadFS(fsys, "config.yaml", func(string) string { return "" })
	if err != nil {
		t.Fatalf("LoadFS returned error: %v", err)
	}
	if cfg.Round.SchedulerInterval != 30*time.Second {
		t.Errorf("Round.SchedulerInterval = %v, want %v", cfg.Round.SchedulerInterval, 30*time.Second)
	}
	if cfg.Storage.ContentDir != "game/content" {
		t.Errorf("Storage.ContentDir = %q, want %q", cfg.Storage.ContentDir, "game/content")
	}
	if cfg.Contribution.RateMax != 3 {
		t.Errorf("Contribution.RateMax = %d, want 3", cfg.Contribution.RateMax)
	}
}
