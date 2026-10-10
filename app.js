const appState = {
  lang: 'en'
};

const { translations, events, venues, family, couple, familyLine } = invitationData;

function formatDisplayDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function getText(value, lang = appState.lang) {
  if (typeof value === 'string') return value;
  return value[lang] || value.en;
}

function safePhoneLink(number) {
  return 'tel:' + number.replace(/[^\d+]/g, '');
}

function setLanguage(lang) {
  appState.lang = lang;

  document.documentElement.lang = lang;
  document.title = getText(translations[lang].pageTitle);
  document.querySelector('meta[name="description"]').setAttribute('content', getText(translations[lang].description));

  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const t = translations[lang];
  const introTag = document.getElementById('introTag');
  const introName = document.getElementById('introName');
  const introInvite = document.getElementById('introInvite');
  const introDate = document.getElementById('introDate');
  const openInvitation = document.getElementById('openInvitation');
  const replayButton = document.getElementById('replayButton');
  const mainHeading = document.getElementById('mainHeading');
  const mainNames = document.getElementById('mainNames');
  const familyLineEl = document.getElementById('familyLine');
  const scheduleTitle = document.getElementById('scheduleTitle');
  const venueTitle = document.getElementById('venueTitle');
  const familyTitle = document.getElementById('familyTitle');
  const galleryTitle = document.getElementById('galleryTitle');
  const mediaTitle = document.getElementById('mediaTitle');
  const shareTitle = document.getElementById('shareTitle');
  const calendarButton = document.getElementById('downloadCalendar');
  const whatsappButton = document.getElementById('whatsappShare');
  const footerText = document.getElementById('footerText');

  if (introTag) introTag.textContent = t.introTag;
  if (introName) introName.textContent = getText(couple, lang);
  if (introInvite) introInvite.textContent = t.invitationLine;
  if (introDate) introDate.textContent = t.weddingMeta;
  if (openInvitation) openInvitation.textContent = t.openingButton;
  if (replayButton) replayButton.textContent = t.replayButton;
  if (mainHeading) mainHeading.textContent = t.mainHeading;
  if (mainNames) mainNames.textContent = getText(couple, lang);
  if (familyLineEl) familyLineEl.textContent = getText(familyLine, lang);
  if (scheduleTitle) scheduleTitle.textContent = t.scheduleHeading;
  if (venueTitle) venueTitle.textContent = t.venueHeading;
  if (familyTitle) familyTitle.textContent = t.familyHeading;
  if (galleryTitle) galleryTitle.textContent = t.galleryHeading;
  if (mediaTitle) mediaTitle.textContent = t.mediaHeading;
  if (shareTitle) shareTitle.textContent = t.shareHeading;
  if (calendarButton) {
    calendarButton.textContent = t.downloadCalendar;
    calendarButton.setAttribute('aria-label', t.downloadCalendar);
  }
  if (whatsappButton) whatsappButton.textContent = t.shareHeading;
  if (footerText) footerText.textContent = t.footerText;

  renderFamilies(lang);
  renderSchedule(lang);
  renderVenues(lang);
  renderVideoLinks(lang);
  renderWhatsAppText(lang);
}

function renderFamilies(lang) {
  const familyContent = document.getElementById('familyGrid');
  if (!familyContent) return;

  familyContent.innerHTML = '';
  const groom = family[lang].groom;
  const bride = family[lang].bride;

  [
    { title: groom.label, items: groom.parents },
    { title: bride.label, items: bride.parents }
  ].forEach((section) => {
    const block = document.createElement('article');
    block.className = 'person-card';
    block.innerHTML = `
      <h3>${section.title}</h3>
      ${section.items.map((person) => `<p>${person}</p>`).join('')}
    `;
    familyContent.appendChild(block);
  });
}

function renderSchedule(lang) {
  const schedule = document.getElementById('scheduleList');
  if (!schedule) return;

  schedule.innerHTML = '';

  events.forEach((event) => {
    const item = document.createElement('article');
    item.className = 'event-card';

    const date = new Date(event.date + 'T00:00:00');
    const dateText = new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);

    const starts = event.start ? `${event.start}` : 'TBA';
    const ends = event.end ? `– ${event.end}` : 'onwards';
    const venueText = venues[event.venueId].name[lang];

    item.innerHTML = `
      <div class="event-date">
        <strong>${new Intl.DateTimeFormat('en-IN', { day: 'numeric' }).format(date)}</strong>
        <span>${new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(date)}</span>
      </div>
      <div class="event-main">
        <h3>${getText(event.title, lang)}</h3>
        <p>${getText(event.day, lang)}, ${dateText}</p>
        <p>${starts} ${ends}</p>
        <p>${venueText}</p>
        ${event.note ? `<p>${getText(event.note, lang)}</p>` : ''}
      </div>
      <div class="event-badge">${event.venueId === 'hotelGulzar' ? 'Jabalpur' : 'Wright Town'}</div>
    `;

    schedule.appendChild(item);
  });
}

