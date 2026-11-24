# UNIT-012 — Act: Implement player token signing and session endpoint

## Summary
Token sign/verify and POST /api/v1/player/session

## Description
Add the player package with HMAC token Sign/Verify and the session handler setting a Secure HttpOnly cookie, and register the route.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/player/token.go` · `new: Sign, Verify, NewID` · new
- **Do:** Implement NewID() using crypto/rand 16 bytes hex-encoded; Sign(secret []byte, id string, issued time.Time) string returning base64.RawURLEncoding(id+"."+unix) + "." + base64url(HMAC-SHA256 of the first part); Verify(secret []byte, token string, now time.Time, ttl time.Duration) (string, error) splitting on '.', checking hmac.Equal, parsing issued unix, rejecting when now.Sub(issued) > ttl, returning the id; export ErrInvalidToken
- **Expected:** Round trip returns id; tampering returns ErrInvalidToken

### Step 2 — `backend/internal/player/handler.go` · `new: Handler, NewHandler, CreateSession` · new
- **Do:** Define Handler{Secret []byte; CookieName string; TTL time.Duration; Secure bool; Now func() time.Time}. CreateSession generates NewID, signs token, sets http.Cookie{Name, Value, Path '/', MaxAge int(TTL.Seconds()), HttpOnly true, Secure h.Secure, SameSite Lax} and writes 201 JSON {"id":id}
- **Expected:** 201 with Set-Cookie

### Step 3 — `backend/internal/server/server.go` · `New` · after the /healthz route
- **Do:** Construct player.Handler from cfg (Secret []byte(cfg.Auth.TokenSecret), CookieName, TTL, Secure cfg.Auth.CookieSecure, Now time.Now) and register r.Post("/api/v1/player/session", ph.CreateSession)

```
r.Post("/api/v1/player/session", ph.CreateSession)
```

- **Expected:** Route reachable

## Acceptance criteria
- Session returns 201 with id and cookie
- Token verifies with same secret

## Definition of done
- Build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-012.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-003
- Requirement: REQ-007
- Unit (Act): UNIT-012
- Unit (Verify): UNIT-015
- Status: completed
- Change: NEW
