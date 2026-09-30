document.documentElement.classList.add('js');
let modalReturnFocus = null;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const projects = {
  "leadership": {
    "icon": "🏛️",
    "title": "Student Leadership & Governance",
    "type": "KASAMA · CHS-SC · College Executive Council",
    "desc": "Committee work, coordination, documentation, and student initiatives that contribute to the campus community.",
    "tags": [
      "Committee Work",
      "Coordination",
      "Documentation",
      "Student Initiatives"
    ]
  },
  "events": {
    "icon": "🎉",
    "title": "Events & Activities",
    "type": "GAAP · College Days · Palakasan · PatingPalak",
    "desc": "Event coordination, committee responsibilities, and activity implementation—from preparation to execution.",
    "tags": [
      "Event Coordination",
      "Committee Work",
      "Activity Implementation"
    ]
  },
  "outputs": {
    "icon": "📓",
    "title": "Academic & Creative Outputs",
    "type": "Presentations · Written Outputs · Research · Visual Materials",
    "desc": "Selected works that reflect my communication, organization, and creativity.",
    "tags": [
      "Academic Presentations",
      "Written Outputs",
      "Research-related Work",
      "Visual Materials"
    ]
  }
};

/* ══════════════════════════════════════
   SECTION TRACKING
══════════════════════════════════════ */
const visited = new Set(['welcome']);
const allSections = ['welcome', 'about', 'hobbies', 'journey', 'skills', 'services', 'testimonials', 'souvenir', 'photobooth'];
const requiredSections = allSections.filter(id => id !== 'photobooth');

function markVisited(id) {
  if (visited.has(id)) return;
  visited.add(id);
  const badge = document.getElementById('badge-' + id);
  if (badge) badge.classList.add('show');
  updateReceiptChecks();
}

function updateReceiptChecks() {
  allSections.forEach(id => {
    const el = document.getElementById('chk-' + id);
    if (!el) return;
    if (visited.has(id)) {
      el.textContent = '☑';
      el.className = 'receipt-check';
    } else {
      el.textContent = '☐';
      el.className = 'receipt-pending';
    }
  });
  const badge = document.getElementById('complete-badge');
  if (requiredSections.every(s => visited.has(s))) {
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }
}

/* ══════════════════════════════════════
   INTERSECTION OBSERVER
══════════════════════════════════════ */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      markVisited(id);
      updateNavDots(id);
      // Animate skill bars when skills section becomes visible
      if (id === 'skills') animateSkillBars();
    }
  });
}, { threshold: 0, rootMargin: '-15% 0px -15% 0px' });

allSections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ── Nav dots update ── */
function updateNavDots(activeId) {
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.dataset.target === (activeId === 'photobooth' ? 'souvenir' : activeId === 'skills' ? 'journey' : activeId)) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.target === activeId);
  });
}

document.querySelectorAll('.nav-dot').forEach(dot => {
  dot.addEventListener('click', event => { event.preventDefault(); scrollToSection(dot.dataset.target); });
});

/* ── Fade-up observer ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function scrollToSection(id) {
  if (id === 'photobooth') showSouvenirPanel('photobooth');
  document.getElementById(id).scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

/* ══════════════════════════════════════
   FLIP CARDS
══════════════════════════════════════ */
function flipCard(card) {
  card.classList.toggle('flipped');
  card.setAttribute('aria-pressed', String(card.classList.contains('flipped')));
}

/* ══════════════════════════════════════
   TIMELINE
══════════════════════════════════════ */
function toggleTimeline(entry) {
  const wasOpen = entry.classList.contains('open');
  document.querySelectorAll('.timeline-entry.open').forEach(e => { e.classList.remove('open'); e.setAttribute('aria-expanded','false'); });
  if (!wasOpen) { entry.classList.add('open'); entry.setAttribute('aria-expanded','true'); }
}

/* ══════════════════════════════════════
   SKILL BARS
══════════════════════════════════════ */
let barsAnimated = false;
function animateSkillBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

