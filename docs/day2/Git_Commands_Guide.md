# Git Commands Guide - Day 2

## Branch Management

### Creating and Switching to a New Branch
```bash
git checkout -b newBranchName
```
**Definition:** Creates a new branch with the specified name and immediately switches to it.

**Details:**
- `-b` flag tells Git to create a new branch
- This is a shorthand for `git branch newBranchName` followed by `git checkout newBranchName`
- The new branch is created from your current branch's position
- Useful for starting work on a new feature or bug fix

**Example:**
```bash
git checkout -b feature/user-authentication
```

---

## Remote Repository Operations

### First Push with Upstream Setting
```bash
git push --set-upstream origin practice
```
**Definition:** Pushes your local branch to the remote repository and sets up tracking between your local branch and the remote branch.

**Details:**
- `--set-upstream` (or `-u`) establishes a tracking relationship between local and remote branches
- `origin` is the default name for the remote repository
- `practice` is the name of the branch on the remote repository
- After setting upstream once, you can use just `git push` for subsequent pushes
- This command is required for the first push of a new branch

**Example:**
```bash
git push --set-upstream origin feature/login-page
```

---

## Merging Branches

### Merge Command
```bash
git merge main
```
**Definition:** Integrates changes from the `main` branch into your current branch.

**Details:**
- Combines the histories of two branches
- You must be on the branch that will receive the changes (target branch)
- Git will create a merge commit if there are changes from both branches
- If there are conflicts, Git will pause and ask you to resolve them manually
- Best practice: ensure your working directory is clean before merging

**Example:**
```bash
# Switch to your feature branch
git checkout feature/new-feature
# Merge main into your feature branch
git merge main
```

---

## Git Stash - Temporary Storage

### What is Git Stash?
Git stash temporarily shelves (or stashes) changes you've made to your working directory so you can work on something else, and then come back and re-apply them later.

### Save Changes Temporarily
```bash
git stash
```
**Definition:** Saves your modified tracked files and staged changes to a stack of unfinished changes.

**Details:**
- Reverts your working directory to match the HEAD commit
- Useful when you need to quickly switch contexts but aren't ready to commit
- Only stashes tracked files (files Git is already tracking)
- Untracked files are not stashed by default
- Creates a stash entry with an automatic message

**Example Scenario:**
```bash
# You're working on feature A
# Suddenly need to fix a bug on another branch
git stash              # Save current work
git checkout hotfix    # Switch to hotfix branch
# Fix the bug...
git checkout feature-A # Return to your feature
git stash pop         # Restore your work
```

---

### View All Stashed Changes
```bash
git stash list
```
**Definition:** Displays a list of all stashed changes in your repository.

**Details:**
- Shows stash entries in reverse chronological order (newest first)
- Each stash has an identifier like `stash@{0}`, `stash@{1}`, etc.
- `stash@{0}` is always the most recent stash
- Displays the branch name and commit where each stash was created
- Shows the stash message

**Example Output:**
```
stash@{0}: WIP on feature: 5a3b2c1 Added login form
stash@{1}: WIP on main: 8d7e6f4 Updated documentation
stash@{2}: WIP on bugfix: 2c1a9b8 Fixed validation error
```

---

### Apply Stashed Changes (Keep in Stash List)
```bash
git stash apply
```
**Definition:** Reapplies the most recent stashed changes to your working directory without removing them from the stash list.

**Details:**
- Applies the most recent stash (`stash@{0}`) by default
- Keeps the stash in the stash list for later use
- Can apply a specific stash: `git stash apply stash@{1}`
- Useful when you want to apply the same changes to multiple branches
- May result in merge conflicts if files have changed since stashing

**Example:**
```bash
# Apply most recent stash
git stash apply

# Apply a specific stash
git stash apply stash@{2}
```

---

### Apply and Remove Stashed Changes
```bash
git stash pop
```
**Definition:** Reapplies the most recent stashed changes to your working directory and removes it from the stash list.

**Details:**
- Combination of `git stash apply` + `git stash drop`
- Removes the stash from the list after successful application
- If there are conflicts, the stash is NOT dropped (remains in list)
- Most commonly used stash command for typical workflows
- Applies `stash@{0}` by default

**Example:**
```bash
# Pop the most recent stash
git stash pop

# Pop a specific stash
git stash pop stash@{1}
```

---

## Comparison: git stash apply vs git stash pop

| Feature | `git stash apply` | `git stash pop` |
|---------|------------------|-----------------|
| Applies changes | ✓ | ✓ |
| Removes from stash list | ✗ | ✓ |
| Use case | When you need the stash multiple times | When you're done with the stash |
| After conflicts | Stash remains | Stash remains |

---

## Common Git Stash Workflows

### Quick Context Switch
```bash
git stash              # Save current work
git checkout main      # Switch branches
# Do some work...
git checkout -         # Return to previous branch
git stash pop          # Restore work
```

### Stash with Message
```bash
git stash save "Work in progress on login feature"
```

### Stash Including Untracked Files
```bash
git stash -u
```

### Drop a Specific Stash
```bash
git stash drop stash@{1}
```

### Clear All Stashes
```bash
git stash clear
```

---

## Best Practices

1. **Use descriptive names** when creating branches
2. **Set upstream on first push** to simplify future pushes
3. **Merge frequently** from main to keep your branch up to date
4. **Stash with messages** for clarity: `git stash save "message"`
5. **Review stash list** before applying to ensure you're getting the right changes
6. **Use `git stash pop`** for typical workflows to keep stash list clean
7. **Use `git stash apply`** when you need to test changes on multiple branches

---

## Tips and Tricks

- After setting upstream once, use `git push` without additional parameters
- Use `git merge --no-ff` to force a merge commit even for fast-forward merges
- Check `git stash show` to preview what's in a stash before applying
- Use `git stash branch <branchname>` to create a new branch from a stash
- Remember: stashes are local only and are not pushed to remote repositories
