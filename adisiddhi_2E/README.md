# Aditya & Siddhibala Reception Invitation — 2E

Standalone English website based on source project _2.

- Published URL: https://adityadubey1313-oss.github.io/adisiddhi_2E/
- Language: English only; there is no language switch.
- Reception only: Sunday, 6 December 2026, 7:00 PM onwards (IST).
- Venue: Hotel Gulzar, confirmed by this version's original `reception-dinner.venueId` in `invitation-data.js`. The existing address and Maps search link are retained; no coordinates have been guessed.
- Features: the supplied groom-side family roster and couple lineage, venue directions, venue contacts, reception countdown, and reception-only WhatsApp sharing. The page intentionally omits schedule and calendar controls; the directly accessible `invitation.ics` also contains only the reception.
- Presentation: existing couple artwork, ivory, lavender/purple, and gold ornamentation. Navigation transitions and reduced-motion behavior are retained. This version has no cover-opening overlay or active music player; the existing soundtrack asset is unchanged.
- Accessibility: invitation, family details, venue, and directions are present in HTML without JavaScript. Countdown and script-dependent action buttons appear only after initialization.
- Assets: relative paths keep this package portable at its repository root.
- Deployment: the repository-local workflow at .github/workflows/deploy-pages.yml publishes this package root to GitHub Pages.

Push this package as the root of its own repository to publish it at the URL above.

## Publishing scope

The source package is `adisiddhi_2E` in `adityadubey1313-oss/adisiddhi`. Copy only the changed package files to the root of `adityadubey1313-oss/adisiddhi_2E`, then push its `main` branch. Its existing `deploy-pages.yml` workflow uploads `.` and deploys to the target URL. Do not run the root bulk-publishing scripts: they target other invitation repositories.

The four-panel reference attachment was not available during this update. Family wording follows the exact user-supplied transcription; the original `preview.jpg` is retained rather than generating replacement portraits.
