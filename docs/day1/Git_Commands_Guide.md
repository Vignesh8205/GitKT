# Git Commands Guide

## Version Control Systems

**Git** is a distributed version control system that can be used with various hosting platforms:

- **GitHub**
- **Bitbucket**
- **GitLab**
- **Azure DevOps**

## Installation

### Git Bash for Windows
Download and install Git from: [https://git-scm.com/install/windows](https://git-scm.com/install/windows)

---

## Essential Git Commands

### 1. Clone a Repository
Downloads a copy of a remote repository to your local machine.

```bash
git clone "repo_url"
```

**Example:**
```bash
git clone "https://github.com/Vignesh8205/GitKT.git"
```

---

### 2. View Branches
Lists all branches in your repository. The current branch is marked with an asterisk (*).

```bash
git branch
```

---

### 3. Check Repository Status
Shows the current state of your working directory and staging area.

```bash
git status
```

Displays:
- Modified files
- Untracked files
- Files staged for commit

---

### 4. Add Files to Staging Area

**Add updated/modified files only:**
```bash
git add -u
```

**Add all files (new, modified, deleted):**
```bash
git add .
```

**Add a specific file:**
```bash
git add filepath
```

**Example:**
```bash
git add src/index.js
```

---

### 5. Commit Changes
Saves your staged changes with a descriptive message.

```bash
git commit -m "your commit message"
```

**Example:**
```bash
git commit -m "Added login functionality"
```

---

### 6. Push Changes
Uploads your local commits to the remote repository.

```bash
git push
```

---

### 7. Pull Changes
Downloads and merges changes from the remote repository to your local branch.

```bash
git pull
```

---

### 8. View Commit History
Displays the commit history for the current branch.

```bash
git log
```

**Useful variations:**
```bash
git log --oneline        # Compact view
git log --graph          # Visual branch graph
git log --all --oneline  # All branches in compact view
```

---

## Basic Git Workflow

1. **Clone the repository** (first time only)
   ```bash
   git clone "repository_url"
   ```

2. **Check current status**
   ```bash
   git status
   ```

3. **Make your changes** (edit files)

4. **Stage your changes**
   ```bash
   git add .
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Description of changes"
   ```

6. **Pull latest changes** (before pushing)
   ```bash
   git pull
   ```

7. **Push your changes**
   ```bash
   git push
   ```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git clone <url>` | Clone a repository |
| `git branch` | List branches |
| `git status` | Check working directory status |
| `git add -u` | Stage updated files |
| `git add .` | Stage all changes |
| `git add <file>` | Stage specific file |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Push commits to remote |
| `git pull` | Pull changes from remote |
| `git log` | View commit history |

---

## Tips

- Always run `git status` before committing to see what will be included
- Write clear, descriptive commit messages
- Pull before pushing to avoid conflicts
- Use `git add .` to stage all changes at once
- Use `git log --oneline` for a cleaner commit history view
