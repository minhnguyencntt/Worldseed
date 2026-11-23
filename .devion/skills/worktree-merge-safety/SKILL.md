---
name: worktree-merge-safety
description: Safely and efficiently integrate code from one or more Git worktrees into a target branch while preserving every valuable change. Use when merging, cherry-picking, rebasing, consolidating, or cleaning up agent-created worktrees, especially in parallel AI coding workflows.
---

# Worktree Merge Safety

## Mission

Integrate worktree changes into the intended target branch **quickly without losing code**. Correctness and preservation take priority over speed. Never assume a worktree is disposable or that its changes are already committed.

## Non-negotiable safety rules

1. **Never discard work as a shortcut.** Do not use `git reset --hard`, `git clean -fd`, forced checkout, force-push, or destructive stash operations.
2. Never delete a worktree, branch, stash, backup ref, or untracked file until its contents are accounted for and the integrated result is verified.
3. Do not overwrite conflict sides blindly. Understand each conflicting hunk and preserve all non-conflicting intent.
4. Do not commit unrelated user changes. Separate task changes from pre-existing modifications.
5. If the target branch, source worktree, or intended merge direction is ambiguous, stop and ask one focused question.
6. Do not claim success until Git state and required checks have been inspected.

## Fast, safe workflow

### 1. Identify source and target

Collect:
- Target repository and target branch (the branch that should receive the changes).
- Source worktree path(s) and their branches.
- Current HEAD commit for each worktree.
- Working-tree status, including staged, unstaged, and untracked files.
- Whether any source worktree has ongoing agent activity.

Useful commands:

```bash
git worktree list --porcelain
git status --short --branch
git branch --show-current
git log -1 --oneline
git diff --stat
git diff --cached --stat
git ls-files --others --exclude-standard
```

Run status and diff commands from each relevant worktree. Do not infer a clean state from the main repository alone.

### 2. Preserve a recovery point before integration

For every source branch, record its current commit. Create a uniquely named backup ref pointing to that commit, for example:

```bash
git branch backup/worktree-<task>-<timestamp> <source-branch>
```

If there are uncommitted changes:
- Preserve them in place; do not reset or clean.
- Prefer creating a patch backup outside the repository for tracked changes:

```bash
git diff > /tmp/<task>-working-tree.patch
git diff --cached > /tmp/<task>-staged.patch
```

- Also inventory untracked files and copy or archive them if they contain task work. A normal `git diff` does not include untracked files.
- If the worktree has staged and unstaged edits, preserve both separately.
- Do not rely on a stash as the only backup. If a stash is used, record its exact stash commit and verify it exists.

If a source worktree has active processes or an agent still writing files, do not integrate or clean it up until it is stopped or the user confirms a safe checkpoint.

### 3. Understand the change set

Compare source to target using merge-base-aware diffs:

```bash
git merge-base <target-branch> <source-branch>
git diff --stat <target-branch>...<source-branch>
git diff --name-status <target-branch>...<source-branch>
git log --oneline --graph --decorate <target-branch>..<source-branch>
```

Inspect actual diffs for sensitive/high-impact files:
- project and solution files
- dependency manifests and lockfiles
- configuration and secrets
- database migrations
- generated files
- shared contracts and public APIs
- tests and CI/build scripts

Check whether the source branch already contains target changes or whether multiple worktrees share commits. Avoid integrating the same commit twice.

### 4. Choose the least risky integration method

Use this decision order:

- **Clean, committed source branch:** merge with `--no-ff` when preserving branch history is useful; otherwise use a normal merge. Prefer merge over cherry-pick when the whole branch belongs together.
- **Small, isolated committed change:** cherry-pick only when the user explicitly wants selected commits or the branch contains unrelated work.
- **Uncommitted source changes:** do not merge a branch and assume those edits are included. First preserve and review them, then commit only task-related changes on the source branch or create a patch and apply it to a safe integration branch.
- **Multiple source worktrees:** integrate sequentially, one at a time, validating after each. Recompute diffs after every merge because earlier merges may change later conflict outcomes.
- **Rebase:** use only when requested or required by the repository's contribution policy. Never rewrite shared/published history without explicit approval.

Before running a merge, confirm the current worktree is the intended target and has no unrelated uncommitted changes. If it is dirty, create a separate integration worktree or stop and ask.

### 5. Resolve conflicts conservatively

