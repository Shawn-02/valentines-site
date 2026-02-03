const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const card = document.getElementById("card");
const confetti = document.getElementById("confetti");
const music = document.getElementById("bg-music");

// ✅ Name from URL: ?name=Sarah
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
if (name) {
  const safe = name.replace(/[<>]/g, ""); // basic safety
  const nameEl = document.getElementById("name");
  if (nameEl) nameEl.textContent = safe;
}

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
  dodgeLevel = Math.min(dodgeLevel + 1, 6);
  noBtn.style.transform = `scale(${Math.max(0.85, 1 - dodgeLevel * 0.03)})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", () => {
  // extra evil: starts dodging even before hover is “committed”
  if (dodgeLevel >= 3 && Math.random() < 0.25) moveNoButton();
});

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

function sprinkleConfetti(count = 90) {
  confetti.innerHTML = "";
  const emojis = ["💖","💘","💗","💞","✨","😍","🌹"];

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = `${Math.random() * 100}vw`;
    s.style.animationDelay = `${Math.random() * 0.4}s`;
    confetti.appendChild(s);
  }
  setTimeout(() => (confetti.innerHTML = ""), 2500);
}

yesBtn.addEventListener("click", () => {
  music.volume = 1;
  music.play();

  sprinkleConfetti();

  card.innerHTML = `
    <div class="hearts">🎉 💖 🎉</div>
    <h1>YAYYYYY 😭💘</h1>
    <p class="sub">Okay cool… I’m officially the happiest person alive.</p>
    <p class="small">Now there’s no going back 😌</p>
    <button class="btn yes" id="again">Replay 🔁</button>
  `;

  document.getElementById("again")
    .addEventListener("click", () => location.reload());
});