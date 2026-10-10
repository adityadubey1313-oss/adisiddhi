# Aditya & Siddhibala Wedding Invitation

This static invitation is designed for GitHub Pages and keeps the family details, schedule, venue map links, and language copy in a single central configuration file.

## Included files
- `index.html` — homepage structure and presentation
- `styles.css` — page styling and responsive design
- `invitation-data.js` — centralised invitation data and translations
- `app.js` — rendering logic, countdown, calendar generation, and language switching
- `invitation.ics` — downloadable wedding calendar generated from the same source data
- `hindi-draft.md` — draft Hindi wording awaiting approval before finalising Hindi copy
- `preview.jpg` — existing couple artwork reused as the hero artwork
- `wedding-song.mp3` — existing music track retained as the preferred soundtrack

## Supported features
- English and Hindi interface toggle
- Countdown to the main wedding date on 6 December 2026
- Chronological event schedule with the exact ten ceremony entries supplied
- Venue cards with map links and contact numbers
- Family section with the approved parent names
- Downloadable `.ics` file for all ten events
- WhatsApp share link
- Minimal opening animation with replay control and reduced-motion support

## Video export status
This environment does not currently have a working local FFmpeg installation. The repository is prepared for the four MP4 exports, but the actual export files have not been generated and verified here. Use the commands below once FFmpeg is installed locally.

## Local video rendering commands

```bash
ffmpeg -y -loop 1 -i preview.jpg -i wedding-song.mp3 -t 29 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,drawtext=text='ADITYA & SIDDHIBALA':fontcolor=white:fontsize=96:fontfile='C:\\Windows\\Fonts\\Garamond.ttf':x=(w-text_w)/2:y=h*0.72,drawtext=text='Dubey Family invites you.':fontcolor=#f4d39b:fontsize=42:fontfile='C:\\Windows\\Fonts\\Garamond.ttf':x=(w-text_w)/2:y=h*0.82" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -shortest aditya-siddhibala-invitation-en-vertical.mp4

ffmpeg -y -loop 1 -i preview.jpg -i wedding-song.mp3 -t 29 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,drawtext=text='ADITYA & SIDDHIBALA':fontcolor=white:fontsize=92:fontfile='C:\\Windows\\Fonts\\Garamond.ttf':x=(w-text_w)/2:y=h*0.74,drawtext=text='Dubey Family invites you.':fontcolor=#f4d39b:fontsize=34:fontfile='C:\\Windows\\Fonts\\Garamond.ttf':x=(w-text_w)/2:y=h*0.82" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -shortest aditya-siddhibala-invitation-en-horizontal.mp4
```

The Hindi versions should be rendered with the approved Hindi draft text and the same soundtrack, once the Hindi wording is signed off.

## GitHub Pages safety
- This is a static repository and the current deployment flow already targets GitHub Pages.
- The working branch is `redesign/aditya-siddhibala-invitation` and the production branch remains protected.
- No automatic publishing occurs from this branch.

## Review and publish
1. Open the branch locally and review the design in a browser.
2. Confirm the English wording, dates, and schedule.
3. Approve the Hindi draft in `hindi-draft.md` before finalising Hindi copy or exported video text.
4. If the design is approved, publish the branch to GitHub Pages in the normal repository settings or via the project’s configured workflow.

## Known audit notes
- Only the original `preview.jpg` and `wedding-song.mp3` are present in the repository, so additional photography is not available yet.
- The repository has no live FFmpeg or Node installation in this environment, so no actual MP4 video file can be validated here until the toolchain is installed.
- The workflow remains a static GitHub Pages deploy and was not changed to publish the redesign automatically.
