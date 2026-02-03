// ====== Grab elements ======
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const card = document.getElementById("card");
const confetti = document.getElementById("confetti");
const music = document.getElementById("bg-music");

// ====== Personalize name from URL (?name=Sarah) ======
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
if (name) {
  const safe = name.replace(/[<>]/g, ""); // basic safety
  const nameEl = document.getElementById("name");
  if (nameEl) nameEl.textContent = safe;
}

// ====== No button dodge logic ======
let dodgeLevel = 1;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  const padding = 16;
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  const x = rand(padding, Math.max(padding, maxX));
  const y = rand(padding, Math.max(padding, maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // 😈 gets harder each time
  dodgeLevel = Math.min(dodgeLevel + 1, 7);

  // shrink slightly so it feels like it’s “running away”
  noBtn.style.transform = `scale(${Math.max(0.82, 1 - dodgeLevel * 0.03)})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

// extra evil once it ramps up
noBtn.addEventListener("mousemove", () => {
  if (dodgeLevel >= 3 && Math.random() < 0.25) moveNoButton();
});

// mobile tap attempt
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

// ====== Confetti ======
function sprinkleConfetti(count = 90) {
  confetti.innerHTML = "";
  const emojis = ["💖", "💘", "💗", "💞", "✨", "😍", "🌹"];

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = `${Math.random() * 100}vw`;
    s.style.animationDelay = `${Math.random() * 0.4}s`;
    confetti.appendChild(s);
  }

  setTimeout(() => (confetti.innerHTML = ""), 2500);
}

// ====== Yes click ======
yesBtn.addEventListener("click", async () => {
  // Play music (must be triggered by click to work on mobile)
  try {
    if (music) {
      music.volume = 0.8;
      await music.play();
    }
  } catch (e) {
    console.log("Audio blocked or missing file:", e);
    // optional: show a gentle hint instead of alert
    // alert("Music didn’t start. Check that song.mp3 is in the same folder and pushed to GitHub.");
  }

  sprinkleConfetti();

  card.innerHTML = `
    <div class="hearts">🎉 💖 🎉</div>
    <h1>YAYYYYY 😭💘</h1>
    <p class="sub">Okay cool… I’m officially the happiest person alive.</p>
    <p class="small">Now there’s no going back 😌</p>
    <button class="btn yes" id="again">Replay 🔁</button>
  `;

  document.getElementById("again").addEventListener("click", () => location.reload());
});

// ====== Optional: pause music when tab is hidden ======
document.addEventListener("visibilitychange", () => {
  if (!music) return;
  if (document.hidden) {
    music.pause();
  }
});