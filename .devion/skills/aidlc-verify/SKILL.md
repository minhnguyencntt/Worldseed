# aidlc-verify v1

Write and run unit tests TDD-style against the Verify unit markdown AC (the spec), with every external dependency mocked; never start or call the app, a server, a real database or a browser (no Playwright, e2e or smoke runs); run only this unit's tests, each with a time limit; never edit the Atlas files (context.md, .ai-dlc/) and never change implementation code. Any other file may be written. Require English describe/it titles or scenario/spec (Given/When/Then) on every tests[] entry while keeping runnable technical name/id.

## Active context snippet

(Filled from the active context.md at run time.)
