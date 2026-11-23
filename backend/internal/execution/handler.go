package execution

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Service is the set of execution operations the HTTP handler needs.
type Service interface {
	List(ctx context.Context) ([]Execution, error)
	Retry(ctx context.Context, id string) (Execution, error)
	Approve(ctx context.Context, id string) (Execution, error)
}

// Handler serves the admin execution endpoints.
type Handler struct {
	Service Service
}

// List responds 200 with the JSON array of executions; an empty store yields [].
func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	list, err := h.Service.List(r.Context())
	if err != nil {
		h.fail(w, "list", err)
		return
	}
	if list == nil {
		list = []Execution{}
	}
	writeJSON(w, http.StatusOK, list)
}

// Retry responds 200 with the requeued execution for the id URL parameter.
// It responds 404 for an unknown id and 409 when the execution is not FAILED.
func (h *Handler) Retry(w http.ResponseWriter, r *http.Request) {
	ex, err := h.Service.Retry(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.fail(w, "retry", err)
		return
	}
	writeJSON(w, http.StatusOK, ex)
}

// Approve responds 200 with the approved execution for the id URL parameter.
// It responds 404 for an unknown id and 409 when the execution is not AWAITING_APPROVAL.
func (h *Handler) Approve(w http.ResponseWriter, r *http.Request) {
	ex, err := h.Service.Approve(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.fail(w, "approve", err)
		return
	}
	writeJSON(w, http.StatusOK, ex)
}

// fail maps ErrNotFound to 404, ErrIllegalState to 409 and anything else to 500.
func (h *Handler) fail(w http.ResponseWriter, op string, err error) {
	switch {
	case errors.Is(err, ErrNotFound):
		http.Error(w, "not found", http.StatusNotFound)
	case errors.Is(err, ErrIllegalState):
		http.Error(w, err.Error(), http.StatusConflict)
	default:
		slog.Error("execution: "+op, "err", err)
		http.Error(w, "internal error", http.StatusInternalServerError)
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
