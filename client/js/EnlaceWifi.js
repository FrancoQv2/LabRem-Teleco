import { getInfoLabWifi, URI_API } from "../common/laboratorios.js";

getInfoLabWifi()
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
                                    alt="lentes-elevacions">
                            </figure>
                        </div>
                        <div class="col col-sm-auto">
                          <p id="lab-descripcion">${data.descripcion}</p>
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

// ---------------------------------------------------

const formulario = document.getElementById("lab-formulario");
let inputElevacion = document.getElementById("range-elevacion");
let inputAzimut = document.getElementById("range-azimut");

const MAX_ELEVACION = 90; // grados
const MAX_AZIMUT = 90; // grados

inputElevacion.addEventListener("change", () => {
  inputElevacion.value == "" ||
  inputElevacion.value <= 0 ||
  inputElevacion.value > MAX_ELEVACION
    ? (inputElevacion.classList = "form-control is-invalid")
    : (inputElevacion.classList = "form-control is-valid");
});

inputAzimut.addEventListener("change", () => {
  inputAzimut.value == "" ||
  inputAzimut.value <= 0 ||
  inputAzimut.value > MAX_AZIMUT
    ? (inputAzimut.classList = "form-control is-invalid")
    : (inputAzimut.classList = "form-control is-valid");
});

// ---------------------------------------------------------------------------

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let elevacion = parseInt(inputElevacion.value);
  let azimut = parseInt(inputAzimut.value);

  const url = `${URI_API}/wifi`;
  const data = {
    idUsuario: Math.floor(Math.random() * 11),
    rangoElevacion: elevacion,
    rangoAzimut: azimut,
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
      console.log(res);
      return res.json();
    })
    .then((resMsg) => console.log(resMsg))
    .catch((error) => console.error("Error:", error));
});

function limpiarInput() {
  inputElevacion.value = "";
  inputAzimut.value = "";
  inputElevacion.classList = "form-control";
  inputAzimut.classList = "form-control";
}
