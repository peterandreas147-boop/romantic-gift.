/* ============================================================
   ROMANTIC DIGITAL GIFT — CONFIGURATION
   Edit everything below to personalize your gift!
   ============================================================ */

const CONFIG = {
  partnerName: "RIVEHH",
  yourName: "Piterr",
  secretCode: "123456",

  occasion: "JUST BECAUSE", // ANNIVERSARY | BIRTHDAY | JUST BECAUSE
  occasionLabel: "LsdOahdVeadEuiyU ", // e.g. "Happy Anniversary ❤️"
  anniversaryDate: "DD MONTH YYYY",

  letter: {
    greeting: "Dear",
    paragraphs: [
      "Kalau kamu sampai di halaman ini, berarti kamu udah berhasil lewatin semua jebakan kecil yang aku buat.",
      "Jujur, aku sebenarnya cuma ingin bilang satu hal. Aku bersyukur bisa kenal dan dekat sama kamu.",
      "Semangat ya haidnya, di tahan kalau sakit perutnya cuman seminggu kok, aku juga bakal berusaha buat mood kamu bagus setiap hari.",
      "Makasih juga udah mau berteman sama aku atau lebih?!? hehehe",
      "Maaf yaa kalau aku mungkin belom sesuai sama cowo yang kamu harapin.",
      "Plisss jangan galak galak :).",
    ],
    closing: "Terima kasih udah jadi diri kamu sendiri. ❤️",
    signature: "With love,",
  },

  photos: [
    { src: "assets/photos/photo1.jpeg", caption: "bocil ❤️", alt: "Memory photo 1" },
    { src: "assets/photos/photo2.jpeg", caption: "day one ketemu 😂", alt: "Memory photo 2" },
    { src: "assets/photos/photo3.jpeg", caption: "iii gemes amat.", alt: "Memory photo 3" },
    { src: "assets/photos/photo4.jpeg", caption: "genit bngt meletin piter.", alt: "Memory photo 4" },
    { src: "assets/photos/photo5.jpeg", caption: "WKWKWKWKWK", alt: "Memory photo 5" },
    { src: "assets/photos/photo6.jpeg", caption: "naykiluyyy💕.", alt: "Memory photo 6" },
  ],

  stats: [
    { emoji: "❤️", label: "Love Level", value: "100%", percent: 100, type: "bar" },
    { emoji: "😂", label: "Ketawa Bareng", value: "∞", percent: 100, type: "bar" },
    { emoji: "🥺", label: "Kangen Kamu", value: "999999%", percent: 100, type: "bar" },
    { emoji: "😤", label: "Berantem", value: "Ga pernah", percent: 0, type: "bar" },
    { emoji: "🍜", label: "ngeDate", value: "Masih Kurang", percent: 10, type: "bar" },
    { emoji: "💬", label: "Random Chat", value: "Ga ke itung", percent: 100, type: "bar" },
  ],

  interactions: {
    hug: "Hug diterima. Piternya jadi gila. 🫂❤️",
    kiss: "Kiss diterima. Piternya langsung terbang... 😳",
  },

  finalSurprise: {
    line1: "Kalau aku harus disuruh milih lagi...",
    line2: "Aku bakalan tetap milih kamu.",
    line3: "Sampai waktu yang gabisa ditentukan. ❤️",
    line4: "Thank you udah ada buat aku.",
  },

  music: {
    src: "assets/music/our-song.mp3",
    enabled: true,
  },
};

/* ============================================================
   APP STATE & DOM
   ============================================================ */

const SCREENS = [
  "landing", "code", "envelope", "flowers", "letter",
  "gallery", "stats", "interaction", "surprise", "ending",
];

let currentScreen = 0;
let musicPlaying = false;
let letterTyped = false;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const bgMusic = $("#bgMusic");
const musicToggle = $("#musicToggle");
const confettiCanvas = $("#confettiCanvas");

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundHearts();
  initBackgroundParticles();
  initGallery();
  initStats();
  initEnding();
  initSurpriseText();
  bindEvents();
  setupPhotoFallbacks();
});

