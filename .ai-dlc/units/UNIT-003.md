# UNIT-003 — Act: Scaffold backend Go Chi module and YAML config

## Summary
Create root go.mod, Chi /healthz router, LoadFS YAML config, and example YAML.

## Description
Context: No Go backend exists at tip.
Desired behavior: Add root Go module with config.LoadFS and NewRouter GET /healthz.
Expected result: Root builds as a Go module with example YAML; config load uses fs.FS.
Why: Implements REQ-BE product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `go.mod` · `new: module github.com/storyforge/worldseed` · new
- **Do:** Create go.mod with module path github.com/storyforge/worldseed, go 1.22, requiring github.com/go-chi/chi/v5 and gopkg.in/yaml.v3.

```
module github.com/storyforge/worldseed

go 1.22

require (
        github.com/go-chi/chi/v5 v5.1.0
        gopkg.in/yaml.v3 v3.0.1
)
```

- **Expected:** go.mod declares Chi and YAML dependencies.

### Step 2 — `config.go` · `new: LoadFS` · new
- **Do:** Create package main with structs Config, ServerConfig{Addr string `yaml:"addr"`}, GitConfig{RepoPath string `yaml:"repo_path"`}; Config has Server and Git fields with yaml tags server/git. Export LoadFS(fsys fs.FS, name string) (*Config, error) that opens name via fsys.Open, decodes YAML into Config, returns error if open/decode fails or Server.Addr is empty.

```
package main

import (
  "fmt"
  "io/fs"

  "gopkg.in/yaml.v3"
)

type ServerConfig struct {
  Addr string `yaml:"addr"`
}

type GitConfig struct {
  RepoPath string `yaml:"repo_path"`
}

type Config struct {
  Server ServerConfig `yaml:"server"`
  Git    GitConfig    `yaml:"git"`
}

func LoadFS(fsys fs.FS, name string) (*Config, error) {
  f, err := fsys.Open(name)
  if err != nil {
    return nil, err
  }
  defer f.Close()
  var cfg Config
  if err := yaml.NewDecoder(f).Decode(&cfg); err != nil {
    return nil, err
  }
  if cfg.Server.Addr == "" {
    return nil, fmt.Errorf("server.addr is required")
  }
  return &cfg, nil
}
```

- **Expected:** LoadFS decodes YAML from an fs.FS file and validates addr.

### Step 3 — `router.go` · `new: NewRouter` · new
- **Do:** Create package main exporting NewRouter() http.Handler that returns chi.NewRouter with Get /healthz writing status 200 and body ok.

```
package main

import (
  "net/http"

  "github.com/go-chi/chi/v5"
)

func NewRouter() http.Handler {
  r := chi.NewRouter()
  r.Get("/healthz", func(w http.ResponseWriter, _ *http.Request) {
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte("ok"))
  })
  return r
}
```

- **Expected:** NewRouter serves GET /healthz → 200 ok.

### Step 4 — `main.go` · `new: main` · new
- **Do:** Create main that reads optional -config flag default config.example.yaml, loads via LoadFS(os.DirFS("."), path), prints Addr and RepoPath to stdout, and notes router wiring via _ = NewRouter() so the package is linked without listening (Phase-1 stub — do not call ListenAndServe).

```
package main

import (
  "flag"
  "fmt"
  "os"
)

func main() {
  cfgPath := flag.String("config", "config.example.yaml", "path to YAML config")
  flag.Parse()
  cfg, err := LoadFS(os.DirFS("."), *cfgPath)
  if err != nil {
    fmt.Fprintf(os.Stderr, "config: %v\n", err)
    os.Exit(1)
  }
  _ = NewRouter()
  fmt.Printf("storyforge backend config loaded addr=%s repo=%s\n", cfg.Server.Addr, cfg.Git.RepoPath)
}
```

- **Expected:** main loads YAML config and links Chi router without binding a live port.

### Step 5 — `config.example.yaml` · `new: config.example.yaml` · new
- **Do:** Create example YAML with server.addr :8080 and git.repo_path .

```
server:
  addr: ":8080"
git:
  repo_path: "."
```

- **Expected:** Example backend YAML documents addr and repo_path.

## Acceptance criteria
- Given Act complete, when inspecting root paths, then go.mod, main.go, config.go, router.go, and config.example.yaml exist.
- Given LoadFS reading example-shaped YAML, when called, then Addr and RepoPath fields populate from YAML keys server.addr and git.repo_path.

## Definition of done
- All code_paths created
- No test files added by this Act
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-003.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-002
- Requirement: REQ-003
- Unit (Act): UNIT-003
- Unit (Verify): UNIT-007
- Status: completed
- Change: NEW
