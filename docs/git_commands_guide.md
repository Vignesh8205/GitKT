# 📘 Git Commands — Scenario-Based Guide

> A practical, example-driven reference for everyday Git operations — ordered from foundational concepts to advanced recovery workflows.

---

## 🗂️ Ordered Learning Flow

```
PHASE 1 — Understand         →  Branches & Structure
PHASE 2 — Setup & Navigate   →  Create, View, Explore
PHASE 3 — Daily Work         →  Push, Stash
PHASE 4 — Collaborate        →  Merge, Conflicts
PHASE 5 — History & Recovery →  Log, Revert, Reset
```

---

## Table of Contents

| # | Topic | Phase |
|---|---|---|
| 1 | [What is a Branch?](#1-what-is-a-branch) | 🟦 Understand |
| 2 | [How to Create a Branch from Another Branch](#2-how-to-create-a-branch-from-another-branch) | 🟩 Setup |
| 3 | [How to View Branches](#3-how-to-view-branches) | 🟩 Setup |
| 4 | [How to View Remote Branches Locally](#4-how-to-view-remote-branches-locally) | 🟩 Setup |
| 5 | [How to Push Code](#5-how-to-push-code) | 🟨 Daily Work |
| 6 | [How to Stash Changes and Retrieve Them](#6-how-to-stash-changes-and-retrieve-them) | 🟨 Daily Work |
| 7 | [How to Show Stashed Changes](#7-how-to-show-stashed-changes) | 🟨 Daily Work |
| 8 | [How to Merge Code from One Branch to Another](#8-how-to-merge-code-from-one-branch-to-another) | 🟧 Collaborate |
| 9 | [What is a Conflict?](#9-what-is-a-conflict) | 🟧 Collaborate |
| 10 | [Why Do Conflicts Happen?](#10-why-do-conflicts-happen) | 🟧 Collaborate |
| 11 | [How to Resolve Conflicts](#11-how-to-resolve-conflicts) | 🟧 Collaborate |
| 12 | [How to Log Commits](#12-how-to-log-commits) | 🟥 History & Recovery |
| 13 | [How to Revert Changes](#13-how-to-revert-changes) | 🟥 History & Recovery |
| 14 | [How to Reset a Branch to a Specific Commit (by Message)](#14-how-to-reset-a-branch-to-a-specific-commit-by-message) | 🟥 History & Recovery |
| 15 | [How to Reset a Branch Based on a Parent Branch](#15-how-to-reset-a-branch-based-on-a-parent-branch) | 🟥 History & Recovery |
| 16 | [Reset vs Revert — What's the Difference?](#16-reset-vs-revert--whats-the-difference) | 🟥 History & Recovery |

---

## PHASE 1 — Understand

---

## 1. What is a Branch?

### 📖 Definition
A **branch** is an independent line of development in Git. It allows you to work on a feature, bug fix, or experiment in **complete isolation** without affecting the main codebase.

Think of it like a **parallel universe** of your code. Changes on one branch don't affect others until you deliberately merge them.

### 🧪 Scenario
> Your project has a stable `main` branch live in production. You need to add a "dark mode" feature without risking what's already live.

```
main branch:     A ── B ── C
                            \
feature branch:              D ── E ── F   ← your dark-mode work
```

When `dark-mode` is done and tested, you merge it back into `main`:

```
main branch:     A ── B ── C ──────────── G  (merge commit)
                            \            /
feature branch:              D ── E ── F
```

### 📌 Common Branch Naming Conventions

| Prefix | Purpose | Example |
|---|---|---|
| `feature/` | New feature development | `feature/user-login` |
| `bugfix/` | Bug fix | `bugfix/fix-null-pointer` |
| `hotfix/` | Urgent production fix | `hotfix/payment-crash` |
| `release/` | Release preparation | `release/v2.0.0` |
| `chore/` | Non-production tasks | `chore/update-dependencies` |

### 🔧 Creating and Switching Branches

```bash
# Create a new branch
git branch feature/dark-mode

# Switch to it
git checkout feature/dark-mode

# Create AND switch in one command (classic)
git checkout -b feature/dark-mode

# Modern syntax (Git 2.23+)
git switch -c feature/dark-mode
```

---

## PHASE 2 — Setup & Navigate

---

## 2. How to Create a Branch from Another Branch

### 📖 What it means
You can create a new branch that **starts from a specific existing branch** — not necessarily the one you're currently on. This is the standard way to begin any new feature or fix.

### 🧪 Scenario
> The `develop` branch has a stable version. You want to create a new `feature/notifications` branch that starts from `develop`, not from your current `feature/dashboard` branch.

### 🔧 Method 1 — Switch first, then create

```bash
# Step 1 — Switch to the source branch
git checkout develop

# Step 2 — Pull the latest to ensure you start from the freshest code
git pull origin develop

# Step 3 — Create and switch to the new branch
git checkout -b feature/notifications

# Step 4 — Push the new branch to remote
git push -u origin feature/notifications
```

### 🔧 Method 2 — Create directly without switching (recommended)

```bash
# Create feature/notifications starting from develop, without leaving your current branch
git checkout -b feature/notifications origin/develop

# OR (create without switching, using local develop as base)
git branch feature/notifications develop

# Push it
git push -u origin feature/notifications
```

### 🧪 Scenario — Create a hotfix from `main` (not `develop`)

```bash
# You're on develop but need a hotfix based off of main
git checkout -b hotfix/null-crash origin/main
git push -u origin hotfix/null-crash
```

### 📌 Summary

| Goal | Command |
|---|---|
| Create + switch from current branch | `git checkout -b new-branch` |
| Create + switch from specific branch | `git checkout -b new-branch origin/source-branch` |
| Create without switching | `git branch new-branch source-branch` |

---

## 3. How to View Branches

### 📖 What it means
Listing branches helps you see all lines of active development and where you currently are (your checked-out branch).

### 🔧 Commands

```bash
# List all LOCAL branches
git branch

# Example output:
# * feature/login        ← asterisk (*) = your current branch
#   develop
#   main
#   feature/payments

# List local branches with last commit info
git branch -v

# Example output:
#   develop         a1b2c3d Update README
# * feature/login   f4e5d6c Add password validation
#   main            9g8h7i6 Release v1.0

# List ALL branches (local + remote)
git branch -a

# List only REMOTE tracking branches
git branch -r
```

### 🧪 Scenario
> You want to see all local branches and their last commit before deciding which one to continue working on.

```bash
git branch -v
#   bugfix/login-null    b2c3d4e Fix null pointer in login
# * develop              a1b2c3d Merge feature/payment
#   feature/dashboard    e5f6g7h Add analytics panel
#   main                 9h8i7j6 Release v2.1
```

### 📌 Branch Viewing Commands

| Command | Shows |
|---|---|
| `git branch` | Local branch names only |
| `git branch -v` | Local branches + last commit |
| `git branch -a` | Local + remote branches |
| `git branch -r` | Remote-only branches |

---

## 4. How to View Remote Branches Locally

### 📖 What it means
Remote branches are branches that exist on the server (GitHub, GitLab, Bitbucket). By default, your local Git only knows about them after a `fetch`. This command lets you **explore what's on the remote** without downloading all the code.

### 🔧 Commands

```bash
# Step 1 — Fetch the latest metadata from remote
# (updates your local knowledge of what branches exist remotely)
git fetch origin

# Step 2 — List remote branches
git branch -r

# Example output:
#   origin/HEAD -> origin/main
#   origin/develop
#   origin/feature/payment-gateway
#   origin/hotfix/session-timeout
#   origin/main

# List all (local + remote) together
git branch -a
```

### 🔧 Checkout a Remote Branch to Work on It Locally

```bash
# Classic way
git checkout -b feature/payment-gateway origin/feature/payment-gateway

# Modern shortcut (Git 2.23+) — Git auto-detects the remote
git switch feature/payment-gateway
```

### 🧪 Scenario
> Your colleague pushed `feature/dark-mode` to GitHub. You want to review and test it locally.

```bash
# Step 1 — Refresh your remote info
git fetch origin

# Step 2 — Confirm the branch is there
git branch -r
# output: origin/feature/dark-mode

# Step 3 — Check it out locally
git checkout -b feature/dark-mode origin/feature/dark-mode
# Now you have a local copy tracking the remote branch
```

---

## PHASE 3 — Daily Work

---

## 5. How to Push Code

### 📖 What it means
Pushing uploads your **local committed changes** to the remote repository so teammates can access them, and so they are backed up on the server.

### 🧪 Scenario
> You've been working on a login feature locally. After completing and committing your work, you upload it to the remote repository so your team can review it.

### 🔧 Step-by-Step

```bash
# Step 1 — Check what's changed
git status

# Step 2 — Stage all changed files
git add .
# OR stage a specific file:
git add src/login.js

# Step 3 — Commit your changes with a clear message
git commit -m "feat: add login form validation"

# Step 4 — Push to the remote branch
git push origin feature/login-page
```

### 📌 Command Breakdown

| Command | Purpose |
|---|---|
| `git status` | Shows which files are modified / staged / untracked |
| `git add .` | Stages all changed files for the next commit |
| `git commit -m "..."` | Saves a snapshot of your staged changes |
| `git push origin <branch>` | Uploads your commits to the remote server |

### ⚠️ First-time push of a new branch

```bash
# Set the upstream so Git knows where to push by default
git push --set-upstream origin feature/login-page
# Short form:
git push -u origin feature/login-page
```

After the first time, you can just use `git push` for that branch.

### ✅ Golden Rule
Always run `git pull` before pushing to make sure you have the latest remote changes. This avoids rejected pushes.

```bash
git pull origin feature/login-page
git push origin feature/login-page
```

---

## 6. How to Stash Changes and Retrieve Them

### 📖 What it means
`git stash` **temporarily shelves** your uncommitted changes so you can switch context — switch branches, pull updates, or fix something urgent — then come back and restore your work exactly where you left off.

### 🧪 Scenario
> You're halfway through editing `checkout.js` on `feature/checkout`. Your manager asks you to urgently check a bug on the `main` branch. Your code is broken and not ready to commit — so you stash it.

### 🔧 Stashing Changes

```bash
# Simple stash (saves everything uncommitted)
git stash

# Stash with a descriptive label (strongly recommended)
git stash push -m "WIP: half-done checkout validation"

# Stash including untracked (brand-new) files
git stash push --include-untracked -m "WIP: includes new helper files"
```

### 🔧 Retrieving Stashed Changes

```bash
# Apply the most recent stash AND keep it in the stash list
git stash apply

# Apply the most recent stash AND remove it from the stash list (clean)
git stash pop

# Apply a specific stash by index number
git stash apply stash@{2}
```

### 🔧 Full Workflow Example

```bash
# 1. Save your work in progress
git stash push -m "WIP: checkout form validation"

# 2. Switch to the branch that needs attention
git checkout main
git pull origin main

# 3. Investigate / fix the bug on main...

# 4. Return to your feature branch
git checkout feature/checkout

# 5. Restore the stashed work
git stash pop
# Your half-done checkout validation is back exactly as you left it
```

---

## 7. How to Show Stashed Changes

### 📖 What it means
Before applying a stash, you can **preview what's inside it** — which files changed and exactly what the differences are — without actually restoring anything.

### 🔧 Commands

```bash
# List all stashes
git stash list

# Example output:
# stash@{0}: On feature/checkout: WIP: checkout form validation
# stash@{1}: On feature/login: WIP: login error messages
# stash@{2}: WIP on main: half-done hotfix

# Show a file-level summary of the latest stash
git stash show

# Show a full diff of the latest stash (line-by-line)
git stash show -p

# Show a full diff of a specific stash
git stash show -p stash@{1}
```

### 🧪 Scenario
> You saved two stashes yesterday. Before applying the second one, you want to see what it contains.

```bash
git stash list
# stash@{0}: WIP: payment integration
# stash@{1}: WIP: user avatar upload

git stash show -p stash@{1}
# Shows the full line-by-line diff of the avatar upload changes
```

### 🔧 Managing Stashes

```bash
# Remove a specific stash (without applying)
git stash drop stash@{1}

# Remove ALL stashes
git stash clear
```

---

## PHASE 4 — Collaborate

---

## 8. How to Merge Code from One Branch to Another

### 📖 What it means
Merging combines the commits and changes from one branch into another. It's how completed features get incorporated into the shared codebase.

### 🧪 Scenario
> Your `feature/payment-gateway` branch is complete, reviewed, and tested. Your team lead says to merge it into the `develop` branch.

### 🔧 Step-by-Step

```bash
# Step 1 — Switch to the TARGET branch (the one you merge INTO)
git checkout develop

# Step 2 — Pull the latest from remote to avoid a stale base
git pull origin develop

# Step 3 — Merge the feature branch into develop
git merge feature/payment-gateway

# Step 4 — Push the merged result up to remote
git push origin develop
```

### 📌 Types of Merges

| Type | Description | Command |
|---|---|---|
| **Fast-forward** | Simple linear history, no merge commit created | `git merge feature/branch` |
| **No fast-forward** | Forces a merge commit even if FF is possible | `git merge --no-ff feature/branch` |
| **Squash merge** | Combines all branch commits into one single commit | `git merge --squash feature/branch` |

### 🧪 Scenario — Squash Merge
> You have 10 small "fix" commits on a feature branch, but you want only one clean commit on `develop`.

```bash
git checkout develop
git merge --squash feature/quick-fixes
git commit -m "feat: bundle all quick fixes"
git push origin develop
```

### ⚠️ If Conflicts Arise During Merge
> See [Section 11 — How to Resolve Conflicts](#11-how-to-resolve-conflicts).

---

## 9. What is a Conflict?

### 📖 Definition
A **Git conflict** is a state where Git is **unable to automatically merge** differences between two branches, because the same section of a file has been modified in two incompatible ways.

Git stops the merge and marks the problem file, asking **you** to manually decide which version is correct.

### 🧪 Visual Example

```
Original file (before branching):
  Line 10: color = "blue"

Branch A (develop) changes it to:
  Line 10: color = "red"

Branch B (feature/branding) changes it to:
  Line 10: color = "green"
```

When merging B into A, Git sees the same original line (`"blue"`) changed to two different values. It cannot decide — it's a **conflict**.

### 📌 What a Conflict Looks Like Inside a File

```javascript
<<<<<<< HEAD
color = "red";           // ← your current branch's version (develop)
=======
color = "green";         // ← incoming branch's version (feature/branding)
>>>>>>> feature/branding
```

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Start of your current branch's version |
| `=======` | Divider between the two versions |
| `>>>>>>> branch-name` | End of the incoming branch's version |

### 📌 Types of Conflicts

| Type | Description |
|---|---|
| **Content conflict** | Same lines changed differently in both branches |
| **Delete/modify conflict** | One branch deletes a file, another modifies it |
| **Rename conflict** | Both branches rename the same file to different names |
| **Binary file conflict** | Images or PDFs that Git cannot diff/merge |

---

## 10. Why Do Conflicts Happen?

### 📖 Root Causes
Conflicts happen when **two branches independently change the same part of the same file**, and Git has no tie-breaking rule.

### 📌 Common Situations That Cause Conflicts

| Situation | Why It Conflicts |
|---|---|
| Two developers edit the same line | Git can't choose which edit to keep |
| Dev A deletes a file, Dev B modifies it | Contradictory intent |
| Two branches add code at the same location | Overlapping insertions |
| Rebasing an old branch onto an updated base | Base has moved; old changes clash |
| Cherry-picking commits with overlapping changes | Same lines patched in two different ways |

### 🧪 Scenario — Two developers, same line

**Developer A** on `feature/navbar`:
```javascript
const title = "My App";  // changed from "App"
```

**Developer B** on `feature/branding`:
```javascript
const title = "SuperApp"; // changed from "App"
```

Both changed the same line starting from the same original value. When merging → **conflict!**

### ✅ How to Prevent Conflicts

- **Communicate** — tell your team which files you're touching
- **Pull regularly** — sync your branch with `develop`/`main` frequently
- **Keep PRs small** — smaller branches = fewer overlapping changes
- **Avoid long-lived branches** — the longer a branch lives, the more it diverges
- **Coordinate on shared files** — config files, constants, routing files should be touched by one person at a time

---

## 11. How to Resolve Conflicts

### 📖 What it means
When a conflict is detected, Git pauses the merge and marks the problem files. You must **manually edit** the files to choose or combine the correct code, then complete the merge.

### 🧪 Scenario
> You're merging `feature/user-profile` into `develop`. Both branches modified `userService.js` at the same lines. Git cannot auto-merge.

### 🔧 Step-by-Step Resolution

```bash
# Step 1 — Attempt the merge
git checkout develop
git pull origin develop
git merge feature/user-profile

# Git output:
# Auto-merging src/userService.js
# CONFLICT (content): Merge conflict in src/userService.js
# Automatic merge failed; fix conflicts and then commit the result.
```

```bash
# Step 2 — Find all conflicted files
git status
# Output:   both modified: src/userService.js
```

**Step 3 — Open the conflicted file:**

```javascript
<<<<<<< HEAD (develop)
function getUserName(id) {
  return db.query(`SELECT name FROM users WHERE id = ${id}`);
}
=======
function getUserName(userId) {
  return api.fetchUser(userId).name;
}
>>>>>>> feature/user-profile
```

**Step 4 — Edit the file to the correct final version:**

```javascript
// Final resolved version — combined the best of both:
function getUserName(userId) {
  return db.query(`SELECT name FROM users WHERE id = ${userId}`);
}
```

> ⚠️ Remove ALL the `<<<<<<<`, `=======`, `>>>>>>>` conflict markers. The file must be valid code when done.

```bash
# Step 5 — Stage the resolved file
git add src/userService.js

# Step 6 — Complete the merge
git commit -m "merge: resolve conflict in userService.js"

# Step 7 — Push
git push origin develop
```

### 💡 VS Code Tip
VS Code highlights conflicts with **clickable action buttons**:
- **Accept Current Change** — keep your branch's version
- **Accept Incoming Change** — keep the merging branch's version
- **Accept Both Changes** — keep both versions (one after the other)
- **Compare Changes** — side-by-side diff view

---

## PHASE 5 — History & Recovery

---

## 12. How to Log Commits

### 📖 What it means
`git log` lets you **browse the commit history** of your repository — who committed, what they changed, and when. It's the primary tool for understanding what happened in a codebase.

### 🔧 Commands (from Simple to Powerful)

```bash
# Full default log
git log

# Compact — one line per commit
git log --oneline

# Visual graph showing branches and merges
git log --oneline --graph --all --decorate

# Show only the last N commits
git log -5

# Filter by author
git log --author="Jane Smith"

# Filter by date range
git log --after="2024-01-01" --before="2024-06-30"

# Filter by keyword in commit message
git log --grep="login"

# Show commits that touched a specific file
git log -- src/login.js

# Show full diff with each commit
git log -p

# Custom formatted output
git log --pretty=format:"%h | %an | %ad | %s" --date=short
```

### 🧪 Scenario
> Find all commits related to "payment" made by "Alice" after May 2024.

```bash
git log --author="Alice" --grep="payment" --after="2024-05-01" --oneline

# Output:
# a1b2c3d feat: add payment gateway integration
# e4f5g6h fix: payment timeout issue
```

### 📌 Format Code Reference

| Code | Output |
|---|---|
| `%h` | Short commit hash |
| `%H` | Full commit hash |
| `%an` | Author name |
| `%ae` | Author email |
| `%ad` | Author date |
| `%s` | Commit message subject |

---

## 13. How to Revert Changes

### 📖 What it means
`git revert` **undoes a specific commit** by creating a NEW commit that applies the exact opposite changes. The original commit remains in the history — nothing is deleted.

This is the **safe, team-friendly way** to undo changes on shared branches.

### 🧪 Scenario
> Commit `abc1234` introduced a bug in production. Other developers have already pulled this code, so you cannot rewrite history. You need to undo it safely.

### 🔧 Step-by-Step

```bash
# Step 1 — Find the bad commit
git log --oneline

# Output:
# abc1234 feat: add discount calculation logic   ← this broke production
# def5678 feat: add cart total display
# ghi9012 feat: initial cart setup

# Step 2 — Revert it (opens editor to confirm the revert message)
git revert abc1234

# OR revert without opening the editor
git revert abc1234 --no-edit

# Step 3 — Push the new revert commit
git push origin main
```

### 📌 What Happens in History

```
Before revert:
  ghi9012 ── def5678 ── abc1234

After revert:
  ghi9012 ── def5678 ── abc1234 ── Revert "feat: add discount calculation logic"
```

- ✅ The original `abc1234` stays in history (transparent and auditable)
- ✅ The new revert commit cancels out its effects
- ✅ Safe to use on `main`, `develop`, or any shared branch

---

## 14. How to Reset a Branch to a Specific Commit (by Message)

### 📖 What it means
You want to **go back in time** to a specific commit identified by its message, and discard everything that came after it. Unlike revert, this rewrites history.

### 🧪 Scenario
> Your branch has 5 commits. After "feat: add cart functionality" everything went wrong. You want to reset back to exactly that point.

### 🔧 Step-by-Step

```bash
# Step 1 — Find the commit hash by searching the log
git log --oneline --grep="add cart functionality"

# Output:
# 7f3a2b1 feat: add cart functionality   ← your target

# Step 2 — Hard reset: discard everything AFTER this commit
git reset --hard 7f3a2b1

# Step 3 — Force push to update remote (⚠️ only on your own branch)
git push --force origin feature/shopping-cart
```

### 🧪 Scenario — Soft reset (keep files, just undo commits)

> You want to go back to "add cart functionality" but **keep your recent code changes** to re-commit them more cleanly.

```bash
git log --oneline
# c9d8e7f chore: bad refactor
# b5a4c3d fix: wrong variable name
# 7f3a2b1 feat: add cart functionality  ← target

git reset --soft 7f3a2b1
# All changes from b5a4c3d and c9d8e7f are now STAGED — not lost
git commit -m "refactor: clean up cart implementation"
```

### 🆘 Recovery with `git reflog`
Accidentally reset too far? `git reflog` records every HEAD movement:

```bash
git reflog
# HEAD@{0}: reset: moving to 7f3a2b1
# HEAD@{1}: commit: c9d8e7f chore: bad refactor
# HEAD@{2}: commit: b5a4c3d fix: wrong variable name

# Recover by going back
git reset --hard HEAD@{2}
```

---

## 15. How to Reset a Branch Based on a Parent Branch

### 📖 What it means
Sometimes your feature branch has become **messy or diverged** from its parent (e.g., `develop`). You want to discard your branch's history and make it **identical to the parent branch** — a full clean slate.

### 🧪 Scenario
> You've been working on `feature/profile-update` for two weeks, but the branch has wrong commits and a tangled history. You want to start fresh from the latest `develop`.

### 🔧 Hard Reset (discard everything including file changes)

```bash
# Step 1 — Update the parent branch
git checkout develop
git pull origin develop

# Step 2 — Switch back to your branch
git checkout feature/profile-update

# Step 3 — Reset your branch to match develop exactly
git reset --hard develop

# Step 4 — Force push to overwrite the remote branch
git push --force origin feature/profile-update
```

### 🔧 Soft Reset (discard commit history but KEEP your file changes)

```bash
git checkout feature/profile-update

# Reset to develop — keeps all your file edits as staged changes
git reset --soft develop

# Now re-commit your work cleanly
git commit -m "feat: clean profile update implementation"
git push --force origin feature/profile-update
```

### 📌 Reset Modes at a Glance

| Mode | Staging Area | Working Files | Use Case |
|---|---|---|---|
| `--soft` | Changes kept staged | Files kept | Undo commits, ready to re-commit |
| `--mixed` *(default)* | Changes unstaged | Files kept | Undo commits, edit before staging again |
| `--hard` | Changes discarded | Files reverted | Complete wipe to a clean state |

### ⚠️ Warning
`--force` rewrites the remote's history. **Only use on your own feature branches** — never on `main`, `develop`, or any shared branch.

---

## 16. Reset vs Revert — What's the Difference?

### 📖 The Core Difference

| Feature | `git reset` | `git revert` |
|---|---|---|
| **What it does** | Moves HEAD backward to an earlier commit | Creates a NEW commit that undoes changes |
| **History** | Rewrites / removes commits | Preserves all commits |
| **Safe for shared branches?** | ❌ No — dangerous | ✅ Yes — always safe |
| **Visible to others?** | Not after force-push | Yes — revert appears as a new commit |
| **Best for** | Local cleanup before pushing | Undoing already-pushed commits |

---

### 🧪 Scenario A — `git reset` (local, not yet pushed)

> You made 3 bad commits locally. You haven't pushed yet. You want them completely gone.

```bash
git log --oneline
# f3c9a1b chore: bad commit 3
# a7d2e4f chore: bad commit 2
# 91bc3d1 chore: bad commit 1
# 5e8f2c0 feat: last good commit  ← go back to here

git reset --hard 5e8f2c0
# All 3 commits gone. History now ends at 5e8f2c0.
```

---

### 🧪 Scenario B — `git revert` (already pushed to remote)

> The same bad commits are on the remote. Colleagues have already pulled them. You cannot rewrite history.

```bash
git revert f3c9a1b --no-edit   # Undo bad commit 3
git revert a7d2e4f --no-edit   # Undo bad commit 2
git revert 91bc3d1 --no-edit   # Undo bad commit 1
git push origin main
```

The 3 bad commits remain in history, but 3 new revert commits cancel their effect.

---

### 🧪 Scenario C — `git reset --soft` (fix a bad commit message)

> You committed with the wrong message. You want to redo the commit with the correct message.

```bash
git reset --soft HEAD~1
# Your changes go back to staged state — nothing is lost
git commit -m "fix: correct description of the change"
```

---

### 📌 Decision Guide — Which Should I Use?

```
Did you push the commit to remote?
        │
       YES ──→ Use git revert  (safe, preserves history)
        │
        NO  ──→ Use git reset  (clean, rewrites local history)
                    │
              Do you want to keep the file changes?
                    │
                   YES ──→  git reset --soft  or  --mixed
                    │
                    NO  ──→  git reset --hard
```

---

## 🔑 Quick Reference Cheat Sheet

```bash
# ── BRANCH ─────────────────────────────────────────
git branch feature/X develop           # Create branch from develop
git checkout -b feature/X origin/dev   # Create + switch from remote branch
git branch -v                          # List local branches with info
git branch -r                          # List remote branches
git branch -a                          # List all (local + remote)

# ── PUSH ────────────────────────────────────────────
git add .
git commit -m "feat: your message"
git push -u origin feature/X           # First push (sets upstream)
git push origin feature/X             # Subsequent pushes

# ── STASH ───────────────────────────────────────────
git stash push -m "WIP: label"         # Stash with a label
git stash list                         # View all saved stashes
git stash show -p stash@{0}            # Preview stash contents
git stash pop                          # Apply + remove latest stash
git stash apply stash@{1}             # Apply specific stash, keep in list

# ── MERGE ───────────────────────────────────────────
git checkout target-branch
git pull origin target-branch
git merge source-branch
git push origin target-branch

# ── LOG ─────────────────────────────────────────────
git log --oneline --graph --all        # Visual branch history
git log --grep="keyword" --oneline     # Search commits by message
git log --author="Name" --oneline      # Filter by author

# ── REVERT ──────────────────────────────────────────
git revert <commit-hash> --no-edit     # Safe undo (keeps history)
git push origin <branch>

# ── RESET ───────────────────────────────────────────
git reset --soft <hash>                # Undo commits, keep files staged
git reset --mixed <hash>               # Undo commits, unstage files
git reset --hard <hash>                # Wipe everything to that commit
git push --force origin feature/X      # Force push after reset

# ── RECOVERY ────────────────────────────────────────
git reflog                             # See all HEAD movements
git reset --hard HEAD@{N}              # Recover to a reflog position
```

---

*Document maintained for team reference. Last updated: March 2026.*
