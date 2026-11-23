# Round export handoff (devion workseed)

Player contributions that are frozen at the end of a Round are handed off to
devion workseed, which develops the game. This document describes the Round
export that devion workseed consumes.

## Producer: `Exporter.Export`

The export is built by `Exporter.Export(ctx, worldID, roundID)` in
`internal/contribution` (`exporter.go`). The result is an `Export` value
(`export.go`), which the caller serializes to JSON.

- Only contributions whose ids are frozen in the Round snapshot are included.
- Contributions are listed in snapshot order.
- Frozen ids with no matching contribution are skipped.
- When no contributions exist, `contributions` is an empty list (`[]`), never `null`.
- Errors from the source are wrapped with `%w`, so callers can match them with `errors.Is`.

## Format: version 1

`ExportVersion` is `1`. Keys are snake_case.

```json
{
  "version": 1,
  "world_id": "world-1",
  "round_id": "round-3",
  "contributions": [
    {
      "id": "c-001",
      "author": "alice",
      "content": "The gate opens at dawn.",
      "created_at": "2026-01-02T03:04:05Z"
    }
  ]
}
```

### Top-level fields

| Key             | Type                 | Meaning                                              |
| --------------- | -------------------- | ---------------------------------------------------- |
| `version`       | integer              | Format version. Currently `1`.                       |
| `world_id`      | string               | World the contributions belong to.                   |
| `round_id`      | string               | Round the contributions belong to.                   |
| `contributions` | array of objects     | The Round's frozen contributions, in snapshot order. |

### Contribution fields

| Key          | Type   | Meaning                                                  |
| ------------ | ------ | -------------------------------------------------------- |
| `id`         | string | Contribution identifier.                                 |
| `author`     | string | Player who submitted the contribution.                   |
| `content`    | string | Submitted prompt text.                                   |
| `created_at` | string | Submission time in RFC 3339 form (for example `2026-01-02T03:04:05Z`). |

## Consumer guidance

- Consumers, including devion workseed, check `version` first and only then read the other fields.
- Additive changes keep existing keys intact. A change that is not backward compatible bumps `ExportVersion`.
- An empty Round produces `"contributions": []`. Consumers must handle an empty list.
