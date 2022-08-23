import { getInfoLabRadio } from "../common/laboratorios.js";

getInfoLabRadio()
  .then((data) => {
    let labArea = document.getElementById("lab-area");
    let labTitulo = document.getElementById("lab-titulo");
    let labMarcoTeorico = document.getElementById("lab-marco-teorico");

    labArea.innerHTML = `${data.area}`;
    labTitulo.innerHTML = `${data.nombre}`;
    labMarcoTeorico.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="cabecera">
                <button class="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#colapsable" aria-expanded="false" aria-controls="colapsable">
                    Marco teórico de la experiencia
                </button>
            </h2>
            <div id="colapsable" class="accordion-collapse collapse" aria-labelledby="cabecera"
                data-bs-parent="#lab-marco-teorico">
                <div class="accordion-body">
                    <div class="row">
                        <div class="col col-lg-4 col-sm-12 col-xs-12">
                            <figure id="lab-imagen">
                                <img src="img/wifi.jpg" class="img-fluid img-thumbnail"
                                    alt="lentes-divergentes">
                            </figure>
                        </div>
                        <div class="col col-sm-auto>
                          <p id=" lab-descripcion">${data.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
  })
  .catch((error) => {
    console.error(error.message);
  });

// ---------------------------------------------------------------------------

const formulario = document.getElementById("lab-formulario");
let inputDistConvergente = document.getElementById("dist-convergente");
let inputDistDivergente = document.getElementById("dist-divergente");
let inputDistPantalla = document.getElementById("dist-pantalla");

const MAX_DISTANCIA_OBJETO = 700; // mm
const MAX_DISTANCIA_PANTALLA = 700; // mm
const MAX_DIST_DIV_PANTALLA = 900; // mm

inputDistConvergente.addEventListener("change", () => {
  inputDistConvergente.value == "" ||
  inputDistConvergente.value <= 0 ||
  inputDistConvergente.value > MAX_DISTANCIA_OBJETO
    ? (inputDistConvergente.classList = "form-control is-invalid")
    : (inputDistConvergente.classList = "form-control is-valid");
});

inputDistDivergente.addEventListener("change", () => {
  inputDistDivergente.value == "" ||
  inputDistDivergente.value <= 0 ||
  inputDistDivergente.value > MAX_DISTANCIA_PANTALLA
    ? (inputDistDivergente.classList = "form-control is-invalid")
    : (inputDistDivergente.classList = "form-control is-valid");
});

inputDistPantalla.addEventListener("change", () => {
  inputDistPantalla.value == "" ||
  inputDistPantalla.value <= 0 ||
  inputDistPantalla.value > MAX_DIST_DIV_PANTALLA
    ? (inputDistPantalla.classList = "form-control is-invalid")
    : (inputDistPantalla.classList = "form-control is-valid");
});

// ---------------------------------------------------------------------------

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let convergente = parseInt(inputDistConvergente.value);
  let divergente = parseInt(inputDistDivergente.value);
  let pantalla = parseInt(inputDistPantalla.value);

  const url = `${URI_API}/radio`;
  const data = {
    idUsuario: Math.floor(Math.random() * 11),
    distanciaLenteConvergente: convergente,
    distanciaLenteDivergente: divergente,
    distanciaPantalla: pantalla,
  };
  const headers = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, headers)
    .then((res) => {
      if (res.ok) limpiarInput();
      return res.json();
    })
    .then((resMsg) => console.log(resMsg))
    .catch((error) => console.error("Error:", error));
});

function limpiarInput() {
  inputDistConvergente.value = "";
  inputDistDivergente.value = "";
  inputDistPantalla.value = "";
  inputDistConvergente.classList = "form-control";
  inputDistDivergente.classList = "form-control";
  inputDistPantalla.classList = "form-control";
}
