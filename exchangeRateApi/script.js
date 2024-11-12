$(document).ready(function () {
  $("#formulario").on("submit", function (event) {
    event.preventDefault();
    $("#result").fadeIn();
    let monedaSeleccionada = $("#currency").val();
    $("#error-message").remove();
    if (monedaSeleccionada === "") {
      $("#formulario").prepend(
        '<p id="error-message" style="color: red;">Please complete all fields.</p>'
      );
      return false;
    }
    const url =
      "https://v6.exchangerate-api.com/v6/c3eff3653369cb8b3f9f0eaf/latest/" +
      monedaSeleccionada;
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.conversion_rates) {
          $("#result").html("");
          $.each(data.conversion_rates, function (currency, rate) {
            $("#result").append(
              `<p>1 ${data.base_code} = ${rate} ${currency}</p>`
            );
          });
        } else {
          $("#result").html(
            "<p style='color: red;'>No data available for the selected currency.</p>"
          );
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    return false;
  });
});
