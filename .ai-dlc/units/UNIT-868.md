# UNIT-868 — Act: Add /api proxy to vite.config.ts

## Summary
Add server.proxy for /api to localhost:8080

## Description
Add a proxy entry to the existing server block in vite.config.ts so dev /api calls reach the Go backend.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/vite.config.ts` · `defineConfig server` · L14-L18
- **Do:** Add a proxy property next to fs in the server object, forwarding '/api' to the Go backend with changeOrigin true.

```
server: { fs: { allow: ['..'] }, proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } } },
```

- **Expected:** The dev server forwards /api/* to http://localhost:8080 instead of serving index.html.

## Acceptance criteria
- server.proxy['/api'].target is 'http://localhost:8080'
- Existing config keys remain

## Definition of done
- vite.config.ts has the proxy
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-868.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-173
- Requirement: REQ-434
- Unit (Act): UNIT-868
- Unit (Verify): UNIT-870
- Status: completed
- Change: NEW
