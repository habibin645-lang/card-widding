// ============================================
// دعوت‌نامه عروسی رامز و نسرین
// JavaScript
// ============================================

// ============================================
// باز کردن کارت دعوت
// ============================================

const opening = document.getElementById("opening");

const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", function () {
  opening.classList.add("hidden");

  setTimeout(function () {
    document.getElementById("home").scrollIntoView({
      behavior: "smooth",
    });
  }, 700);

  // شروع موسیقی
  startAmbientMusic();
});

// ============================================
// انیمیشن هنگام اسکرول
// ============================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

// ============================================
// شمارش معکوس
// تاریخ: 22/7/1405
// معادل: 14 October 2026
// ============================================

const weddingDate = new Date("2026-10-14T18:00:00+04:30").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  const days = document.getElementById("days");

  const hours = document.getElementById("hours");

  const minutes = document.getElementById("minutes");

  const seconds = document.getElementById("seconds");

  if (distance <= 0) {
    days.innerText = "۰";

    hours.innerText = "۰";

    minutes.innerText = "۰";

    seconds.innerText = "۰";

    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));

  const h = Math.floor((distance / (1000 * 60 * 60)) % 24);

  const m = Math.floor((distance / (1000 * 60)) % 60);

  const s = Math.floor((distance / 1000) % 60);

  days.innerText = toPersianDigits(d);

  hours.innerText = toPersianDigits(h);

  minutes.innerText = toPersianDigits(m);

  seconds.innerText = toPersianDigits(s);
}

function toPersianDigits(value) {
  return String(value).replace(/\d/g, function (digit) {
    return "۰۱۲۳۴۵۶۷۸۹"[digit];
  });
}

updateCountdown();

setInterval(updateCountdown, 1000);

// ============================================
// دکمه برگشت به بالا
// ============================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

// ============================================
// بستن منوی موبایل
// ============================================

document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    const menu = document.getElementById("navMenu");

    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// ============================================
// موسیقی آرام
// بدون فایل موسیقی خارجی
// ============================================

const musicBtn = document.getElementById("musicBtn");

let audioContext = null;

let masterGain = null;

let musicPlaying = false;

let musicTimer = null;

function startAmbientMusic() {
  if (musicPlaying) {
    return;
  }

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = audioContext.createGain();

    masterGain.gain.value = 0.035;

    masterGain.connect(audioContext.destination);

    musicPlaying = true;

    musicBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

    playSoftNotes();
  } catch (error) {
    console.log("Audio error:", error);
  }
}

function playSoftNotes() {
  if (!musicPlaying || !audioContext) {
    return;
  }

  const notes = [
    261.63, 329.63, 392.0, 329.63,

    293.66, 349.23, 440.0, 349.23,
  ];

  let index = 0;

  function playNote() {
    if (!musicPlaying) {
      return;
    }

    const oscillator = audioContext.createOscillator();

    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = notes[index % notes.length];

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
      0.08,
      audioContext.currentTime + 0.05,
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 1.2,
    );

    oscillator.connect(gain);

    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 1.25);

    index++;

    musicTimer = setTimeout(playNote, 650);
  }

  playNote();
}

function stopAmbientMusic() {
  musicPlaying = false;

  if (musicTimer) {
    clearTimeout(musicTimer);
  }

  if (audioContext) {
    audioContext.close();

    audioContext = null;
  }

  musicBtn.innerHTML = '<i class="bi bi-music-note"></i>';
}

musicBtn.addEventListener("click", function () {
  if (musicPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
});
