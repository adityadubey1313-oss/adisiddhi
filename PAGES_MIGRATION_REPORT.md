# GitHub Pages migration verification

Verified on 5 November 2026 after deployment.

## Diagnosis

Authenticated GitHub API requests initially returned 404 for all three destination repositories. All three original repositories existed, used GitHub Actions Pages deployments from `main`, and had successful latest workflow runs. Their published invitation HTML matched their source repositories.

The destination 404s were caused by missing repositories and deployments, not an incorrect source-code base URL. With explicit user approval, three new public repositories were created. No original repository was renamed, modified, disabled, or deleted.

## Final acceptance report

| Existing URL | New URL | Destination repository existence | GitHub Pages configuration | Build status | Deployment status | Final HTTP response | Actual webpage verification | Manual action required |
|---|---|---|---|---|---|---|---|---|
| https://adityadubey1313-oss.github.io/adisiddhi_1h/ | https://adityadubey1313-oss.github.io/adisiddhi_3456/ | Created; public | GitHub Actions; `main`; `_site` artifact | Passed | Successful; run 41998751330 | 200 at exact trailing-slash URL | Hindi invitation; 8 events; 4 greeting groups; 2 venues; desktop/mobile checks passed | None |
| https://adityadubey1313-oss.github.io/adisiddhi_2h/ | https://adityadubey1313-oss.github.io/adisiddhi_56/ | Created; public | GitHub Actions; `main`; `_site` artifact | Passed | Successful; run 41998783687 | 200 at exact trailing-slash URL | Hindi invitation; 5 events; 4 greeting groups; 1 venue; desktop/mobile checks passed | None |
| https://adityadubey1313-oss.github.io/adisiddhi_4h/ | https://adityadubey1313-oss.github.io/adisiddhi_456/ | Created; public | GitHub Actions; `main`; `_site` artifact | Passed | Successful; run 41998819060 | 200 at exact trailing-slash URL | Hindi invitation; 10 events; 4 greeting groups; 2 venues; desktop/mobile checks passed | None |

Pages uses `build_type: workflow`, not branch-folder publishing. Its API source metadata is `main` and `/`; the workflow explicitly uploads `_site` and deploys that artifact.

## Deployment evidence

| Destination repository | Deployment run | Published commit |
|---|---|---|
| [adisiddhi_3456](https://github.com/adityadubey1313-oss/adisiddhi_3456) | [Successful workflow](https://github.com/adityadubey1313-oss/adisiddhi_3456/actions/runs/41998751330) | `a68a82f1f6163144e6e70c474ff06012c6fb4fcc` |
| [adisiddhi_56](https://github.com/adityadubey1313-oss/adisiddhi_56) | [Successful workflow](https://github.com/adityadubey1313-oss/adisiddhi_56/actions/runs/41998783687) | `1836824dbcdf01f8e23402f3a17e2c2b69f0702e` |
| [adisiddhi_456](https://github.com/adityadubey1313-oss/adisiddhi_456) | [Successful workflow](https://github.com/adityadubey1313-oss/adisiddhi_456/actions/runs/41998819060) | `8e48dc3092b5d79e9e7b15d2e4ab4418ee7fbb15` |

## Changes and checks

- Each destination preserves the corresponding published source repository and its history. The original source commits were `ce710b3251743e050ec6967c372fff9e42030b5a`, `2a97980024bd60d114fab8d0d21db3c01276727e`, and `edb8fd64ca6ddbddb652803316edd1e00e17d05a`, respectively.
- Only deployment URLs in HTML metadata, `siteUrl`, WhatsApp message URLs, repository documentation, and deployment workflow configuration changed. Invitation wording, titles, schedules, application logic, CSS, images, logo, and music were preserved.
- Existing relative asset references already resolve correctly under the new project paths; no framework base-path or routing rewrite was necessary.
- These are static projects without dependency manifests or a compilation step. Each workflow validates both JavaScript files, verifies and stages the seven required site files, uploads the Pages artifact, and deploys it. Every build and deployment step succeeded.
- Independently fetched all three exact final URLs and all seven files per site. Each returned HTTP 200 with the appropriate content type and matched the prepared source, normalizing only text line endings.
- Browser verification confirmed the actual Hindi invitation, correct schedule counts, family greetings, venue cards, hero artwork, WhatsApp logo, loaded CSS, executed JavaScript, and loaded Noto Sans/Serif Devanagari fonts.
- Desktop (1280 x 900) and mobile (390 x 844) layouts had no horizontal overflow. All three browser checks recorded no JavaScript errors or failed network requests.
- Activated each WhatsApp button with `window.open` intercepted: each generated a `wa.me` URL containing its exact new invitation URL and corresponding `_3456`, `_56`, or `_456` suffix. No message was sent.
- Verified ticking countdowns, `#schedule` navigation, music mute/unmute controls, and active audio playback with `readyState: 4` and no media errors on every new site. Reduced-motion mode retained `scroll-behavior: auto`; original animation styling was unchanged.
- All three old URLs were checked again after the new deployments: HTTP 200 with invitation HTML present.

The original local project folders and parent repository deployment workflows were intentionally left unchanged. Future changes to the new live sites should be made in their corresponding new repositories.