/* ══════════════════════════════════════
   PROJECT MODAL
══════════════════════════════════════ */
function openModal(key) {
  const p = projects[key];
  if (!p) return;
  document.getElementById('m-icon').textContent  = p.icon;
  document.getElementById('m-title').textContent = p.title;
  document.getElementById('m-type').textContent  = p.type;
  document.getElementById('m-desc').textContent  = p.desc;
  const tags = document.getElementById('m-tags');
  tags.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  document.getElementById('project-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  modalReturnFocus = document.activeElement;
  document.getElementById('project-modal').setAttribute('aria-hidden','false');
  document.querySelector('.modal-close').focus();
}
function closeModal() {
  document.getElementById('project-modal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('project-modal').setAttribute('aria-hidden','true');
  if (modalReturnFocus) modalReturnFocus.focus();
}
function closeModalOutside(e) {
  if (e.target.id === 'project-modal') closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ══════════════════════════════════════
   RECEIPT
══════════════════════════════════════ */
function generateReceipt() {
  const name = document.getElementById('visitor-name').value.trim() || 'A Lovely Visitor';
  const now  = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('r-visitor').textContent = name;
  document.getElementById('r-date').textContent    = dateStr;
  // Mark souvenir as visited when receipt is generated
  markVisited('souvenir');
  updateReceiptChecks();
  // Scroll receipt into view smoothly
  document.getElementById('receipt').scrollIntoView({ behavior:'smooth', block:'center' });
}

function printReceipt() {
  // Ensure receipt has content
  if (document.getElementById('r-visitor').textContent === 'A Lovely Visitor' || document.getElementById('r-visitor').textContent === '—') {
    generateReceipt();
  }
  const printCopy = document.getElementById('receipt').cloneNode(true);
  printCopy.id = 'receipt-print';
  printCopy.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  document.getElementById('print-area').replaceChildren(printCopy);
  window.print();
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
// Mark welcome as visited immediately
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('r-date').textContent = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  updateReceiptChecks();
});

/* Keyboard access for the original reference's interactive cards. */
document.querySelectorAll('.flip-card, .timeline-entry, .project-card').forEach(el => {
  el.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); el.click();
    }
  });
});
document.addEventListener('keydown', event => {
  const modal = document.getElementById('project-modal');
  if (event.key === 'Tab' && modal.classList.contains('open')) {
    const focusable = [...modal.querySelectorAll('button, a[href], input, [tabindex="0"]')];
    if (focusable.length === 1) { event.preventDefault(); focusable[0].focus(); }
  }
});

/* REAL CAMERA PHOTO BOOTH — no libraries and no uploads.
   References are listed in README.md and in the site's Credits section. */