function bindEvents() {
  $("#btnStart").addEventListener("click", onStart);
  $("#codeForm").addEventListener("submit", onCodeSubmit);
  $("#waxSeal").addEventListener("click", onSealClick);
  $("#btnOpenLetter").addEventListener("click", () => goToScreen("letter"));
  $("#btnLetterNext").addEventListener("click", () => goToScreen("gallery"));
  $("#btnGalleryNext").addEventListener("click", () => goToScreen("stats"));
  $("#btnStatsNext").addEventListener("click", () => goToScreen("interaction"));
  $("#btnInteractionNext").addEventListener("click", () => goToScreen("surprise"));
  $("#btnFinalSurprise").addEventListener("click", onFinalSurprise);
  musicToggle.addEventListener("click", toggleMusic);

  $$(".btn-interaction").forEach((btn) => {
    btn.addEventListener("click", () => onInteraction(btn.dataset.gift));
  });

  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", onKeyDown);
}

/* ============================================================
   NAVIGATION
   ============================================================ */

function goToScreen(name) {
  const idx = SCREENS.indexOf(name);
  if (idx === -1) return;

  const current = $(`.screen.active`);
  if (current) {
    current.classList.add("leaving");
    setTimeout(() => {
      current.classList.remove("active", "leaving");
    }, 500);
  }

  setTimeout(() => {
    currentScreen = idx;
    const next = $(`#screen-${name}`);
    next.classList.add("active");
    resetScreenAnimations(next);

    if (name === "letter" && !letterTyped) {
      startLetterTyping();
    }
    if (name === "stats") {
      animateStatsRows();
    }
  }, 500);
}

function animateStatsRows() {
  $$("#statsDashboard .stat-row").forEach((row, i) => {
    row.classList.remove("animate-in");
    row.style.animationDelay = `${i * 0.1}s`;
    void row.offsetWidth;
    row.classList.add("animate-in");
  });
  $$("#screen-stats .stat-bar-fill").forEach((bar) => {
    bar.classList.remove("animate");
    void bar.offsetWidth;
    bar.classList.add("animate");
  });
}

function resetScreenAnimations(screen) {
  screen.querySelectorAll(".fade-in, .fade-in-sequence > *").forEach((el) => {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  });
}

/* ============================================================
   LANDING & MUSIC
   ============================================================ */

function onStart() {
  tryStartMusic();
  goToScreen("code");
}

function tryStartMusic() {
  if (!CONFIG.music.enabled || !bgMusic) return;
  bgMusic.src = CONFIG.music.src;
  bgMusic.play().then(() => {
    musicPlaying = true;
    updateMusicButton();
  }).catch(() => {
    musicPlaying = false;
    updateMusicButton();
  });
}

function toggleMusic() {
  if (!bgMusic) return;
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.src = CONFIG.music.src;
    bgMusic.play().then(() => {
      musicPlaying = true;
      updateMusicButton();
    }).catch(() => {});
  }
  updateMusicButton();
}

function updateMusicButton() {
  const label = musicToggle.querySelector(".music-label");
  label.textContent = musicPlaying ? "Music ON" : "Music OFF";
  musicToggle.classList.toggle("playing", musicPlaying);
}

/* ============================================================
   SECRET CODE
   ============================================================ */

function onCodeSubmit(e) {
  e.preventDefault();
  const input = $("#secretInput");
  const feedback = $("#codeFeedback");
  const value = input.value.trim();

  if (value === CONFIG.secretCode) {
    input.classList.remove("shake");
    feedback.textContent = "Correct! You really know us. ❤️";
    feedback.className = "code-feedback success";
    setTimeout(() => goToScreen("envelope"), 1500);
  } else {
    feedback.textContent = "Wrong answer 😭\nTry again, babe.";
    feedback.className = "code-feedback error";
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.value = "";
    input.focus();
  }
}

