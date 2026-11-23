package config

import (
	"testing"
	"testing/fstest"
	"time"
)

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