function renderVenues(lang) {
  const venueGrid = document.getElementById('venueGrid');
  if (!venueGrid) return;

  venueGrid.innerHTML = '';

  Object.values(venues).forEach((venue) => {
    const card = document.createElement('article');
    card.className = 'venue-card';
    card.innerHTML = `
      <h3>${getText(venue.name, lang)}</h3>
      <p>${getText(venue.address, lang)}</p>
      <div class="venue-links">
        <a class="link-pill" href="${venue.mapsUrl}" target="_blank" rel="noreferrer">${translations[lang].viewDirections}</a>
        ${venue.contacts.map((phone) => `<a class="link-pill" href="${safePhoneLink(phone)}">${translations[lang].callNow}</a>`).join('')}
      </div>
    `;
    venueGrid.appendChild(card);
  });
}

function renderVideoLinks(lang) {
  const container = document.getElementById('videoList');
  if (!container) return;

  container.innerHTML = '';

  const variants = invitationData.videoVariants.filter((variant) => variant.lang === lang || lang === 'en' || lang === 'hi');

  variants.forEach((variant) => {
    const card = document.createElement('article');
    card.className = 'video-card';
    const fileExists = false;
    const href = fileExists ? variant.file : '#';
    const labelText = fileExists ? translations[lang].watchVideo : translations[lang].unavailableVideo;

    card.innerHTML = `
      <h3>${variant.label}</h3>
      <p>${variant.ratio} • ${translations[lang].unavailableVideo}</p>
      <a href="${href}" ${fileExists ? '' : 'aria-disabled="true"'}>${labelText}</a>
    `;
    container.appendChild(card);
  });
}

function renderWhatsAppText(lang) {
  const shareText = translations[lang].whatsappShare;
  const shareButton = document.getElementById('whatsappShare');
  if (shareButton) {
    shareButton.onclick = () => {
      const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener');
    };
  }
}

function updateCountdown() {
  const targetDate = new Date('2026-12-06T09:00:00+05:30');
  const now = new Date();
  const delta = Math.max(targetDate.getTime() - now.getTime(), 0);

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);
  const seconds = Math.floor((delta / 1000) % 60);

  document.getElementById('daysValue').textContent = String(days).padStart(2, '0');
  document.getElementById('hoursValue').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutesValue').textContent = String(minutes).padStart(2, '0');
  document.getElementById('secondsValue').textContent = String(seconds).padStart(2, '0');

  document.getElementById('daysLabel').textContent = translations[appState.lang].countDownDays;
  document.getElementById('hoursLabel').textContent = translations[appState.lang].countDownHours;
  document.getElementById('minutesLabel').textContent = translations[appState.lang].countDownMinutes;
  document.getElementById('secondsLabel').textContent = translations[appState.lang].countDownSeconds;
}

function createIcsContent() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aditya & Siddhibala Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE'
  ];

  events.forEach((event) => {
    const startDate = event.date.replace(/-/g, '') + 'T' + event.start.replace(':', '') + '00';
    const venue = venues[event.venueId];
    const eventTitle = getText(event.title, 'en');
    const description = `${getText(event.note, 'en') || ''}; Venue: ${getText(venue.name, 'en')}`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}@adisiddhi`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`);
    lines.push(`DTSTART;TZID=Asia/Kolkata:${startDate}`);
    if (event.end) {
      const endDate = event.date.replace(/-/g, '') + 'T' + event.end.replace(':', '') + '00';
      lines.push(`DTEND;TZID=Asia/Kolkata:${endDate}`);
    }
    lines.push(`SUMMARY:${eventTitle}`);
    lines.push(`DESCRIPTION:${description.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')}`);
    lines.push(`LOCATION:${getText(venue.name, 'en').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,')}`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadCalendar() {
  const blob = new Blob([createIcsContent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'aditya-siddhibala-wedding-invitation.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function init() {
  const introScreen = document.getElementById('introScreen');
  const openButton = document.getElementById('openInvitation');
  const replayButton = document.getElementById('replayButton');
  const calendarButton = document.getElementById('downloadCalendar');

  if (openButton) {
    openButton.addEventListener('click', () => {
      document.getElementById('mainContent').classList.remove('hidden');
      document.getElementById('heroSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (introScreen) introScreen.classList.add('hidden');
    });
  }

  if (replayButton && introScreen) {
    replayButton.addEventListener('click', () => {
      introScreen.classList.remove('intro-reset');
      void introScreen.offsetWidth;
      introScreen.classList.add('intro-reset');
    });
  }

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  if (calendarButton) {
    calendarButton.addEventListener('click', downloadCalendar);
  }

  setLanguage(appState.lang);
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', init);