(() => {
  const byId = id => document.getElementById(id);
  const video = byId('pb-video');
  const strip = byId('strip-canvas');
  const start = byId('pb-start'), capture = byId('pb-capture');
  const stop = byId('pb-stop'), retake = byId('pb-retake'), download = byId('pb-download');
  const frame = byId('pb-frame'), mirror = byId('pb-mirror'), mono = byId('pb-mono');
  const status = byId('pb-status'), countdown = byId('pb-countdown');
  const placeholder = byId('camera-placeholder');
  const palettes = {
    matcha: { paper: '#e1ebd3', ink: '#355641', accent: '#abc48b', motif: 'MATCHA & MEOW' },
    strawberry: { paper: '#f8dce7', ink: '#844160', accent: '#dda3ba', motif: 'A SWEET LITTLE MEMORY' },
    adventure: { paper: '#f9edc7', ink: '#574735', accent: '#d1ae5c', motif: 'OUR LITTLE ADVENTURE' },
    cream: { paper: '#fffaf0', ink: '#514538', accent: '#d3c5ab', motif: 'A LITTLE MOMENT TO KEEP' }
  };
  let stream = null, requestPending = false, busy = false, shots = [];
  let cameraGeneration = 0, captureGeneration = 0, audio = null;
  const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
  const say = text => { status.textContent = text; };
  function updateButtons() {
    start.disabled = Boolean(stream) || requestPending;
    stop.disabled = !stream && !requestPending;
    capture.disabled = !stream || busy || shots.length === 3;
    retake.disabled = busy || shots.length === 0;
    download.disabled = busy || shots.length !== 3;
    mirror.disabled = busy; mono.disabled = busy;
    placeholder.hidden = Boolean(stream);
    video.style.transform = mirror.checked ? 'scaleX(-1)' : '';
    video.style.filter = mono.checked ? 'grayscale(1)' : '';
  }
  function renderStrip() {
    const ctx = strip.getContext('2d');
    const theme = palettes[frame.value];
    ctx.fillStyle = theme.paper; ctx.fillRect(0, 0, strip.width, strip.height);
    ctx.fillStyle = theme.ink; ctx.textAlign = 'center';
    ctx.font = 'bold 25px Georgia'; ctx.fillText("Princess's Little World", 360, 44);
    for (let i = 0; i < 3; i++) {
      const y = 75 + i * 505;
      if (shots[i]) ctx.drawImage(shots[i], 40, y, 640, 480);
      else {
        ctx.fillStyle = '#fffdf8'; ctx.fillRect(40, y, 640, 480);
        ctx.fillStyle = theme.ink; ctx.font = '24px sans-serif';
        ctx.fillText('Photo ' + (i + 1), 360, y + 240);
      }
      ctx.strokeStyle = theme.accent; ctx.lineWidth = 5;
      ctx.strokeRect(40, y, 640, 480);
    }
    ctx.fillStyle = theme.ink; ctx.font = 'bold 20px monospace';
    ctx.fillText(theme.motif, 360, 1640);
    ctx.font = '21px Georgia'; ctx.fillText('Princess S. Responte · GEC124 – H23', 360, 1680);
    ctx.font = '18px monospace';
    ctx.fillText(new Date().toLocaleDateString(), 360, 1715);
    ctx.font = '18px Georgia'; ctx.fillText('Thanks for making a memory here.', 360, 1748);
  }
  function stopCamera(message = 'Camera stopped. Your captured strip is still available.') {
    cameraGeneration++; captureGeneration++;
    busy = false; requestPending = false; countdown.textContent = '';
    if (stream) stream.getTracks().forEach(track => track.stop());
    stream = null; video.srcObject = null;
    updateButtons(); say(message);
  }
  async function readyVideo(token) {
    const end = Date.now() + 10000;
    while (token === cameraGeneration && video.readyState < 2 && Date.now() < end) await pause(100);
    if (token !== cameraGeneration) return false;
    if (video.readyState < 2 || !video.videoWidth) throw new Error('PreviewTimeout');
    return true;
  }
  async function startCamera() {
    if (stream || requestPending) return;
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      say('Camera access is unavailable here. Open this site over HTTPS or localhost in a supported browser.'); return;
    }
    const token = ++cameraGeneration;
    requestPending = true; updateButtons(); say('Waiting for camera permission…');
    let incoming;
    try {
      incoming = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false
      });
      if (token !== cameraGeneration) { incoming.getTracks().forEach(track => track.stop()); return; }
      stream = incoming; video.srcObject = stream;
      stream.getVideoTracks().forEach(track => track.addEventListener('ended', () => {
        if (stream === incoming) stopCamera('The camera disconnected. Press Start camera to try again.');
      }));
      await video.play();
      if (!await readyVideo(token)) return;
      requestPending = false; updateButtons(); say('Camera ready. Choose your frame, then take three photos.');
    } catch (error) {
      if (token !== cameraGeneration) { incoming?.getTracks().forEach(track => track.stop()); return; }
      const messages = {
        NotAllowedError: 'Camera permission was denied. Allow camera access in your browser and try again.',
        NotFoundError: 'No camera was found. Connect a camera and try again.',
        NotReadableError: 'The camera is busy or unavailable. Close other apps using it, then try again.',
        PreviewTimeout: 'The camera preview did not become ready. Press Start camera to try again.'
      };
      stopCamera(messages[error.name] || messages[error.message] || 'Could not start the camera. Please try again.');
    }
  }
  function enableAudio() {
    if (!byId('pb-sound').checked) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    try { audio ||= new Audio(); audio.resume().catch(() => {}); } catch (_) { /* Sound is optional. */ }
  }
  function beep(shutter = false) {
    if (!byId('pb-sound').checked || !audio || audio.state !== 'running') return;
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.frequency.value = shutter ? 1100 : 660;
    gain.gain.setValueAtTime(0.04, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.09);
    oscillator.connect(gain); gain.connect(audio.destination);
    oscillator.start(); oscillator.stop(audio.currentTime + 0.1);
  }
  function snapshot() {
    if (!video.videoWidth || !video.videoHeight || video.readyState < 2) throw new Error('PreviewNotReady');
    const canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 480;
    const ctx = canvas.getContext('2d');
    // Center-crop to 4:3; never stretch the camera feed.
    const ratio = 4 / 3, vw = video.videoWidth, vh = video.videoHeight;
    const sw = vw / vh > ratio ? vh * ratio : vw;
    const sh = vw / vh > ratio ? vh : vw / ratio;
    ctx.save();
    if (mirror.checked) { ctx.translate(640, 0); ctx.scale(-1, 1); }
    ctx.filter = mono.checked ? 'grayscale(1)' : 'none';
    ctx.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, 640, 480);
    ctx.restore(); return canvas;
  }
  async function takeStrip() {
    if (!stream || busy || requestPending || shots.length === 3) return;
    enableAudio(); const token = ++captureGeneration; busy = true; shots = [];
    renderStrip(); updateButtons();
    try {
      for (let i = 0; i < 3; i++) {
        for (let n = 3; n > 0; n--) {
          if (token !== captureGeneration || !stream) return;
          countdown.textContent = String(n); say('Photo ' + (i + 1) + ' of 3 in ' + n + '…'); beep();
          await pause(1000);
        }
        if (token !== captureGeneration || !stream) return;
        countdown.textContent = ''; shots.push(snapshot()); beep(true); renderStrip();
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          byId('camera-preview').classList.add('shutter-flash');
          setTimeout(() => byId('camera-preview').classList.remove('shutter-flash'), 160);
        }
        await pause(350);
      }
      say('Your three-photo strip is ready. Download it, change its frame, or retake it.');
    } catch (_) { say('Capture interrupted. Check the camera preview and try again.'); }
    finally {
      if (token === captureGeneration) { busy = false; countdown.textContent = ''; updateButtons(); }
    }
  }
  start.addEventListener('click', startCamera);
  stop.addEventListener('click', () => stopCamera());
  capture.addEventListener('click', takeStrip);
  retake.addEventListener('click', () => {
    shots = []; renderStrip(); updateButtons(); say(stream ? 'Ready for a fresh strip.' : 'Start the camera to take a fresh strip.');
  });
  frame.addEventListener('change', renderStrip);
  mirror.addEventListener('change', updateButtons); mono.addEventListener('change', updateButtons);
  byId('pb-sound').addEventListener('change', enableAudio);
  download.addEventListener('click', () => {
    if (shots.length !== 3 || busy) return;
    strip.toBlob(blob => {
      if (!blob) { say('Could not create the download. Please try again.'); return; }
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = 'princess-photo-strip.png'; document.body.appendChild(link);
      link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
      say('Photo strip download started.');
    }, 'image/png');
  });
  document.addEventListener('booth:hide', () => {
    if (stream || requestPending) stopCamera('Camera stopped when you left the photo booth.');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (stream || requestPending)) stopCamera('Camera stopped while the page was hidden.');
  });
  window.addEventListener('pagehide', () => stopCamera());
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting && (stream || requestPending)) stopCamera('Camera stopped when you left the photo booth.');
  }).observe(byId('photobooth'));
  renderStrip(); updateButtons();
})();

