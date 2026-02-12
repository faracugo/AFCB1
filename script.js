// PERSONALIZA AQUÍ ✨
const recipientName = "Andrés...";     // Ej: "Carlos"
const fromName = "Fátima";          // Ej: "Sofi"
const poem = `
Tú eres el pincel
Que pinta mi papel
Tú llenas de color mi vida

Contigo me siento bien
Eres como te soñé
Así que ven y quédate en mi vida

Tus palabras me hacen ver
Que no eres de papel
Mi otra mitad, ya te encontré

`;

const envelope = document.getElementById("envelope");
const poemText = document.getElementById("poemText");
const toLine = document.getElementById("toLine");
const fromLine = document.getElementById("fromLine");
const promiseBtn = document.getElementById("promiseBtn");
const replayBtn = document.getElementById("replayBtn");
const promiseBox = document.getElementById("promiseBox");

toLine.innerHTML = `Para: <strong>${recipientName}</strong>`;
fromLine.textContent = `— ${fromName}`;

let opened = false;
let typingTimer = null;

function typeWriter(text, el, speed = 18){
  el.textContent = "";
  let i = 0;

  clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(typingTimer);
  }, speed);
}

function openLetter(){
  if (opened) return;
  opened = true;
  envelope.classList.add("open");
  promiseBox.hidden = true;
  typeWriter(poem.trim(), poemText, 16);
  burstHearts(18);
}

function resetLetter(){
  opened = false;
  envelope.classList.remove("open");
  promiseBox.hidden = true;
  poemText.textContent = "";
}

envelope.addEventListener("click", openLetter);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") openLetter();
});

promiseBtn.addEventListener("click", () => {
  promiseBox.hidden = !promiseBox.hidden;
  burstHearts(10);
});

replayBtn.addEventListener("click", () => {
  resetLetter();
  setTimeout(openLetter, 150);
});

// Corazones flotando constantes
const heartsLayer = document.querySelector(".hearts");
function spawnFloatingHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  const left = Math.random() * 100;
  const size = 10 + Math.random() * 14;
  const dur = 6 + Math.random() * 6;

  h.style.left = `${left}vw`;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;
  h.style.animationDuration = `${dur}s`;
  h.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);

  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnFloatingHeart, 450);

// Explosión de corazones cuando abres / botones
function burstHearts(n=12){
  for(let i=0;i<n;i++){
    const h = document.createElement("div");
    h.className = "heart";
    const left = 30 + Math.random() * 40; // centro aprox
    const size = 10 + Math.random() * 18;
    const dur = 2.4 + Math.random() * 1.8;

    h.style.left = `${left}vw`;
    h.style.width = `${size}px`;
    h.style.height = `${size}px`;
    h.style.animationDuration = `${dur}s`;
    h.style.opacity = (0.5 + Math.random() * 0.45).toFixed(2);

    heartsLayer.appendChild(h);
    setTimeout(() => h.remove(), dur * 1000);
  }
}
