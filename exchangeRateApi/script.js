$(document).ready(function () {
  $("#formulario").on("submit", function (event) {
    event.preventDefault();
    manejarEnvioFormulario();
  });
});

function manejarEnvioFormulario() {
  limpiarErrores();

  const monedaSeleccionada = obtenerMonedaSeleccionada();

  if (!validarMonedaSeleccionada(monedaSeleccionada)) {
    mostrarError("Please complete all fields.");
    return;
  }

  const url = construirUrlAPI(monedaSeleccionada);
  obtenerDatosDeAPI(url).then(mostrarResultados).catch(manejarError);
}

function limpiarErrores() {
  $("#error-message").remove();
  $("#result").fadeIn();
}

function obtenerMonedaSeleccionada() {
  return $("#currency").val();
}

function validarMonedaSeleccionada(moneda) {
  return moneda !== "";
}

function mostrarError(mensaje) {
  $("#formulario").prepend(
    `<p id="error-message" style="color: red;">${mensaje}</p>`
  );
}

function construirUrlAPI(moneda) {
  const baseUrl =
    "https://v6.exchangerate-api.com/v6/c3eff3653369cb8b3f9f0eaf/latest/";
  return `${baseUrl}${moneda}`;
}

function obtenerDatosDeAPI(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

function mostrarResultados(data) {
  if (data && data.conversion_rates) {
    $("#result").html("");
    $.each(data.conversion_rates, function (currency, rate) {
      $("#result").append(`<p>1 ${data.base_code} = ${rate} ${currency}</p>`);
    });
  } else {
    $("#result").html(
      "<p style='color: red;'>No data available for the selected currency.</p>"
    );
  }
}

function manejarError(error) {
  console.error("There was a problem with the fetch operation:", error);
  $("#result").html("<p style='color: red;'>Error fetching data.</p>");
}
