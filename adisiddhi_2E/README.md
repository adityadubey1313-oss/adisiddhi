# Aditya & Siddhibala Reception Invitation — 2E

Standalone English website based on source project _2.

- Published URL: https://adityadubey1313-oss.github.io/adisiddhi_2E/
- Language: English only; there is no language switch.
- Reception only: Sunday, 6 December 2026, 7:00 PM onwards (IST).
- Venue: Hotel Gulzar, confirmed by this version's original `reception-dinner.venueId` in `invitation-data.js`. The existing address and Maps search link are retained; no coordinates have been guessed.
- Features: the supplied groom-side family roster and couple lineage, venue directions, venue contacts, reception countdown, and reception-only WhatsApp sharing. The page intentionally omits schedule and calendar controls; the directly accessible `invitation.ics` also contains only the reception.
- Presentation: the original portrait background, positioning, colors, typography, venue grid, and family grid are preserved. The first viewport layers the Dubey Family invitation, couple names, reception details, and existing countdown over the artwork using the original translucent dark treatment. Later sections follow in normal document flow. No opening button, scroll snapping, forced scrolling, or new artwork is used. Sections get a one-time 500 ms upward fade when they enter view. Reduced-motion users get no reveal animation; content remains visible without JavaScript or IntersectionObserver.
- Family introduction: both original grandparent relationships are followed by the supplied parent details in slightly smaller type, with mothers listed first.
- Music: one persistent `audio` element reuses `wedding-song.mp3` with `loop` enabled. Playback is attempted at initialization. If browser policy blocks it, the next suitable pointer or keyboard interaction retries without a disruptive prompt or timer-based retry loop. The fixed toggle always represents the guest's mute preference, including before playback starts. Muting does not seek; unmuting preserves the current position and retries playback if needed. Unexpected playback failures are announced and logged. Leaving the page pauses playback. Audible autoplay is browser-controlled and cannot be guaranteed.
- Accessibility: invitation, lineage, family details, venue, and directions are present in HTML without JavaScript. The original countdown and action controls are retained; countdown updates, sharing, and the contact dialog require JavaScript.
- Assets: relative paths keep this package portable at its repository root.
- Deployment: the repository-local workflow at .github/workflows/deploy-pages.yml publishes this package root to GitHub Pages.

Push this package as the root of its own repository to publish it at the URL above.

## Publishing scope

The source package is `adisiddhi_2E` in `adityadubey1313-oss/adisiddhi`. Copy only the changed package files to the root of `adityadubey1313-oss/adisiddhi_2E`, then push its `main` branch. Its existing `deploy-pages.yml` workflow uploads `.` and deploys to the target URL. Do not run the root bulk-publishing scripts: they target other invitation repositories.

The four-panel reference attachment was not available during this update. Family wording follows the exact user-supplied transcription; the original `preview.jpg` is retained rather than generating replacement portraits.
