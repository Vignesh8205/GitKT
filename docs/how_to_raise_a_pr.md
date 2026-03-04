# 🔀 How to Raise a Pull Request (PR)

> A complete guide covering the full PR lifecycle — from writing code to getting it merged.

---

## Table of Contents

| # | Topic |
|---|---|
| 1 | [What is a Pull Request?](#1-what-is-a-pull-request) |
| 2 | [Prerequisites Before Raising a PR](#2-prerequisites-before-raising-a-pr) |
| 3 | [Step-by-Step: Raising a PR on GitHub](#3-step-by-step-raising-a-pr-on-github) |
| 4 | [Step-by-Step: Raising a PR on GitLab (MR)](#4-step-by-step-raising-a-pr-on-gitlab-mr) |
| 5 | [Step-by-Step: Raising a PR on Bitbucket](#5-step-by-step-raising-a-pr-on-bitbucket) |
| 6 | [Writing a Great PR Description](#6-writing-a-great-pr-description) |
| 7 | [PR Description Template](#7-pr-description-template) |
| 8 | [How to Assign Reviewers](#8-how-to-assign-reviewers) |
| 9 | [Handling Review Feedback](#9-handling-review-feedback) |
| 10 | [Keeping Your PR Up to Date](#10-keeping-your-pr-up-to-date) |
| 11 | [Merge Strategies](#11-merge-strategies) |
| 12 | [Common PR Mistakes to Avoid](#12-common-pr-mistakes-to-avoid) |
| 13 | [PR Checklist](#13-pr-checklist) |

---

## 1. What is a Pull Request?

### 📖 Definition
A **Pull Request (PR)** — called a **Merge Request (MR)** on GitLab — is a formal proposal to merge changes from your branch into another branch (usually `main`, `develop`, or `staging`).

It is the primary mechanism for **code review** in collaborative software development. Before your code goes into the main codebase, peers review it for correctness, style, and potential issues.

### 📌 PR Lifecycle

```
Your local branch
      │
      ▼
Push to remote  →  Open PR  →  Code Review  →  Approval  →  Merge
                                    │
                              Request Changes
                                    │
                               Update Code
                                    │
                               Push again ─────────────────▲
```

### 📌 Why PRs Matter

| Benefit | Description |
|---|---|
| **Code quality** | Peers catch bugs, security issues, and bad patterns |
| **Knowledge sharing** | Everyone learns what is being changed and why |
| **Audit trail** | A full record of why and how changes were made |
| **Stability** | Prevents untested code from reaching production |

---

## 2. Prerequisites Before Raising a PR

### ✅ Complete these steps BEFORE clicking "Create PR"

### Step 1 — Make sure your branch is up to date

```bash
# Pull the latest changes from the target branch (e.g., develop)
git checkout develop
git pull origin develop

# Switch back to your feature branch
git checkout feature/your-feature

# Bring in the latest develop changes
git merge develop
# OR for a cleaner history:
git rebase develop
```

### Step 2 — Confirm all changes are committed

```bash
git status
# Should show: nothing to commit, working tree clean
```

### Step 3 — Run all tests locally

```bash
npm test         # JavaScript / Node.js
pytest           # Python
mvn test         # Java / Maven
dotnet test      # .NET
```

All tests must **pass** before raising the PR.

### Step 4 — Review your own changes first

```bash
# See the full diff between your branch and the target
git diff develop...HEAD

# See the list of commits you're about to PR
git log develop..HEAD --oneline
```

> Self-review finds at least 30% of bugs before anyone else even looks.

### Step 5 — Push your branch to remote

```bash
# First-time push (sets upstream tracking)
git push -u origin feature/your-feature

# Subsequent pushes
git push origin feature/your-feature
```

---

## 3. Step-by-Step: Raising a PR on GitHub

### 🔧 Method 1 — Via GitHub Web UI

**Step 1** — Go to your repository on GitHub
(e.g., `https://github.com/your-org/your-repo`)

**Step 2** — You'll see a yellow banner:
`"feature/your-feature had recent pushes — Compare & pull request"`
Click **"Compare & pull request"**

> If the banner is gone, go to the **Pull requests** tab → click **"New pull request"**

**Step 3** — Set the correct branches:
- **Base branch** → where you want to merge **INTO** (e.g., `develop`)
- **Compare branch** → your feature branch (e.g., `feature/your-feature`)

**Step 4** — Fill in the PR form:

| Field | What to Enter |
|---|---|
| **Title** | `feat: add user profile page` |
| **Description** | Use the PR template (see Section 7) |
| **Reviewers** | Add 1–2 teammates to review |
| **Assignees** | Yourself |
| **Labels** | `feature`, `bug`, `needs-review`, etc. |
| **Milestone** | Sprint or release milestone |
| **Linked Issues** | Type `Closes #123` to auto-close the issue on merge |

**Step 5** — Click **"Create pull request"**

---

### 🔧 Method 2 — Via GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com/
gh pr create \
  --title "feat: add user profile page" \
  --body "Adds the user profile page with edit functionality. Closes #45" \
  --base develop \
  --head feature/user-profile \
  --reviewer john.doe,jane.smith \
  --label "feature"
```

---

## 4. Step-by-Step: Raising a PR on GitLab (MR)

> On GitLab, a Pull Request is called a **Merge Request (MR)**.

### 🔧 Steps

**Step 1** — Go to your project on GitLab

**Step 2** — Navigate to: `Merge Requests` → `New merge request`

**Step 3** — Select branches:
- **Source branch**: `feature/your-feature`
- **Target branch**: `develop` or `main`

**Step 4** — Click **"Compare branches and continue"**

**Step 5** — Fill in the MR form:

| Field | What to Enter |
|---|---|
| **Title** | `feat: add user authentication module` |
| **Description** | Markdown supported — use the template |
| **Assignee** | Yourself |
| **Reviewers** | Colleagues who should review |
| **Milestone** | Sprint or version |
| **Labels** | `feature`, `bug`, `in-review`, etc. |
| **Delete source branch when merged** | ✅ Check this for clean branch management |
| **Squash commits when merged** | Optional — depends on team convention |

**Step 6** — Click **"Create merge request"**

---

### 🔧 GitLab CLI

```bash
# Install glab: https://gitlab.com/gitlab-org/cli
glab mr create \
  --title "feat: add user authentication" \
  --description "Implements JWT-based auth. Closes #78" \
  --source-branch feature/auth \
  --target-branch develop \
  --reviewer john.doe
```

---

## 5. Step-by-Step: Raising a PR on Bitbucket

### 🔧 Steps

**Step 1** — Go to your Bitbucket repository

**Step 2** — In the sidebar click **"Pull requests"** → **"Create pull request"**

**Step 3** — Set branches:
- **Source**: `feature/your-feature`
- **Destination**: `develop` or `main`

**Step 4** — Fill in the form:

| Field | What to Enter |
|---|---|
| **Title** | Clear and descriptive |
| **Description** | Markdown supported (use the template) |
| **Reviewers** | Type usernames or emails |
| **Close source branch** | ✅ Check for automatic cleanup after merge |

**Step 5** — Click **"Create"**

---

## 6. Writing a Great PR Description

A well-written description saves reviewers' time and gets your code merged faster.

### ✅ What to Include

| Section | What to Write |
|---|---|
| **What changed** | Brief summary of what this PR does |
| **Why** | The motivation or business reason behind the change |
| **How to test** | Step-by-step manual testing instructions |
| **Screenshots** | Before/after screenshots for any UI changes |
| **Related issues** | Jira tickets, GitHub issues, Linear tasks |
| **Breaking changes** | Anything that breaks backward compatibility |
| **Checklist** | Confirm tests pass, no lint issues, self-reviewed |

---

### ✅ Good PR Title Formats — Conventional Commits

```bash
feat: add dark mode toggle
fix: resolve null pointer in login service
refactor: extract payment logic into service class
chore: update lodash to v4.17.21
docs: add API documentation for user endpoints
test: add unit tests for cart validation
perf: optimize database query for product listing
```

### ❌ Bad PR Title Examples

```
fix stuff
WIP
update
john's changes
final
done
```

---

## 7. PR Description Template

Copy and paste this template into every PR you raise:

```markdown
## 📋 Summary
<!-- What does this PR do? Briefly describe the purpose and scope. -->

## 🎯 Related Issue / Ticket
<!-- Link to related issue(s):
  Closes #123
  Fixes #456
  Part of #789
  JIRA: PROJ-101 -->

## 🔧 Changes Made
<!-- List the key changes introduced in this PR: -->
-
-
-

## 🧪 How to Test
<!-- Steps for a reviewer to manually verify this works: -->
1.
2.
3.

**Expected result:**
<!-- What should happen when the steps above are followed correctly -->

## 📸 Screenshots (if applicable)
| Before | After |
|--------|-------|
| _(screenshot)_ | _(screenshot)_ |

## ⚠️ Breaking Changes
<!-- Does this break any existing functionality?
     If yes, describe what breaks and how to handle it. -->
- None

## ✅ PR Checklist
- [ ] I have reviewed my own code before requesting review
- [ ] All existing tests pass locally
- [ ] I have added/updated tests for new functionality
- [ ] No console errors or warnings introduced
- [ ] No hardcoded values, secrets, or credentials committed
- [ ] Documentation updated (if applicable)
- [ ] Branch is up-to-date with the target branch
- [ ] Commit messages follow Conventional Commits format
```

---

## 8. How to Assign Reviewers

### 📌 Who to Assign

| Reviewer Type | When to Assign |
|---|---|
| **Code owner** | If a `CODEOWNERS` file exists, they're auto-assigned |
| **Domain expert** | Someone familiar with the area of code you changed |
| **Team lead** | For architectural decisions or large PRs |
| **Pair partner** | If you pair-programmed, your partner should review |

### 📌 Best Practices

- Assign **1–2 reviewers** minimum (not too few, not too many)
- If the PR is urgent, message reviewers on Slack/Teams with the PR link
- Don't assign reviewers who are currently on leave
- Use a **Draft PR** when the code isn't ready but you want early feedback

### 🔧 GitHub — Draft PR

Use when the work is in progress but you want visibility or early feedback:

```bash
# Via CLI
gh pr create --draft \
  --title "WIP: feat/new-dashboard" \
  --body "Not ready yet — sharing for early design feedback"
```

On the web UI: click the dropdown arrow next to "Create pull request" → **"Create draft pull request"**

When ready: click **"Ready for review"** to notify reviewers.

---

## 9. Handling Review Feedback

### 🧪 Scenario
> Your reviewer left 5 comments. Some require code changes, others are suggestions or questions.

### 🔧 Step-by-Step

```bash
# Step 1 — Read ALL comments before writing any code
# Understand the full scope of changes requested first

# Step 2 — Make the requested changes locally
# (edit files as needed)

# Step 3 — Stage and commit your changes
git add .
git commit -m "review: address feedback from code review"

# Step 4 — Push the updates
git push origin feature/your-feature
# The PR auto-updates with the new commits — no need to open a new PR
```

### 📌 How to Respond to Each Comment Type

| Comment Type | How to Handle |
|---|---|
| **Must fix** | Fix the code and push. Reply with "Fixed in commit `abc1234`" |
| **Suggestion** | Consider it. If you apply it, say so. If not, explain why |
| **Question** | Answer in the comment thread. Update the code if needed |
| **Compliment** | A 👍 is enough — reviewers appreciate acknowledgment |
| **Disagreement** | Discuss respectfully in the thread. Escalate to team lead if unresolved |

### 💡 Best Practice
For every "Request Changes" comment:
- Reply with **what you did** (e.g., "Updated in commit `abc1234` — extracted to a utility function")
- Then mark the thread as **Resolved**

This lets reviewers verify quickly without re-reading the whole file.

---

## 10. Keeping Your PR Up to Date

If `develop` gets new commits while your PR is open, you must bring those into your branch before merging.

### 🔧 Method 1 — Merge (simpler, shows full history)

```bash
git checkout feature/your-feature
git merge develop
# Resolve any conflicts if they arise
git push origin feature/your-feature
```

### 🔧 Method 2 — Rebase (cleaner, linear history)

```bash
git checkout feature/your-feature
git rebase develop
# Resolve conflicts step by step during rebase if needed
git push --force-with-lease origin feature/your-feature
```

> ⚠️ Use `--force-with-lease` instead of `--force` — it prevents overwriting if someone else pushed to the branch since your last pull.

### 📌 Merge vs Rebase in PRs

| Method | History | Best For |
|---|---|---|
| **Merge** | Merge commit visible | Teams preferring full history |
| **Rebase** | Clean linear history | Teams preferring clean log |

---

## 11. Merge Strategies

When your PR is approved, you choose how to merge:

| Strategy | Description | Best For |
|---|---|---|
| **Merge commit** | Creates a merge commit, preserves all PR commits | Long-running features; full traceability |
| **Squash and merge** | All PR commits become one single commit on target | Small/medium features with many WIP commits |
| **Rebase and merge** | Replays commits on top of target, linear history | Teams that require clean, linear git history |

### 🧪 When to Use Each

- **Merge commit** — when individual commits are meaningful and you want full feature history
- **Squash and merge** — when your branch has noisy commits like `"fix typo"`, `"WIP"`, `"another fix"`
- **Rebase and merge** — when your team enforces a strictly linear `git log`

---

## 12. Common PR Mistakes to Avoid

| ❌ Mistake | ✅ What to Do Instead |
|---|---|
| Giant PR with 50+ files changed | Keep PRs small and focused — under 300 lines is ideal |
| Vague title like "fix stuff" | Use Conventional Commits: `fix: resolve login null error` |
| Empty description | Fill out the PR template every single time |
| Not testing before raising PR | Always run tests locally first |
| Ignoring reviewer comments | Respond to every comment, even just with a 👍 |
| Pushing directly to `main` or `develop` | Always work on feature branches and raise a PR |
| Leaving PRs open for weeks | Aim to merge within 1–2 days of raising |
| Committing secrets or API keys | Use `.gitignore` and environment variables |
| Not updating the branch | Regularly merge or rebase the target branch |
| Self-merging without approval | Always get at least 1 review approval |

---

## 13. PR Checklist

Use this before raising every PR:

```
═══════════════════════════════════════════
  PRE-PR CHECKLIST
═══════════════════════════════════════════

  Code Quality
  ─────────────────────────────────────────
  □ I have reviewed my own code changes
  □ No debug logs or console.log left in
  □ No commented-out code blocks
  □ No hardcoded URLs, passwords, or API keys
  □ Code follows the team's style guide
  □ No unrelated changes bundled in this PR

  Testing
  ─────────────────────────────────────────
  □ All existing tests pass locally
  □ New functionality has corresponding tests
  □ Edge cases are handled and tested
  □ No new test failures introduced

  Git Hygiene
  ─────────────────────────────────────────
  □ Branch is up-to-date with the target branch
  □ Each commit message is clear and meaningful
  □ No merge conflicts in the PR
  □ No unnecessary files committed (.DS_Store, etc.)

  Documentation
  ─────────────────────────────────────────
  □ README updated if applicable
  □ Comments added for complex logic
  □ API docs updated if endpoints changed

  PR Metadata
  ─────────────────────────────────────────
  □ Title follows Conventional Commits format
  □ Description template filled out completely
  □ Correct base and compare branches selected
  □ Correct reviewer(s) assigned
  □ Correct label(s) applied
  □ Linked to the relevant issue or Jira ticket

═══════════════════════════════════════════
```

---

## 🔑 Quick PR Commands Summary

```bash
# ── PREPARE ─────────────────────────────────────────────────
git checkout develop && git pull origin develop
git checkout feature/my-feature
git merge develop                  # Sync with latest develop
npm test                           # Make sure all tests pass

# ── PUSH ────────────────────────────────────────────────────
git push -u origin feature/my-feature

# ── CREATE PR (GitHub CLI) ──────────────────────────────────
gh pr create \
  --title "feat: add login page" \
  --body "Adds email/password login form. Closes #12" \
  --base develop \
  --reviewer teammate1,teammate2

# ── AFTER REVIEW — push fixes ───────────────────────────────
git add .
git commit -m "review: address feedback from code review"
git push origin feature/my-feature

# ── KEEP PR UPDATED ─────────────────────────────────────────
git merge develop                  # or: git rebase develop
git push --force-with-lease origin feature/my-feature

# ── AFTER MERGE — clean up ──────────────────────────────────
git checkout develop
git pull origin develop
git branch -d feature/my-feature                      # delete locally
git push origin --delete feature/my-feature           # delete remotely
```

---

*Document maintained for team reference. Last updated: March 2026.*
