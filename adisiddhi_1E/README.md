# Aditya & Siddhibala Wedding Invitation

Standalone English website based on source project _1.

- Published URL: https://adityadubey1313-oss.github.io/adisiddhi_1E/
- Language: English only; there is no language switch.
- Features: nine events across 2–6 December 2026, family details and greetings, directions, contacts, WhatsApp sharing, and a downloadable calendar. The original hero, wedding summary, schedule-day timeline, venue cards, family grid, and share section remain in their existing order.
- Cover: the original `preview.jpg` and dark background treatment carry the Dubey Family invitation, couple names, celebration dates, and countdown in the first viewport. The remaining sections follow through natural scrolling; no header navigation or opening screen is used.
- Celebrations: Devi Bhajan (2 December, 2:00 PM); Mehendi and Magarmaati (3 December, 3:00 PM and 5:00 PM); Yajnopavita (Janeu) Sanskar, Mandap and Tel-Haldi (4 December, 12:00–5:00 PM); Pushp-Haldi Celebration, Tilak, and Ring Ceremony & Sangeet (5 December, 12:00 PM, 4:00 PM, and 7:30 PM); Baarat Wedding Ceremony & Phere and Reception (6 December, 9:00 AM onwards and 7:00 PM onwards). All times are IST.
- Venue evidence: the supplied apartment address is used for Mehendi and Magarmaati. The existing 1E event data explicitly assigns Hotel Gulzar to the 5 December celebrations, wedding ceremony, and reception; these assignments are retained, and the supplied address is used for the 4 December rituals. **Devi Bhajan's venue still needs confirmation.** The existing Kishore Kuti directions link is preserved, but its event assignment is explicitly marked for confirmation rather than associated with an event without evidence. The apartment Maps link is an address search, not a verified map pin.
- Family: the exact supplied couple lineage, mother-first parent details, best compliments, and welcoming names appear in the existing family section. The reference image was not attached to this update; wording follows the supplied transcription and existing event-to-venue data.
- Countdown: the existing component updates every second until the reception at `2026-12-06T19:00:00+05:30` and remains at zero afterward.
- Music: one persistent player reuses `wedding-song.mp3`, attempts audible autoplay, and loops. If blocked by browser policy, a suitable pointer, click, or keyboard interaction retries playback; fallback listeners are removed once playback starts. Muting does not seek or reset playback. Unexpected errors are logged and announced. Audible autoplay is browser-controlled and cannot be guaranteed.
- Calendar: both the downloadable calendar and `invitation.ics` include the same nine celebrations, use Asia/Kolkata, and omit an unconfirmed venue from LOCATION. No unprovided end times are invented.
- Assets: relative paths keep this package portable at its repository root.
- Deployment: the repository-local workflow at .github/workflows/deploy-pages.yml publishes this package root to GitHub Pages.

Push this package as the root of its own repository to publish it at the URL above.

Publishing is isolated to `adityadubey1313-oss/adisiddhi_1E` on `main`. Do not push the parent source repository or run bulk-publishing scripts as part of this update. No files belonging to 2E or another version are required.
