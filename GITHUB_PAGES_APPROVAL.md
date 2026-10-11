# GitHub Pages approval checklist for all 4 invitation projects

This document contains the exact repository and settings steps to approve before any live Pages publication. No deployment is triggered from this file alone.

## Critical GitHub Pages constraint

GitHub Pages serves one production site per repository. If you want four unique URLs ending in `_1`, `_2`, `_3`, and `_4`, the safest and correct setup is:

- Four separate repositories, one per project
- Each repository contains only that project’s web files
- Each repository has its own GitHub Pages site enabled

Examples:

- `https://adityadubey1313-oss.github.io/adisiddhi_1/`
- `https://adityadubey1313-oss.github.io/adisiddhi_2/`
- `https://adityadubey1313-oss.github.io/adisiddhi_3/`
- `https://adityadubey1313-oss.github.io/adisiddhi_4/`

If the team insists on keeping a single repository, GitHub Pages can only publish one live site for that repository. In that case, a four-project setup cannot produce four distinct production URLs from one repository without a different hosting approach.

## Recommended approval plan

Use the following plan unless you explicitly choose a different repository layout:

1. Create four repositories named:
   - `adisiddhi_1`
   - `adisiddhi_2`
   - `adisiddhi_3`
   - `adisiddhi_4`
2. In each repo, keep only that version’s files at the repository root.
3. In each repo, add the matching workflow file already prepared locally.
4. Enable GitHub Pages in that repo using GitHub Actions.
5. Run the workflow manually once after approval.
6. Verify the published URL matches the project name.

---

## Exact steps for each project

### Project 1

Repository name:
- `adisiddhi_1`

Files to keep at repo root:
- `index.html`
- `styles.css`
- `app.js`
- `invitation-data.js`
- `preview.jpg`
- `whatsapp-logo.png`
- any other `_1` assets

Workflow file to use:
- `.github/workflows/deploy-pages-_1.yml`

Expected published URL:
- `https://adityadubey1313-oss.github.io/adisiddhi_1/`

Required repository settings:
1. Open the repo.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Save.
5. Go to `Actions`.
6. Select `Deploy Pages _1`.
7. Choose `Run workflow`.
8. Wait for the workflow to finish.
9. Verify the generated Pages URL.

### Project 2

Repository name:
- `adisiddhi_2`

Files to keep at repo root:
- `_2` content copied to the repo root, with project-specific metadata and copy

Workflow file to use:
- `.github/workflows/deploy-pages-_2.yml`

Expected published URL:
- `https://adityadubey1313-oss.github.io/adisiddhi_2/`

Required repository settings:
1. Open the repo.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Save.
5. Go to `Actions`.
6. Select `Deploy Pages _2`.
7. Choose `Run workflow`.
8. Verify the generated Pages URL.

### Project 3

Repository name:
- `adisiddhi_3`

Files to keep at repo root:
- `_3` content copied to the repo root, with the invitation-story layout and project-specific copy

Workflow file to use:
- `.github/workflows/deploy-pages-_3.yml`

Expected published URL:
- `https://adityadubey1313-oss.github.io/adisiddhi_3/`

Required repository settings:
1. Open the repo.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Save.
5. Go to `Actions`.
6. Select `Deploy Pages _3`.
7. Choose `Run workflow`.
8. Verify the generated Pages URL.

### Project 4

Repository name:
- `adisiddhi_4`

Files to keep at repo root:
- `_4` content copied to the repo root, retaining the original invitation structure and adding the required 3/4 December details

Workflow file to use:
- `.github/workflows/deploy-pages-_4.yml`

Expected published URL:
- `https://adityadubey1313-oss.github.io/adisiddhi_4/`

Required repository settings:
1. Open the repo.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Save.
5. Go to `Actions`.
6. Select `Deploy Pages _4`.
7. Choose `Run workflow`.
8. Verify the generated Pages URL.

---

## Required workflow settings

Each workflow is set to use GitHub Pages with Actions:

- `permissions:`
  - `contents: read`
  - `pages: write`
  - `id-token: write`
- `concurrency:`
  - `group: pages-_n`
  - `cancel-in-progress: false`

This matches a normal GitHub Pages deployment model and is the correct setup for the project-specific workflows.

---

## Approval checklist before publishing

Check each item before clicking Run workflow:

- [ ] Confirm the repo name matches the intended project suffix (`_1` to `_4`)
- [ ] Confirm the matching workflow file is committed to the repository
- [ ] Confirm `Settings` > `Pages` is set to `GitHub Actions`
- [ ] Confirm the project folder has been copied to the repo root if this is a dedicated repo
- [ ] Confirm the site metadata and `siteUrl` values match the final repo URL
- [ ] Confirm no other repository is being published accidentally
- [ ] Confirm the Pages URL is the one intended for that project
- [ ] Confirm the user has explicitly approved publication

---

## Publish sequence to run after approval

Once approved:

1. Create `adisiddhi_1` and push the `_1` project files.
2. Wait for the repo to be ready and enable Pages with GitHub Actions.
3. Run `Deploy Pages _1`.
4. Verify the URL loads correctly.
5. Repeat for `adisiddhi_2`, `adisiddhi_3`, and `adisiddhi_4`.

No deployment has been started here. This file is the approval-ready runbook.
