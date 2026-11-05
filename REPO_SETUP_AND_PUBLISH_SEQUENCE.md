# Repository setup and final publish sequence for all 4 invitation projects

## Current Hindi projects

The current Hindi projects already exist as four independent GitHub repositories. Their exact workspace folders are registered submodules in [.gitmodules](.gitmodules):

| Folder and repository name | Git origin (fetch and push) | Published URL |
|---|---|---|
| `adisiddhi_6` | `https://github.com/adityadubey1313-oss/adisiddhi_6.git` | https://adityadubey1313-oss.github.io/adisiddhi_6/ |
| `adisiddhi_56` | `https://github.com/adityadubey1313-oss/adisiddhi_56.git` | https://adityadubey1313-oss.github.io/adisiddhi_56/ |
| `adisiddhi_456` | `https://github.com/adityadubey1313-oss/adisiddhi_456.git` | https://adityadubey1313-oss.github.io/adisiddhi_456/ |
| `adisiddhi_3456` | `https://github.com/adityadubey1313-oss/adisiddhi_3456.git` | https://adityadubey1313-oss.github.io/adisiddhi_3456/ |

Do not create duplicate repositories or rename the old still-working sites. The parent repository tracks only each current project's gitlink and URL; it does not own those projects' invitation files.

### Initialize and synchronize locally

```powershell
git submodule update --init --recursive
git submodule sync --recursive
```

For each project, enter the exact folder, use `git switch main`, and inspect `git remote -v` and `git branch -vv`. `main` must track `origin/main`. Fresh submodule initialization normally checks out the pinned commit in detached-HEAD mode, so switch to `main` before editing. Fetch and inspect changes before any fast-forward update; do not overwrite local edits.

### Build and deploy one project

Each project's `.github/workflows/deploy-pages.yml` validates `app.js` and `invitation-data.js`, checks and copies `index.html`, `styles.css`, both JavaScript files, `preview.jpg`, `wedding-song1.mp3` and `whatsapp-logo.png` into `_site`, then uploads and deploys that Pages artifact.

These static projects have no package manifest or framework build. No npm installation, Vite `base`, or React homepage setting is required. GitHub Pages uses GitHub Actions (`build_type: workflow`); the project's `siteUrl` and HTML metadata must match its exact published URL.

Commit and push only inside the intended project repository. Its push to `main` triggers deployment. Wait for its Actions build and deployment to succeed, then verify its exact trailing-slash URL, invitation content and assets. After pushing a changed submodule, stage its new gitlink in the parent separately. Never push the parent merely to deploy a Hindi invitation.

### Local migration preservation

The obsolete tracked Hindi directories were moved, not deleted, to `C:\Users\Aditya\Downloads\invitation-hindi-legacy-20261105`. All original files were hash-verified after moving. The active folders contain the latest published repository versions rather than stale legacy copies. The parent migration is staged but not committed or pushed.

## Historical four-project instructions

The following instructions concern the separate legacy `_1` through `_4` projects only. They are retained for those projects and must not be used to publish the current Hindi invitations.

## Required repository layout

Each project must live in its own GitHub repository and use its own Pages site.

### Repository names

- `adisiddhi_1`
- `adisiddhi_2`
- `adisiddhi_3`
- `adisiddhi_4`

### Expected Pages URLs

- `https://adityadubey1313-oss.github.io/adisiddhi_1/`
- `https://adityadubey1313-oss.github.io/adisiddhi_2/`
- `https://adityadubey1313-oss.github.io/adisiddhi_3/`
- `https://adityadubey1313-oss.github.io/adisiddhi_4/`

## Project-to-repository mapping

| Project | Local source folder | GitHub repo | Pages URL |
|---|---|---|---|
| 1 | `_1` | `adisiddhi_1` | `https://adityadubey1313-oss.github.io/adisiddhi_1/` |
| 2 | `_2` | `adisiddhi_2` | `https://adityadubey1313-oss.github.io/adisiddhi_2/` |
| 3 | `_3` | `adisiddhi_3` | `https://adityadubey1313-oss.github.io/adisiddhi_3/` |
| 4 | `_4` | `adisiddhi_4` | `https://adityadubey1313-oss.github.io/adisiddhi_4/` |

## One-time GitHub setup

Run these steps in GitHub for each repository:

1. Create a new public or private repository with the exact project name.
2. Choose `Add a README` only if you want a default landing page; otherwise leave it empty.
3. Do not add any extra site files beyond the project content.
4. Open `Settings` > `Pages`.
5. Set `Build and deployment` > `Source` to `GitHub Actions`.
6. Save.
7. Ensure the repository has the correct workflow permissions enabled for Pages.

## Local repository preparation

Use a separate directory or clone the new repository for each project, then copy in the matching local project files.

### Example directory layout

```text
C:\repo-setup\
  adisiddhi_1\
  adisiddhi_2\
  adisiddhi_3\
  adisiddhi_4\
```

### Per project local steps

For each repository:

```bash
git clone https://github.com/adityadubey1313-oss/adisiddhi_1.git
cd adisiddhi_1
copy ..\invitation-main\_1\* .
```

Repeat for `_2`, `_3`, and `_4`.

## Commit and push

After the correct files are in place:

```bash
git add .
git commit -m "Add invitation project 1"
git push -u origin main
```

Repeat for each project repository.

## Workflow file usage

Each repo must contain the matching workflow file already prepared in this workspace:

- `.github/workflows/deploy-pages-_1.yml`
- `.github/workflows/deploy-pages-_2.yml`
- `.github/workflows/deploy-pages-_3.yml`
- `.github/workflows/deploy-pages-_4.yml`

These are the live deployment workflows that target the project’s Pages site.

## Final publish sequence after approval

Run in this exact order:

1. Create and push `adisiddhi_1`.
2. Open `Settings` > `Pages` in `adisiddhi_1` and confirm GitHub Actions is the source.
3. Run `Deploy Pages _1` from the Actions tab.
4. Confirm the live URL appears and loads correctly.
5. Repeat for `adisiddhi_2`.
6. Repeat for `adisiddhi_3`.
7. Repeat for `adisiddhi_4`.

## Final validation checklist

Before considering the site live, confirm all of the following:

- [ ] repo name matches the project suffix
- [ ] Pages source is set to GitHub Actions
- [ ] workflow file exists in the repository
- [ ] `siteUrl` in the project metadata matches the final Pages URL
- [ ] the project loads at its matching URL
- [ ] no other repository was published accidentally
- [ ] user approval was obtained before publication

## Safety note

This sequence is the actual repository setup and deploy plan, but it does not execute any GitHub actions or push commands from this local environment. The final live publication should only be run after the user explicitly approves it.
