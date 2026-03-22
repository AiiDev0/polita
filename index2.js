// ==================== DATOS DE LAS PÁGINAS ====================
// ¡CAMBIAR! Pon aquí tus fotos y textos prueba
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

  // Generar páginas de historia (dentro del app)
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

// ==================== NAVEGACIÓN ====================
function cambiarPagina(index) {
  if (index < 0 || index >= paginas.length) return;

  screens[currentIndex].classList.remove("active");
  screens[currentIndex].classList.add("hidden");
  screens[index].classList.remove("hidden");
  screens[index].classList.add("active");
  currentIndex = index;
}

// ==================== PANTALLA FINAL FULL SCREEN ====================
function mostrarFinal() {
  // Ocultar el app normal
  const app = document.getElementById("app");
  app.style.display = "none";

  // Crear la pantalla final si no existe
  if (!document.getElementById("final-screen")) {
    crearPantallaFinal();
  } else {
    document.getElementById("final-screen").style.display = "flex";
    regenerarEstrellas();
    // Resetear respuestas y botones
    resetearRespuestas();
  }
}

function resetearRespuestas() {
  const respuestaAceptar = document.getElementById("respuesta-aceptar");
  const respuestaRechazar = document.getElementById("respuesta-rechazar");
  const btnAceptar = document.getElementById("btn-aceptar");
  const btnRechazar = document.getElementById("btn-rechazar");

  if (respuestaAceptar) respuestaAceptar.classList.remove("mostrar");
  if (respuestaRechazar) respuestaRechazar.classList.remove("mostrar");
  if (btnAceptar) {
    btnAceptar.disabled = false;
    btnAceptar.style.opacity = "1";
  }
  if (btnRechazar) {
    btnRechazar.disabled = false;
    btnRechazar.style.opacity = "1";
  }
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
                        <button id="btn-aceptar" class="btn-aceptar" onclick="respuestaAceptar()">🫶 Acepto 🫶</button>
                        <button id="btn-rechazar" class="btn-rechazar" onclick="respuestaRechazar()">💔 No acepto 💔</button>
                    </div>
                    <div id="respuesta-aceptar" class="respuesta">
                        <p style="font-size: 1.5rem; margin-top: 1rem;">¡Gracias por hacer mi vida más bonita! 🌟</p>
                        <p style="font-size: 1.2rem; margin-top: 0.5rem;">Te amo mucho 🫶</p>
                        <p style="font-size: 1.2rem; margin-top: 0.5rem;">Escribeme!! 😏</p>
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

// ==================== RESPUESTAS DE LOS BOTONES ====================
function respuestaAceptar() {
  const respuestaDiv = document.getElementById("respuesta-aceptar");
  const respuestaRechazarDiv = document.getElementById("respuesta-rechazar");
  const btnAceptar = document.getElementById("btn-aceptar");
  const btnRechazar = document.getElementById("btn-rechazar");

  // Ocultar la otra respuesta si está visible
  if (respuestaRechazarDiv) respuestaRechazarDiv.classList.remove("mostrar");

  // Mostrar respuesta de aceptar
  respuestaDiv.classList.add("mostrar");

  // Deshabilitar ambos botones
  btnAceptar.disabled = true;
  btnAceptar.style.opacity = "0.5";
  btnRechazar.disabled = true;
  btnRechazar.style.opacity = "0.5";

  // Crear corazones flotantes
  crearCorazones();
}

function respuestaRechazar() {
  const respuestaDiv = document.getElementById("respuesta-rechazar");
  const respuestaAceptarDiv = document.getElementById("respuesta-aceptar");
  const btnAceptar = document.getElementById("btn-aceptar");
  const btnRechazar = document.getElementById("btn-rechazar");

  // Ocultar la otra respuesta si está visible
  if (respuestaAceptarDiv) respuestaAceptarDiv.classList.remove("mostrar");

  // Mostrar respuesta de rechazo
  respuestaDiv.classList.add("mostrar");

  // Deshabilitar ambos botones
  btnAceptar.disabled = true;
  btnAceptar.style.opacity = "0.5";
  btnRechazar.disabled = true;
  btnRechazar.style.opacity = "0.5";

  // Crear efecto de hojas cayendo (triste)
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

// ==================== ESTRELLAS QUE CUBREN TODA LA PANTALLA ====================
function regenerarEstrellas() {
  const container = document.getElementById("estrellas-container");
  if (!container) return;

  container.innerHTML = "";

  const numEstrellas = 250;

  for (let i = 0; i < numEstrellas; i++) {
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

  // Estrellas más grandes (brillantes)
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

// ==================== REINICIAR ESTRELLAS AL GIRAR PANTALLA ====================
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

// ==================== INICIALIZAR ====================
generarPaginas();
