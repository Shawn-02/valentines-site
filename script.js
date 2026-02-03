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
  const safe = name.replace(/[<>]/g, "");
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

  noBtn.style.position = "fixed";
  noBtn.style.left = `${rand(padding, Math.max(padding, maxX))}px`;
  noBtn.style.top = `${rand(padding, Math.max(padding, maxY))}px`;

  dodgeLevel = Math.min(dodgeLevel + 1, 7);
  noBtn.style.transform = `scale(${Math.max(0.82, 1 - dodgeLevel * 0.03)})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", () => {
  if (dodgeLevel >= 3 && Math.random() < 0.25) moveNoButton();
});

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

// ====== Reservation screen ======
function showReservations() {
  card.innerHTML = `
    <div class="hearts">📍 💖 📍</div>
    <h1>Pick our reservation 😌</h1>
    <p class="sub">Choose one:</p>

    <div style="
      display:flex;
      gap:24px;
      justify-content:center;
      flex-wrap:wrap;
      margin-top:18px;
    ">
      <!-- Reservation 1 -->
      <div style="text-align:center;">
        <img
          id="res1"
          src="reservation1.jpeg"
          alt="Hudson House Post Oak"
          style="
            width: 240px;
            height: 180px;
            object-fit: cover;
            border-radius: 16px;
            cursor: pointer;
            box-shadow: 0 12px 20px rgba(0,0,0,0.15);
          "
        />
        <p style="margin-top:10px; font-weight:700;">
          Hudson House Post Oak
        </p>
      </div>

      <!-- Reservation 2 -->
      <div style="text-align:center;">
        <img
          id="res2"
          src="reservation2.jpeg"
          alt="Handies Douzo"
          style="
            width: 240px;
            height: 180px;
            object-fit: cover;
            border-radius: 16px;
            cursor: pointer;
            box-shadow: 0 12px 20px rgba(0,0,0,0.15);
          "
        />
        <p style="margin-top:10px; font-weight:700;">
          Handies Douzo
        </p>
      </div>
    </div>

    <p class="small" style="margin-top:16px;">
      Tap one to lock it in 🔒
    </p>
  `;

  const sendChoice = (choice) => {
    const subject = encodeURIComponent("Valentine reservation choice 💘");
    const body = encodeURIComponent(
      `She chose: ${choice}\n\nFrom: ${window.location.href}`
    );

    // opens THEIR email app pre-filled to you
    window.location.href = `mailto:ishansunesara@gmail.com?subject=${subject}&body=${body}`;
  };

  document.getElementById("res1").addEventListener("click", () =>
    sendChoice("Hudson House Post Oak")
  );

  document.getElementById("res2").addEventListener("click", () =>
    sendChoice("Handies Douzo")
  );
}

// ====== YES click ======
yesBtn.addEventListener("click", async () => {
  try {
    if (music) {
      music.volume = 0.9;
      await music.play();
    }
  } catch (e) {
    console.log("Audio issue:", e);
  }

  sprinkleConfetti();

  card.innerHTML = `
    <div class="hearts">🎉 💖 🎉</div>
    <h1>YAYYYYY 😭💘</h1>
    <p class="sub"><strong>I SEE KAREEM I SEE KAREEM</strong></p>
    <p class="small">Now there’s no going back 😌</p>

    <img 
      src="dog.gif" 
      alt="dancing dog"
      style="width: 200px; margin: 18px auto; display: block; border-radius: 12px;"
    />

    <button class="btn yes" id="next">Next ➜</button>
  `;

  document.getElementById("next").addEventListener("click", showReservations);
});

// ====== Pause music if tab is hidden ======
document.addEventListener("visibilitychange", () => {
  if (!music) return;
  if (document.hidden) music.pause();
});