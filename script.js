const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const card = document.getElementById("card");
const confetti = document.getElementById("confetti");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  const padding = 16;
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${rand(padding, maxX)}px`;
  noBtn.style.top = `${rand(padding, maxY)}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  moveNoButton();
});

function sprinkleConfetti(count = 60) {
  confetti.innerHTML = "";
  const emojis = ["💖","💘","💗","💞","✨","😍"];
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = `${Math.random() * 100}vw`;
    confetti.appendChild(s);
  }
  setTimeout(() => confetti.innerHTML = "", 2000);
}

yesBtn.addEventListener("click", () => {
  sprinkleConfetti();
  card.innerHTML = `
    <h1>YAYYY 💘</h1>
    <p>You just made my day 🥰</p>
    <button class="btn yes" onclick="location.reload()">Replay 🔁</button>
  `;
});
