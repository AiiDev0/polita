// ==================== CONFIGURACIÓN ====================
// Google Forms
const GOOGLE_FORM_ID =
  "1FAIpQLSdEQpuJgTnmt580D6CqEwiPKW2o3kHJW6DMp9omGBd_6oprVw";
const ENTRY_RESPUESTA = "entry.37528652";
const ENTRY_FECHA = "entry.1237721720";

// FormSubmit - CAMBIA POR TU CORREO
const FORMSUBMIT_URL = "https://formsubmit.co/tucorreo@gmail.com";

// Crear iframe oculto para Google Forms
const iframe = document.createElement("iframe");
iframe.name = "hidden-iframe";
iframe.style.display = "none";
document.body.appendChild(iframe);

function enviarRespuestaInvisible(respuesta) {
  const ahora = new Date();
  const fechaHora = ahora.toLocaleString("es-VE", {
    timeZone: "America/Caracas",
  });

  console.log(`📤 ${respuesta} - ${fechaHora}`);

  // 1️⃣ ENVIAR A GOOGLE FORMS
  const formGoogle = document.createElement("form");
  formGoogle.method = "POST";
  formGoogle.action = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
  formGoogle.target = "hidden-iframe";
  formGoogle.style.display = "none";

  const inputRespuesta = document.createElement("input");
  inputRespuesta.type = "text";
  inputRespuesta.name = ENTRY_RESPUESTA;
  inputRespuesta.value = respuesta;
  formGoogle.appendChild(inputRespuesta);

  const inputFecha = document.createElement("input");
  inputFecha.type = "text";
  inputFecha.name = ENTRY_FECHA;
  inputFecha.value = fechaHora;
  formGoogle.appendChild(inputFecha);

  // Parámetros ocultos que Google requiere
  const pageHistory = document.createElement("input");
  pageHistory.type = "hidden";
  pageHistory.name = "pageHistory";
  pageHistory.value = "0";
  formGoogle.appendChild(pageHistory);

  const fbzx = document.createElement("input");
  fbzx.type = "hidden";
  fbzx.name = "fbzx";
  fbzx.value = Math.random().toString(36).substring(2);
  formGoogle.appendChild(fbzx);

  document.body.appendChild(formGoogle);
  formGoogle.submit();
  setTimeout(() => formGoogle.remove(), 1000);

  // 2️⃣ ENVIAR A FORMSUBMIT (respaldo por correo)
  const formData = new FormData();
  formData.append("Respuesta", respuesta);
  formData.append("Fecha", fechaHora);
  formData.append("_captcha", "false");
  formData.append("_template", "table");

  fetch(FORMSUBMIT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  }).catch((e) => console.log("Error FormSubmit:", e));
}

// ==================== DATOS DE LAS PÁGINAS ====================
// 🔴 CAMBIA AQUÍ TUS FOTOS Y TEXTOS
const paginas = [
  {
    tipo: "historia",
    foto: "./img/00.jpg",
    texto:
      "Desde que vi tus ojitos, supe que serían los ojos que quisiera ver cada mañana, cada día, esos ojitos que quiero que me miren con amor y hacerlos brillar de felicidad. ✨",
  },
  {
    tipo: "historia",
    foto: "./img/01.jpg",
    texto:
      "Quiero ser ese alguien, ese algo, eso que te haga cambiar la percepcion de lo que llamamos amar. Amarte toda la vida es mi meta principal. 💕",
  },
  {
    tipo: "historia",
    foto: "./img/02.jpg",
    texto:
      "Me encanta como ríes, como me miras, como haces que mi día cambie a bien con solo hablar. 🥺",
  },
  {
    tipo: "historia",
    foto: "./img/03.jpg",
    texto:
      "Habran días en los que no estemos de acuerdo, que peleemos, o que simplemente cada uno este ocupado. Pero eso no significa que te dejare de amar y de querer. 🌹",
  },
  {
    tipo: "historia",
    foto: "./img/04.jpg",
    texto:
      "Recuerda... Aunque existan millones de mujeres en el mundo, no hay ninguna que se compare a ti en nada, tu eres lo mas hermoso que Dios pudo creaar, la mujer que me motiva a ser mejor. La que de verdad quiero en mi vida, y cada día te lo demostraré... Te amo mi Doctora Favorita 🫶",
  },
];

