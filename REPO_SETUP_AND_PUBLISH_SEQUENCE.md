# Repository setup and final publish sequence for all 4 invitation projects

This file documents the exact setup and publish sequence for the four GitHub Pages projects. It is intended for approval and execution in GitHub, not for live deployment from this local workspace.

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