/* Automatic sparkle cursor trail. Respects reduced motion and touch devices. */
let lastSparkle = 0;
document.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || performance.now() - lastSparkle < 90) return;
  lastSparkle = performance.now();
  const sparkle = document.createElement('span'); sparkle.className = 'cursor-sparkle';
  sparkle.setAttribute('aria-hidden', 'true'); sparkle.textContent = '✧';
  sparkle.style.left = event.clientX + 12 + 'px'; sparkle.style.top = event.clientY + 12 + 'px';
  document.body.appendChild(sparkle); setTimeout(() => sparkle.remove(), 650);
});

/* Photo gallery: manual navigation, keyboard arrows, and touch swipes. */
const gallery = document.querySelector('[data-carousel="favorites"]');
const gallerySlides = Array.from(gallery.querySelectorAll('[data-slide]'));
const galleryDots = Array.from(gallery.querySelectorAll('[data-go]'));
let favoriteIndex = 0;
function showFavorite(index) {
  favoriteIndex = (index + gallerySlides.length) % gallerySlides.length;
  gallerySlides.forEach((slide, i) => { slide.hidden = i !== favoriteIndex; });
  galleryDots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === favoriteIndex)));
  gallery.querySelector('.carousel-status').textContent = gallerySlides[favoriteIndex].querySelector('figcaption').textContent + ' · ' + (favoriteIndex + 1) + ' of ' + gallerySlides.length;
}
gallery.querySelector('[data-prev]').addEventListener('click', () => showFavorite(favoriteIndex - 1));
gallery.querySelector('[data-next]').addEventListener('click', () => showFavorite(favoriteIndex + 1));
galleryDots.forEach(dot => dot.addEventListener('click', () => showFavorite(Number(dot.dataset.go))));
gallery.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  showFavorite(event.key === 'Home' ? 0 : event.key === 'End' ? gallerySlides.length - 1 : favoriteIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
let swipeStart = null;
gallery.querySelector('.favorite-window').addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse') swipeStart = {x: event.clientX, y: event.clientY};
});
gallery.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x, dy = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showFavorite(favoriteIndex + (dx < 0 ? 1 : -1));
});
gallery.addEventListener('pointercancel', () => { swipeStart = null; });