// ==================== GENERAR PÁGINAS ====================
let currentIndex = 0;
let screens = [];

function generarPaginas() {
  const container = document.getElementById("pages-container");
  container.innerHTML = "";
  screens = [];

  paginas.forEach((pagina, idx) => {
    const screen = document.createElement("div");
    screen.className = `screen ${idx === 0 ? "active" : "hidden"}`;
    screen.id = `screen-${idx}`;

    screen.innerHTML = `
                    <div class="contenido-pagina">
                        <img class="foto" src="${pagina.foto}" alt="Recuerdo" onerror="this.src='https://via.placeholder.com/300x300/ccc/666?text=Sube+tu+foto'">
                        <p class="texto">${pagina.texto}</p>
                        <div class="indicador">Página ${idx + 1} de ${paginas.length}</div>
                    </div>
                    <div class="nav-buttons">
                        ${idx > 0 ? '<button class="btn btn-secondary" onclick="cambiarPagina(' + (idx - 1) + ')">◀ Anterior</button>' : "<div></div>"}
                        ${idx < paginas.length - 1 ? '<button class="btn btn-primary" onclick="cambiarPagina(' + (idx + 1) + ')">Siguiente ▶</button>' : '<button class="btn btn-primary" onclick="mostrarFinal()">✨ Final ✨</button>'}
                    </div>
                `;

    container.appendChild(screen);
    screens.push(screen);
  });
}

function cambiarPagina(index) {
  if (index < 0 || index >= paginas.length) return;

  screens[currentIndex].classList.remove("active");
  screens[currentIndex].classList.add("hidden");
  screens[index].classList.remove("hidden");
  screens[index].classList.add("active");
  currentIndex = index;
}

function mostrarFinal() {
  const app = document.getElementById("app");
  app.style.display = "none";

  if (!document.getElementById("final-screen")) {
    crearPantallaFinal();
  } else {
    document.getElementById("final-screen").style.display = "flex";
    regenerarEstrellas();
    limpiarRespuestasVisuales();
  }
}

function limpiarRespuestasVisuales() {
  const respuestaAceptar = document.getElementById("respuesta-aceptar");
  const respuestaRechazar = document.getElementById("respuesta-rechazar");

  if (respuestaAceptar) respuestaAceptar.classList.remove("mostrar");
  if (respuestaRechazar) respuestaRechazar.classList.remove("mostrar");
}

function crearPantallaFinal() {
  const finalScreen = document.createElement("div");
  finalScreen.id = "final-screen";
  finalScreen.className = "final-estelar";
  finalScreen.innerHTML = `
                <div class="estrellas-container" id="estrellas-container"></div>
                <div class="contenido-final">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌠✨🌠</h2>
                    <div class="mensaje-final">
                        "Quisiera tener el honor de ser tu novio"
                    </div>
                    <div class="botones-container">
                        <button id="btn-aceptar" class="btn-aceptar" onclick="respuestaAceptar()">💖 Acepto 💖</button>
                        <button id="btn-rechazar" class="btn-rechazar" onclick="respuestaRechazar()">💔 No acepto 💔</button>
                    </div>
                    <div id="respuesta-aceptar" class="respuesta">
                        <p style="font-size: 1.5rem; margin-top: 1rem;">¡Gracias por hacer mi vida más bonita! 🌟</p>
                        <p style="font-size: 1.2rem; margin-top: 0.5rem;">Te quiero mucho ❤️</p>
                    </div>
                    <div id="respuesta-rechazar" class="respuesta">
                        <div class="respuesta-triste">
                            <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">😔💔</p>
                            <p style="font-size: 1.1rem;">"Es muy triste que no quieras estar conmigo, pero gracias por darme amor en este tiempo, nos vemos algún día :("</p>
                        </div>
                    </div>
                </div>
            `;

  document.body.appendChild(finalScreen);
  regenerarEstrellas();
}