For each conflicted file:

1. Read the complete file and both sides of the conflict.
2. Determine the purpose of each side from surrounding code, related commits, tests, and task requirements.
3. Preserve compatible behavior from both sides; do not mechanically choose `ours` or `theirs`.
4. Keep imports, registrations, dependency injection, routes, configuration, and tests consistent.
5. Search for conflict markers after resolution:

```bash
git diff --check
git grep -n -E '^(<<<<<<<|=======|>>>>>>>)' -- .
```

6. Review the resolved diff before staging.

If intent cannot be inferred safely, leave the conflict unresolved and ask for clarification rather than guessing.

### 6. Verify the integrated result

At minimum:

```bash
git status --short --branch
git diff --check
git diff --stat <pre-merge-target>..HEAD
```

Then run the repository's relevant checks, in priority order:
1. Focused tests for changed components.
2. Full unit tests.
3. Build/compile.
4. Lint, formatting, static analysis, and integration tests when available.

For .NET repositories, inspect the solution and run the appropriate `dotnet test` and `dotnet build` commands. Do not invent solution paths; discover them first.

Review:
- all expected source files are present
- no task changes disappeared
- no unrelated files were introduced
- dependency and migration changes are coherent
- tests cover the merged behavior
- generated artifacts are not accidentally committed

If checks fail, distinguish pre-existing failures from regressions. Do not report a clean merge when verification is incomplete.

### 7. Commit and report

Only create a merge/integration commit if the repository workflow expects one or the user authorized it. Before committing:
- inspect `git diff --cached`
- ensure only intended files are staged
- use a descriptive message
- record the resulting commit hash

Report:
- source worktree(s) and branches integrated
- target branch and resulting commit
- files/areas changed
- conflict resolutions and notable decisions
- tests/build commands and outcomes
- remaining risks or checks not run
- backup refs/patches retained

### 8. Cleanup is a separate, gated operation

Do not automatically remove source worktrees or branches after a successful merge.

Cleanup is allowed only when:
- the target contains all intended changes;
- source commits and uncommitted/untracked changes are accounted for;
- verification has passed or the user explicitly accepts outstanding failures;
- no agent/process is still using the worktree;
- the user has authorized cleanup, or the repository workflow explicitly grants it.

Before removal, show the exact worktree and branch to be removed. Keep backup refs until the user confirms they are no longer needed.

## Automated merges (Devion forge)

When Devion runs this skill during Merge Worktree, no person is available to answer, and the operator has chosen that the merge must land.

1. Resolve every listed file with your best judgment. Rule 5 and the "ask for clarification" fallback in step 5 do not apply here.
2. Combine both sides wherever they can coexist. If two changes truly cannot coexist, keep the case branch behavior, because it is the newer work, and still keep every base-branch change that does not contradict it.
3. Do not commit, abort the merge, reset, clean, or stash. Devion stages the result and creates the merge commit.
4. Leave files under `.devion/` alone. They are Devion's own state, and Devion resolves them.
5. `.devion/worktrees/*` and `.verify-scratch/` are full checkouts by design. A check that reports code inside them has a false positive: it has not found a stray copy. Never delete them to satisfy a check.
6. If the repository's merge hook rejects the commit, fix the code when the merge caused the failure. If the merge did not cause it (an environment problem, a false positive, or a failure that already existed), change nothing and reply `ok: false` with the reason. Devion then commits without the hook and records the rejection in the merge log, so the result stays honest.

## Parallel-agent integration strategy

When several agents work in separate worktrees:

1. Give each task its own branch/worktree and a clear file/module ownership boundary.
2. Ask each agent to finish with a concise change summary, commit hash, tests run, and known risks.
3. Freeze/checkpoint each source worktree before integration.
4. Integrate foundational/shared-contract changes first, then dependent feature branches.
5. Integrate one branch at a time and run focused tests after each.
6. If branches touch the same files, inspect semantic overlap before merging; do not rely on Git's conflict detector alone.
7. Run the full quality gate after all integrations.
8. Keep all source worktrees and recovery refs until final verification and cleanup approval.

## Completion standard

A merge is complete only when:
- intended changes are present in the target;
- source changes are recoverable;
- no unresolved conflict markers remain;
- the target working tree is in the expected state;
- relevant verification results are reported honestly.

When time is limited, reduce the scope of verification—not the preservation safeguards.