/* ============================================================
   ENVELOPE
   ============================================================ */

function onSealClick() {
  const seal = $("#waxSeal");
  const flap = $("#envelopeFlap");
  const letter = $("#envelopeLetter");
  const wrapper = $("#envelopeWrapper");

  if (seal.classList.contains("opened")) return;

  seal.classList.add("opened");
  flap.classList.add("open");
  letter.classList.add("out");

  setTimeout(() => {
    wrapper.classList.add("fade-out");
  }, 1200);

  setTimeout(() => goToScreen("flowers"), 2200);
}

/* ============================================================
   LOVE LETTER TYPING
   ============================================================ */

function startLetterTyping() {
  letterTyped = true;
  const dear = $("#letterDear");
  const body = $("#letterBody");
  const sign = $("#letterSign");
  const btnNext = $("#btnLetterNext");

  dear.textContent = `${CONFIG.letter.greeting} ${CONFIG.partnerName},`;
  body.innerHTML = "";
  sign.textContent = "";

  const allParagraphs = [...CONFIG.letter.paragraphs, CONFIG.letter.closing];
  let pIndex = 0;
  let charIndex = 0;
  let currentP = null;

  function typeNext() {
    if (pIndex >= allParagraphs.length) {
      sign.textContent = `${CONFIG.letter.signature}\n${CONFIG.yourName}`;
      btnNext.classList.remove("hidden");
      btnNext.classList.add("fade-in");
      return;
    }

    const text = allParagraphs[pIndex];
    if (!currentP) {
      currentP = document.createElement("p");
      body.appendChild(currentP);
      charIndex = 0;
    }

    if (charIndex < text.length) {
      currentP.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeNext, 22);
    } else {
      pIndex++;
      currentP = null;
      setTimeout(typeNext, 350);
    }
  }

  setTimeout(typeNext, 600);
}

/* ============================================================
   GALLERY
   ============================================================ */

function initGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";

  CONFIG.photos.forEach((photo, i) => {
    const item = document.createElement("div");
    item.className = "polaroid";
    item.style.setProperty("--rotate", `${(Math.random() * 8 - 4).toFixed(1)}deg`);
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `View photo: ${photo.caption}`);

    item.innerHTML = `
      <div class="polaroid-img-wrap">
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy" data-index="${i}">
      </div>
      <p class="polaroid-caption">${photo.caption}</p>
    `;

    const img = item.querySelector("img");
    img.addEventListener("error", onPhotoError);

    item.addEventListener("click", () => openModal(i));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(i);
      }
    });

    grid.appendChild(item);
  });
}

function setupPhotoFallbacks() {
  $$(".polaroid img, #modalImage").forEach((img) => {
    img.addEventListener("error", onPhotoError);
  });
}

function onPhotoError(e) {
  const img = e.target;
  if (img.dataset.fallback) return;
  img.dataset.fallback = "true";
  const index = img.dataset.index ?? "0";
  img.src = `assets/images/placeholder-${(parseInt(index, 10) % 6) + 1}.svg`;
}