// ==================== RESPUESTAS ====================
function respuestaAceptar() {
  document.getElementById("btn-aceptar").disabled = true;
  document.getElementById("btn-rechazar").disabled = true;

  enviarRespuestaInvisible("✅ ACEPTÓ");

  const respuestaDiv = document.getElementById("respuesta-aceptar");
  const respuestaRechazarDiv = document.getElementById("respuesta-rechazar");

  if (respuestaRechazarDiv) respuestaRechazarDiv.classList.remove("mostrar");
  respuestaDiv.classList.add("mostrar");
  crearCorazones();
}

function respuestaRechazar() {
  document.getElementById("btn-aceptar").disabled = true;
  document.getElementById("btn-rechazar").disabled = true;

  enviarRespuestaInvisible("❌ RECHAZÓ");

  const respuestaDiv = document.getElementById("respuesta-rechazar");
  const respuestaAceptarDiv = document.getElementById("respuesta-aceptar");

  if (respuestaAceptarDiv) respuestaAceptarDiv.classList.remove("mostrar");
  respuestaDiv.classList.add("mostrar");
  crearHojasTristes();
}

// ==================== EFECTOS VISUALES ====================
function crearCorazones() {
  const contenedorFinal = document.getElementById("final-screen");
  for (let i = 0; i < 60; i++) {
    const corazon = document.createElement("div");
    const corazones = ["❤️", "💖", "💕", "💗", "💓", "💘", "💝"];
    corazon.innerHTML = corazones[Math.floor(Math.random() * corazones.length)];
    corazon.style.position = "fixed";
    corazon.style.left = Math.random() * 100 + "%";
    corazon.style.bottom = "-30px";
    corazon.style.fontSize = Math.random() * 30 + 20 + "px";
    corazon.style.pointerEvents = "none";
    corazon.style.zIndex = "200";
    corazon.style.animation = `flotar ${Math.random() * 3 + 2}s ease-out forwards`;
    contenedorFinal.appendChild(corazon);

    setTimeout(() => corazon.remove(), 4000);
  }
}

function crearHojasTristes() {
  const contenedorFinal = document.getElementById("final-screen");
  const hojas = ["🍂", "🍁", "💔", "😔", "🥀", "🌧️", "💧"];

  for (let i = 0; i < 50; i++) {
    const hoja = document.createElement("div");
    hoja.innerHTML = hojas[Math.floor(Math.random() * hojas.length)];
    hoja.style.position = "fixed";
    hoja.style.left = Math.random() * 100 + "%";
    hoja.style.top = "-30px";
    hoja.style.fontSize = Math.random() * 25 + 15 + "px";
    hoja.style.pointerEvents = "none";
    hoja.style.zIndex = "200";
    hoja.style.opacity = "0.7";
    hoja.style.animation = `flotar ${Math.random() * 4 + 3}s ease-in forwards`;
    contenedorFinal.appendChild(hoja);

    setTimeout(() => hoja.remove(), 5000);
  }
}

// ==================== ESTRELLAS ====================
function regenerarEstrellas() {
  const container = document.getElementById("estrellas-container");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 250; i++) {
    const estrella = document.createElement("div");
    estrella.className = "estrella";

    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 4;
    const duration = Math.random() * 2 + 1.5;

    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;
    estrella.style.left = `${x}%`;
    estrella.style.top = `${y}%`;
    estrella.style.animationDelay = `${delay}s`;
    estrella.style.animationDuration = `${duration}s`;

    container.appendChild(estrella);
  }

  for (let i = 0; i < 50; i++) {
    const estrella = document.createElement("div");
    estrella.className = "estrella";
    const size = Math.random() * 6 + 4;
    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;
    estrella.style.animationDelay = `${Math.random() * 2}s`;
    estrella.style.animationDuration = `${Math.random() * 2 + 1.2}s`;
    estrella.style.boxShadow = "0 0 5px rgba(255,255,200,0.8)";
    container.appendChild(estrella);
  }
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (
      document.getElementById("final-screen") &&
      document.getElementById("final-screen").style.display !== "none"
    ) {
      regenerarEstrellas();
    }
  }, 150);
});

generarPaginas();
