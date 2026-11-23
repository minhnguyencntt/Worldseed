// Package config loads the StoryForge local worker YAML configuration.
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
	defaultPollInterval     = 30 * time.Second
	defaultExecutionTimeout = 30 * time.Minute
	defaultMaxRetries       = 2
	defaultLogLevel         = "info"
	defaultStoreDir         = ".storyforge/executions"
	defaultStoreLockPath    = ".storyforge/worker.lock"
	defaultWorldID          = "the-boys-room"
	defaultWorkRoot         = ".storyforge/work"
	defaultMaxBudget        = 5.0
	defaultProviderKind     = "mock"
)

// Config is the root worker configuration.
type Config struct {
	Worker WorkerConfig `yaml:"worker"`
	Log    LogConfig    `yaml:"log"`
	Store  StoreConfig  `yaml:"store"`
}

// WorkerConfig controls which world the worker serves and how it polls and executes.
type WorkerConfig struct {
	WorldID          string        `yaml:"world_id"`
	RepoPath         string        `yaml:"repo_path"`
	PollInterval     time.Duration `yaml:"poll_interval"`
	ExecutionTimeout time.Duration `yaml:"execution_timeout"`
	MaxRetries       int           `yaml:"max_retries"`
	WorkRoot         string        `yaml:"work_root"`
	MaxBudget        float64       `yaml:"max_budget"`
	AutoPublish      bool          `yaml:"auto_publish"`
	ProviderKind     string        `yaml:"provider_kind"`
}

// LogConfig controls worker logging.
type LogConfig struct {
	Level string `yaml:"level"`
}

// StoreConfig locates the execution state directory and the worker lock file.
type StoreConfig struct {
	Dir      string `yaml:"dir"`
	LockPath string `yaml:"lock_path"`
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

	if cfg.Worker.RepoPath == "" {
		return nil, errors.New("config: worker.repo_path must not be empty")
	}

	if cfg.Worker.PollInterval == 0 {
		cfg.Worker.PollInterval = defaultPollInterval
	}
	if cfg.Worker.ExecutionTimeout == 0 {
		cfg.Worker.ExecutionTimeout = defaultExecutionTimeout
	}
	if cfg.Worker.MaxRetries == 0 {
		cfg.Worker.MaxRetries = defaultMaxRetries
	}
	if cfg.Worker.WorkRoot == "" {
		cfg.Worker.WorkRoot = defaultWorkRoot
	}
	if cfg.Worker.MaxBudget == 0 {
		cfg.Worker.MaxBudget = defaultMaxBudget
	}
	if cfg.Worker.ProviderKind == "" {
		cfg.Worker.ProviderKind = defaultProviderKind
	}
	if cfg.Log.Level == "" {
		cfg.Log.Level = defaultLogLevel
	}
	if cfg.Store.Dir == "" {
		cfg.Store.Dir = defaultStoreDir
	}
	if cfg.Store.LockPath == "" {
		cfg.Store.LockPath = defaultStoreLockPath
	}
	if cfg.Worker.WorldID == "" {
		cfg.Worker.WorldID = defaultWorldID
	}

	if err := validate(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

func applyEnv(cfg *Config, getenv func(string) string) {
	override := func(dst *string, key string) {
		if v := getenv(key); v != "" {
			*dst = v
		}
	}
	override(&cfg.Worker.RepoPath, "STORYFORGE_WORKER_REPO_PATH")
	override(&cfg.Worker.WorldID, "STORYFORGE_WORKER_WORLD_ID")
}

func validate(cfg *Config) error {
	w := cfg.Worker
	if w.ExecutionTimeout < 0 {
		return errors.New("config: worker.execution_timeout must not be negative")
	}
	if w.MaxRetries < 0 {
		return errors.New("config: worker.max_retries must not be negative")
	}
	if w.MaxBudget < 0 {
		return errors.New("config: worker.max_budget must not be negative")
	}
	if w.ProviderKind != "mock" && w.ProviderKind != "claude" {
		return fmt.Errorf("config: worker.provider_kind %q must be mock or claude", w.ProviderKind)
	}
	return nil
}