/* Receipt / photo-booth panels. Stop the camera when its panel is hidden. */
function showSouvenirPanel(panel) {
  const isBooth = panel === 'photobooth';
  document.getElementById('receipt-panel').hidden = isBooth;
  document.getElementById('photobooth').hidden = !isBooth;
  [['receipt-tab', !isBooth], ['booth-tab', isBooth]].forEach(([id, selected]) => {
    const tab = document.getElementById(id);
    tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
  });
  document.getElementById('keepsake-status').textContent = isBooth ? 'Photo Booth · 2 of 2' : 'Visit Receipt · 1 of 2';
  if (!isBooth) document.dispatchEvent(new Event('booth:hide'));
}
function toggleSouvenirPanel() { showSouvenirPanel(document.getElementById('photobooth').hidden ? 'photobooth' : 'receipt'); }
document.querySelector('.keepsake-tabs').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const booth = event.key === 'End' || (event.key !== 'Home' && document.getElementById('photobooth').hidden);
  showSouvenirPanel(booth ? 'photobooth' : 'receipt');
  document.getElementById(booth ? 'booth-tab' : 'receipt-tab').focus();
});
function revealHashPanel() { if (location.hash === '#photobooth') { showSouvenirPanel('photobooth'); document.getElementById('photobooth').scrollIntoView(); } }
window.addEventListener('hashchange', revealHashPanel);
revealHashPanel();
updateReceiptChecks();
