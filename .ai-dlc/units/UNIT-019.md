# UNIT-019 — Act: Author the-boys-room world and bedroom YAML

## Summary
Create world.yaml and bedroom.yaml

## Description
Write the declarative content matching the runtime types.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/content/worlds/the-boys-room/world.yaml` · `new: world definition` · new
- **Do:** Create world.yaml with id the-boys-room, title "The Boy's Room", startScene bedroom, scenes [bedroom], characters [{id: boy, name: The Boy}], flags [secret_door_open, computer_on].
- **Expected:** Parses into WorldDef.

### Step 2 — `backend/game/content/worlds/the-boys-room/scenes/bedroom.yaml` · `new: bedroom scene` · new
- **Do:** Create bedroom.yaml with id bedroom, openingDialogue intro, dialogue node intro (speaker boy, text "I don't know what to do next. What should we do?", choices: 'Look around the room' next null, 'Let's explore' next null); objects: bed, bookshelf (openWhenFlag secret_door_open; actions inspect, push, search with search events [set_flag secret_door_open true, show_text 'A hidden door swings open behind the books.'], leave), desk, old-computer (inspect, search with set_flag computer_on), window, door (inspect, leave). Each object has name, description and at least an inspect action with show_text.

```
id: bedroom
openingDialogue: intro
dialogue:
  - id: intro
    speaker: boy
    text: "I don't know what to do next. What should we do?"
    choices:
      - text: Look around the room
      - text: Let's explore
```

- **Expected:** validateWorld returns [] for the loaded content.

## Acceptance criteria
- Given the YAML, when loaded, then it matches SceneDef and WorldDef.
- Given the bookshelf, when searched, then secret_door_open is set.

## Definition of done
- Files exist and validate
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-019.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-004
- Requirement: REQ-011
- Unit (Act): UNIT-019
- Unit (Verify): UNIT-023
- Unit (Verify): UNIT-024
- Status: completed
- Change: UPDATE
