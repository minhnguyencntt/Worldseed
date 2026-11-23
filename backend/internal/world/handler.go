package world

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Handler serves the world read endpoints.
type Handler struct {
	Repo *Repo
}

// List responds 200 with the JSON array of worlds.
func (h *Handler) List(w http.ResponseWriter, _ *http.Request) {
	worlds, err := h.Repo.List()
	if err != nil {
		h.fail(w, "list", err)
		return
	}
	writeJSON(w, worlds)
}

// Get responds 200 with the JSON world for the id URL parameter, or 404.
func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	world, err := h.Repo.Get(chi.URLParam(r, "id"))
	if err != nil {
		h.fail(w, "get", err)
		return
	}
	writeJSON(w, world)
}

// Game responds 200 with {"world": {...}, "scenes": [...]} for the id URL
// parameter, or 404.
func (h *Handler) Game(w http.ResponseWriter, r *http.Request) {
	game, err := h.Repo.Game(chi.URLParam(r, "id"))
	if err != nil {
		h.fail(w, "game", err)
		return
	}
	writeJSON(w, game)
}

// CurrentRound responds 200 with the highest-numbered round for the id URL
// parameter, or 404.
func (h *Handler) CurrentRound(w http.ResponseWriter, r *http.Request) {
	round, err := h.Repo.CurrentRound(chi.URLParam(r, "id"))
	if err != nil {
		h.fail(w, "current round", err)
		return
	}
	writeJSON(w, round)
}

// fail writes 404 for ErrNotFound and 500 for anything else.
func (h *Handler) fail(w http.ResponseWriter, op string, err error) {
	if errors.Is(err, ErrNotFound) {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	slog.Error("world: "+op, "err", err)
	http.Error(w, "internal error", http.StatusInternalServerError)
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(v)
}
