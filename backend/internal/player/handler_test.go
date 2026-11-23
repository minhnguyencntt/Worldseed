package player

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"regexp"
	"strings"
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

// Given a handler with a fixed clock and a session cookie signed for player "p1" at that clock,
// when GET /api/v1/player/me is requested with that cookie,
// then it responds 200 with a JSON body whose id is "p1".
func TestMe_ValidToken(t *testing.T) {
	now := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	h := newTestHandler()
	h.Now = func() time.Time { return now }

	req := httptest.NewRequest(http.MethodGet, "/api/v1/player/me", nil)
	req.AddCookie(&http.Cookie{Name: h.CookieName, Value: Sign(h.Secret, "p1", now)})
	rec := httptest.NewRecorder()

	h.Me(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
	var body map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode body: %v (body=%q)", err, rec.Body.String())
	}
	if body["id"] != "p1" {
		t.Fatalf("body id = %q, want %q", body["id"], "p1")
	}
}

// flipLastChar replaces the final base64url character with the one whose index differs
// in a data-carrying bit. Flipping an arbitrary character can change only padding bits,
// which the non-strict decoder ignores, so the token would still verify.
func flipLastChar(s string) string {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
	last := s[len(s)-1]
	idx := strings.IndexByte(alphabet, last)
	return s[:len(s)-1] + string(alphabet[idx^4])
}

// Given a handler with a fixed clock and a 1h TTL,
// when GET /api/v1/player/me is requested with a missing, tampered, wrongly signed,
// expired or malformed session cookie,
// then it responds 401 for each case.
func TestMe_Unauthorized(t *testing.T) {
	now := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	h := newTestHandler()
	h.Now = func() time.Time { return now }

	valid := Sign(h.Secret, "p1", now)

	cases := []struct {
		name   string
		cookie *http.Cookie
	}{
		{name: "no cookie", cookie: nil},
		{name: "last char flipped", cookie: &http.Cookie{Name: h.CookieName, Value: flipLastChar(valid)}},
		{name: "signed with other secret", cookie: &http.Cookie{Name: h.CookieName, Value: Sign([]byte("other"), "p1", now)}},
		{name: "issued 2h ago with 1h TTL", cookie: &http.Cookie{Name: h.CookieName, Value: Sign(h.Secret, "p1", now.Add(-2*time.Hour))}},
		{name: "garbage value", cookie: &http.Cookie{Name: h.CookieName, Value: "xyz"}},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/api/v1/player/me", nil)
			if tc.cookie != nil {
				req.AddCookie(tc.cookie)
			}
			rec := httptest.NewRecorder()

			h.Me(rec, req)

			if rec.Code != http.StatusUnauthorized {
				t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
			}
		})
	}
}
