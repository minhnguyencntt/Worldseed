# Quick reference: safe worktree integration

```bash
# 1. Inventory
git worktree list --porcelain
git status --short --branch

# 2. Inspect source branch against target
git merge-base main feature/task
git diff --stat main...feature/task
git log --oneline main..feature/task

# 3. Create a recovery ref before integrating
git branch backup/feature-task-20261107 feature/task

# 4. Integrate from a clean target worktree
git switch main
git status --short --branch
git merge --no-ff feature/task

# 5. Verify
git diff --check
git status --short --branch
dotnet test
dotnet build

# 6. Keep the source worktree and backup until explicitly approved for cleanup
```

Adapt branch names and test commands to the repository. Never run cleanup commands blindly.