function openModal(index) {
  const photo = CONFIG.photos[index];
  const modal = $("#photoModal");
  const img = $("#modalImage");
  const caption = $("#modalCaption");

  img.src = photo.src;
  img.alt = photo.alt;
  img.dataset.index = index;
  caption.textContent = photo.caption;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  $("#photoModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function onKeyDown(e) {
  if (e.key === "Escape" && !$("#photoModal").classList.contains("hidden")) {
    closeModal();
  }
}

/* ============================================================
   STATS DASHBOARD
   ============================================================ */

function initStats() {
  const dashboard = $("#statsDashboard");
  dashboard.innerHTML = `
    <p class="system-status">System Status: Completely In Love ❤️</p>
  `;

  CONFIG.stats.forEach((stat, i) => {
    const row = document.createElement("div");
    row.className = "stat-row";

    if (stat.type === "bar") {
      row.innerHTML = `
        <div class="stat-header">
          <span>${stat.emoji} ${stat.label}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="--target: ${stat.percent}%"></div>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="stat-header">
          <span>${stat.emoji} ${stat.label}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
      `;
    }

    dashboard.appendChild(row);
  });

  observeStats();
}

function observeStats() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".stat-bar-fill").forEach((bar) => {
            bar.classList.add("animate");
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsScreen = $("#screen-stats");
  observer.observe(statsScreen);
}

/* ============================================================
   MINI INTERACTION & CONFETTI
   ============================================================ */

function onInteraction(type) {
  const result = $("#interactionResult");
  const btnNext = $("#btnInteractionNext");

  result.textContent = CONFIG.interactions[type];
  result.classList.remove("hidden");
  result.classList.add("fade-in");
  btnNext.classList.remove("hidden");
  btnNext.classList.add("fade-in");

  launchConfetti();
}

function launchConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const colors = ["#e8a0b4", "#c77d8e", "#f5e6d3", "#8b2942", "#ffd6e0", "#fff"];
  const pieces = Array.from({ length: 60 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height * -1,
    w: Math.random() * 8 + 4,
    h: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 2,
    drift: Math.random() * 2 - 1,
    rotation: Math.random() * 360,
    rotSpeed: Math.random() * 6 - 3,
  }));

  let frame = 0;
  const maxFrames = 120;

  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  draw();
}

/* ============================================================
   FINAL SURPRISE
   ============================================================ */

function initSurpriseText() {
  $("#surpriseLine1").textContent = CONFIG.finalSurprise.line1;
  $("#surpriseLine2").textContent = CONFIG.finalSurprise.line2;
  $("#surpriseLine3").textContent = CONFIG.finalSurprise.line3;
  $("#surpriseLine4").textContent = CONFIG.finalSurprise.line4;
}

function onFinalSurprise() {
  const intro = $("#surpriseIntro");
  const reveal = $("#surpriseReveal");
  const screen = $("#screen-surprise");

  intro.classList.add("fade-out-fast");
  setTimeout(() => {
    intro.classList.add("hidden");
    screen.classList.add("dark-mode");
    reveal.classList.remove("hidden");

    revealSequence();
  }, 600);
}

function revealSequence() {
  const lines = [
    $("#surpriseLine1"),
    $("#surpriseLine2"),
    $("#surpriseLine3"),
    $("#surpriseLine4"),
  ];

  lines[0].classList.add("visible");

  setTimeout(() => {
    lines[1].classList.remove("hidden");
    lines[1].classList.add("visible", "big");
  }, 2500);

  setTimeout(() => {
    lines[2].classList.remove("hidden");
    lines[2].classList.add("visible");
  }, 4500);

  setTimeout(() => {
    lines[3].classList.remove("hidden");
    lines[3].classList.add("visible");
  }, 6000);

  setTimeout(() => goToScreen("ending"), 9000);
}

/* ============================================================
   ENDING
   ============================================================ */

function initEnding() {
  $("#endingTitle").textContent = CONFIG.occasionLabel;
}

/* ============================================================
   BACKGROUND EFFECTS
   ============================================================ */

function initBackgroundHearts() {
  const container = $(".bg-hearts");
  const hearts = ["❤", "♥", "💕", "✨"];
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = hearts[i % hearts.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${12 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.fontSize = `${0.6 + Math.random() * 0.8}rem`;
    heart.style.opacity = `${0.15 + Math.random() * 0.25}`;
    container.appendChild(heart);
  }
}

function initBackgroundParticles() {
  const container = $(".bg-particles");
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${8 + Math.random() * 12}s`;
    dot.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(dot);
  }
}
