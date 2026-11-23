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
