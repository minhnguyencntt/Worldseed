package player

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"
	"time"
)

var hexID = regexp.MustCompile(`^[0-9a-f]{32}$`)

func newTestHandler() *Handler {
	return &Handler{
		Secret:     []byte("s1"),
		CookieName: "sf_session",
		TTL:        time.Hour,
		Secure:     true,
	}
}

func postSession(t *testing.T, h *Handler) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/player/session", nil)
	rec := httptest.NewRecorder()
	h.CreateSession(rec, req)
	return rec
}

// Spec: POST creates a session that responds 201 with a 32-char lowercase hex id,
// and sets an HttpOnly, Secure, SameSite=Lax cookie on path "/" with MaxAge 3600
// whose value verifies to the id in the body.
func TestCreateSession_CookieAndID(t *testing.T) {
	h := newTestHandler()

	rec := postSession(t, h)

	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusCreated)
	}

	var body map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	id := body["id"]
	if !hexID.MatchString(id) {
		t.Fatalf("body id = %q, want 32 lowercase hex chars", id)
	}

	var cookie *http.Cookie
	for _, c := range rec.Result().Cookies() {
		if c.Name == "sf_session" {
			cookie = c
		}
	}
	if cookie == nil {
		t.Fatal("cookie sf_session not set")
	}
	if !cookie.HttpOnly {
		t.Error("cookie HttpOnly = false, want true")
	}
	if !cookie.Secure {
		t.Error("cookie Secure = false, want true")
	}
	if cookie.Path != "/" {
		t.Errorf("cookie Path = %q, want %q", cookie.Path, "/")
	}
	if cookie.MaxAge != 3600 {
		t.Errorf("cookie MaxAge = %d, want 3600", cookie.MaxAge)
	}
	if cookie.SameSite != http.SameSiteLaxMode {
		t.Errorf("cookie SameSite = %v, want Lax", cookie.SameSite)
	}

	verified, err := Verify(h.Secret, cookie.Value, time.Now(), h.TTL)
	if err != nil {
		t.Fatalf("cookie value does not verify: %v", err)
	}
	if verified != id {
		t.Fatalf("cookie verifies to %q, body id is %q", verified, id)
	}
}

// Spec: two independent session creations yield different ids.
func TestCreateSession_UniqueIDs(t *testing.T) {
	h := newTestHandler()

	decode := func(rec *httptest.ResponseRecorder) string {
		t.Helper()
		var body map[string]string
		if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
			t.Fatalf("decode body: %v", err)
		}
		return body["id"]
	}

	first := decode(postSession(t, h))
	second := decode(postSession(t, h))

	if first == second {
		t.Fatalf("two sessions returned the same id %q", first)
	}
}
