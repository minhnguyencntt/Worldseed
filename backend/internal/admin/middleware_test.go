package admin

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

// Given admin middleware guarding a handler with the token "s3cret",
// when a request arrives with missing, wrong, non-bearer or empty credentials,
// then it responds 401 and the guarded handler is never invoked.
// Given the correct "Bearer s3cret" credential,
// when the request arrives, then the guarded handler runs and responds 200.
func TestMiddleware(t *testing.T) {
	tests := []struct {
		name       string
		token      string
		header     string
		wantStatus int
		wantNext   bool
	}{
		{name: "no Authorization header is rejected", token: "s3cret", header: "", wantStatus: http.StatusUnauthorized, wantNext: false},
		{name: "wrong bearer token is rejected", token: "s3cret", header: "Bearer wrong", wantStatus: http.StatusUnauthorized, wantNext: false},
		{name: "Basic scheme with the right secret is rejected", token: "s3cret", header: "Basic s3cret", wantStatus: http.StatusUnauthorized, wantNext: false},
		{name: "correct bearer token is accepted", token: "s3cret", header: "Bearer s3cret", wantStatus: http.StatusOK, wantNext: true},
		{name: "empty configured token rejects an empty bearer credential", token: "", header: "Bearer ", wantStatus: http.StatusUnauthorized, wantNext: false},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			called := false
			next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				called = true
				w.WriteHeader(http.StatusOK)
			})

			h := Middleware(tc.token)(next)
			req := httptest.NewRequest(http.MethodGet, "/admin", nil)
			if tc.header != "" {
				req.Header.Set("Authorization", tc.header)
			}
			rec := httptest.NewRecorder()

			h.ServeHTTP(rec, req)

			if rec.Code != tc.wantStatus {
				t.Errorf("status = %d, want %d", rec.Code, tc.wantStatus)
			}
			if called != tc.wantNext {
				t.Errorf("next called = %v, want %v", called, tc.wantNext)
			}
		})
	}
}
