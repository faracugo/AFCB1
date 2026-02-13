// PERSONALIZA AQUÍ ✨
const recipientName = "Andrés Felipe";     // Ej: "Carlos"
const fromName = "Fati";          // Ej: "Sofi"
const poem = `
Amor, déjame ser yo lo primero
Que se asome ahí en tu almohada
Que tu pecho sea siempre
Donde apoyaré mi cara
Y que hagas nudo con mis piernas
Cuando yo me duerma

Amor, déjame ser siempre el deseo
Que hace que vuelvas a casa
Que aún mires mi cintura
Y quieras ser tú quien la abraza
Que en mi oído siempre duerman
Todas tus palabras

Y ser la mejor parte que hay de ti

Déjame abrazarte para siempre
Déjame besarte a mi manera
Agarrar tu mano donde quiera
Porque yo he nacido pa' quererte

Amor, yo quiero hacer vida contigo
Ser amantes, ser amigos
Y ser la historia favorita
Que comparten los testigos
Que conocen lo que somos
Y lo que antes fuimos

Y ser la mejor parte que hay de mí

Y déjame abrazarte para siempre
Déjame besarte a mi manera
Agarrar tu mano donde quiera
Porque yo he nacido pa' quererte

Yo quiero ser tu compañera
Y solo quiero sumar a tu vida
Ser la espuma blanca ahí en la arena
Que vive acercándose a tu orilla

Y déjame abrazarte para siempre
Déjame besarte a mi manera
Agarrar tu mano donde quiera
Porque yo he nacido pa' quererte
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
