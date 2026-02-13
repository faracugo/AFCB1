// PERSONALIZA AQUÍ ✨
const music = document.getElementById("bgMusic");
const recipientName = "Andrés Felipe";     // Ej: "Carlos"
const fromName = "Fati";          // Ej: "Sofi"
const poem = `
Quiero que sepas que sos la persona 
por la que tantas veces le pedí a Dios, 
incluso antes de conocerte. 

Sos esa respuesta silenciosa 
que llegó cuando menos lo esperaba, 
pero en el momento justo. 
Sos mucho más de lo que
alguna vez me animé a imaginar.

Sos un hombre increíblemente amoroso, 
atento, apasionado y detallista. 
Soñador, pero con los pies en la tierra. 
Realista, pero sin dejar de creer. 
Ambicioso en el mejor sentido: 
con ganas de crecer, de construir, de ir por más. 

Y en medio de todo eso, 
sos mi hogar. 
Ese lugar seguro al que siempre quiero volver.

Con vos sueño una vida entera. 
Sueño con que cumplamos metas juntos, 
con que construyamos nuestra/s empresa/s, 
nuestra casa, nuestro espacio. 

Sueño con viajar por el mundo de tu mano, 
con conocer lugares nuevos 
y también con volver siempre al mismo abrazo. 

Sueño con nuestros hijos, 
Rosa Inés y Arturo, 
con nuestras mascotas, 
con una vida tranquila pero divertida, 
simple pero llena de amor.

Sueño con largas horas de conversación, 
con mirarnos y entendernos sin palabras, 
con seguir conectando incluso en el silencio. 
Con cantar y bailar juntos aunque no haya música, 
con abrazarnos un montón, con elegirnos todos los días. 
Con desearnos siempre, 
cuidarnos, protegernos, 
ser el cable a tierra del otro cuando todo se sacude.

Gracias por ser quien sos. 
Gracias por existir de la manera en que existís. 
Yo te elijo hoy y te elegiría mil veces más, 
porque con vos, todo tiene sentido.
Te amo primera 😉
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

  // 🎵 Iniciar música
  music.volume = 0.5; // volumen suave
  music.play().catch(() => {
    console.log("El navegador bloqueó el autoplay hasta interacción.");
  });
};
  
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
