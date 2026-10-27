# Aditya & Siddhibala Reception Invitation — 2E

Standalone English website based on source project _2.

- Published URL: https://adityadubey1313-oss.github.io/adisiddhi_2E/
- Language: English only; there is no language switch.
- Reception only: Sunday, 6 December 2026, 7:00 PM onwards (IST).
- Venue: Hotel Gulzar, confirmed by this version's original `reception-dinner.venueId` in `invitation-data.js`. The existing address and Maps search link are retained; no coordinates have been guessed.
- Features: the supplied groom-side family roster and couple lineage, venue directions, venue contacts, reception countdown, and reception-only WhatsApp sharing. The page intentionally omits schedule and calendar controls; the directly accessible `invitation.ics` also contains only the reception.
- Presentation: the original portrait background, colors, typography, venue grid, and family grid are preserved. No new theme, overlay, or floral artwork is used. The existing hero now includes an "Open invitation" anchor to the couple introduction, with a one-time 600 ms horizontal slide/fade; reduced-motion users get no reveal animation. All content remains visible without JavaScript.
- Family introduction: both original grandparent relationships are followed by the supplied parent details in slightly smaller type.
- Music: one persistent `audio` element reuses `wedding-song.mp3` with `loop` enabled. Playback starts on the first pointer or Enter/Space interaction (not page load). The fixed music button mutes without seeking, and unmutes or retries playback from the current position. Playback failures are announced and logged; later interaction can retry. Leaving the page pauses playback.
- Accessibility: invitation, lineage, family details, venue, and directions are present in HTML without JavaScript. The original countdown and action controls are retained; countdown updates, sharing, and the contact dialog require JavaScript.
- Assets: relative paths keep this package portable at its repository root.
- Deployment: the repository-local workflow at .github/workflows/deploy-pages.yml publishes this package root to GitHub Pages.

Push this package as the root of its own repository to publish it at the URL above.

## Publishing scope

The source package is `adisiddhi_2E` in `adityadubey1313-oss/adisiddhi`. Copy only the changed package files to the root of `adityadubey1313-oss/adisiddhi_2E`, then push its `main` branch. Its existing `deploy-pages.yml` workflow uploads `.` and deploys to the target URL. Do not run the root bulk-publishing scripts: they target other invitation repositories.

The four-panel reference attachment was not available during this update. Family wording follows the exact user-supplied transcription; the original `preview.jpg` is retained rather than generating replacement portraits.
