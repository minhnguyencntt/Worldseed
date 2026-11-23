package execution

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/go-chi/chi/v5"
)

// fakeService returns canned results so the handler is tested without a store or Git.
type fakeService struct {
	list    []Execution
	listErr error
	ex      Execution
	err     error
}

func (f *fakeService) List(_ context.Context) ([]Execution, error) {
	return f.list, f.listErr
}

func (f *fakeService) Retry(_ context.Context, _ string) (Execution, error) {
	return f.ex, f.err
}

func (f *fakeService) Approve(_ context.Context, _ string) (Execution, error) {
	return f.ex, f.err
}

// router mounts the handler the same way the admin routes do, with {id} path params.
func router(h *Handler) http.Handler {
	r := chi.NewRouter()
	r.Get("/executions", h.List)
	r.Post("/executions/{id}/retry", h.Retry)
	r.Post("/executions/{id}/approve", h.Approve)
	return r
}

func TestHandler_Statuses(t *testing.T) {
	t.Parallel()

	okEx := Execution{ID: "EXE-1", Status: StatusQueued}

	cases := []struct {
		name       string
		path       string
		svc        *fakeService
		wantStatus int
	}{
		{"Given Retry succeeds, When POST retry is called, Then the response is 200", "/executions/EXE-1/retry", &fakeService{ex: okEx}, http.StatusOK},
		{"Given Retry finds no execution, When POST retry is called, Then the response is 404", "/executions/EXE-1/retry", &fakeService{err: ErrNotFound}, http.StatusNotFound},
		{"Given Retry is illegal for the status, When POST retry is called, Then the response is 409", "/executions/EXE-1/retry", &fakeService{err: ErrIllegalState}, http.StatusConflict},
		{"Given Approve succeeds, When POST approve is called, Then the response is 200", "/executions/EXE-2/approve", &fakeService{ex: Execution{ID: "EXE-2", Status: StatusApproved}}, http.StatusOK},
		{"Given Approve finds no execution, When POST approve is called, Then the response is 404", "/executions/EXE-2/approve", &fakeService{err: ErrNotFound}, http.StatusNotFound},
		{"Given Approve is illegal for the status, When POST approve is called, Then the response is 409", "/executions/EXE-2/approve", &fakeService{err: ErrIllegalState}, http.StatusConflict},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			h := &Handler{Service: tc.svc}
			rec := httptest.NewRecorder()
			req := httptest.NewRequest(http.MethodPost, tc.path, nil)

			router(h).ServeHTTP(rec, req)

			if rec.Code != tc.wantStatus {
				t.Fatalf("status = %d, want %d (body %q)", rec.Code, tc.wantStatus, rec.Body.String())
			}
		})
	}

	t.Run("Given no executions, When GET executions is called, Then the body decodes to an empty array", func(t *testing.T) {
		t.Parallel()
		h := &Handler{Service: &fakeService{list: nil}}
		rec := httptest.NewRecorder()

		router(h).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/executions", nil))

		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want 200", rec.Code)
		}
		if got := strings.TrimSpace(rec.Body.String()); got != "[]" {
			t.Fatalf("body = %q, want []", got)
		}
		var decoded []Execution
		if err := json.Unmarshal(rec.Body.Bytes(), &decoded); err != nil {
			t.Fatalf("decode: %v", err)
		}
		if decoded == nil || len(decoded) != 0 {
			t.Errorf("decoded = %#v, want empty non-nil slice", decoded)
		}
	})

	t.Run("Given an unexpected service error, When GET executions is called, Then the response is 500", func(t *testing.T) {
		t.Parallel()
		h := &Handler{Service: &fakeService{listErr: errors.New("disk gone")}}
		rec := httptest.NewRecorder()

		router(h).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/executions", nil))

		if rec.Code != http.StatusInternalServerError {
			t.Fatalf("status = %d, want 500", rec.Code)
		}
	})
}
