// Package config loads the StoryForge backend YAML configuration.
package config

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	"gopkg.in/yaml.v3"
)

const (
	defaultCookieName = "sf_session"
	defaultTokenTTL   = 720 * time.Hour
)

// Config is the root backend configuration.
type Config struct {
	Server  ServerConfig  `yaml:"server"`
	Auth    AuthConfig    `yaml:"auth"`
	Git     GitConfig     `yaml:"git"`
	Hosting HostingConfig `yaml:"hosting"`
}

// ServerConfig controls the HTTP listener.
type ServerConfig struct {
	Addr string `yaml:"addr"`
}

// AuthConfig controls session token signing and cookies.
type AuthConfig struct {
	TokenSecret  string        `yaml:"token_secret"`
	CookieName   string        `yaml:"cookie_name"`
	TokenTTL     time.Duration `yaml:"token_ttl"`
	CookieSecure bool          `yaml:"cookie_secure"`
}

// GitConfig describes the content repository and the bot identity used to commit.
type GitConfig struct {
	RemoteURL string `yaml:"remote_url"`
	Branch    string `yaml:"branch"`
	BotName   string `yaml:"bot_name"`
	BotEmail  string `yaml:"bot_email"`
	Token     string `yaml:"token"`
}

// HostingConfig describes the git hosting provider.
type HostingConfig struct {
	Provider string `yaml:"provider"`
	BaseURL  string `yaml:"base_url"`
}

// Load reads the YAML config at path from disk, applying environment overrides.
func Load(path string) (*Config, error) {
	return LoadFS(os.DirFS(filepath.Dir(path)), filepath.Base(path), os.Getenv)
}

// LoadFS reads the YAML config named name from fsys, applies environment
// overrides obtained through getenv, fills defaults and validates the result.
func LoadFS(fsys fs.FS, name string, getenv func(string) string) (*Config, error) {
	raw, err := fs.ReadFile(fsys, name)
	if err != nil {
		return nil, fmt.Errorf("read config %q: %w", name, err)
	}

	var cfg Config
	if err := yaml.Unmarshal(raw, &cfg); err != nil {
		return nil, fmt.Errorf("parse config %q: %w", name, err)
	}

	applyEnv(&cfg, getenv)

	if cfg.Auth.CookieName == "" {
		cfg.Auth.CookieName = defaultCookieName
	}
	if cfg.Auth.TokenTTL == 0 {
		cfg.Auth.TokenTTL = defaultTokenTTL
	}
	if cfg.Auth.TokenSecret == "" {
		return nil, errors.New("config: auth.token_secret must not be empty")
	}

	return &cfg, nil
}

func applyEnv(cfg *Config, getenv func(string) string) {
	override := func(dst *string, key string) {
		if v := getenv(key); v != "" {
			*dst = v
		}
	}
	override(&cfg.Server.Addr, "STORYFORGE_ADDR")
	override(&cfg.Auth.TokenSecret, "STORYFORGE_TOKEN_SECRET")
	override(&cfg.Git.RemoteURL, "STORYFORGE_GIT_REMOTE_URL")
	override(&cfg.Git.Token, "STORYFORGE_GIT_TOKEN")
	override(&cfg.Hosting.Provider, "STORYFORGE_HOSTING_PROVIDER")
	override(&cfg.Hosting.BaseURL, "STORYFORGE_HOSTING_BASE_URL")
}
