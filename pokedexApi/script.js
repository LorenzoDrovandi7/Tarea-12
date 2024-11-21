$(document).ready(function () {
  $("#mostrar-boton-lista").click(function () {
    const $pokemonList = $("#pokemon-list-container");
    $pokemonList.toggle();
    if ($pokemonList.is(":visible")) {
      $("#mostrar-boton-lista").text("Ocultar lista");
    } else {
      $("#mostrar-boton-lista").text("Mostrar lista");
    }
    if ($pokemonList.find("li").length === 0) {
      $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=151",
        method: "GET",
        success: function (response) {
          const pokemons = response.results;
          pokemons.forEach(function (pokemon) {
            $("#pokemon-list").append(
              `<li class="pokemon-item">${pokemon.name}</li>`
            );
          });
        },
        error: function () {
          $("#pokemon-list").html(
            "<p>Error al cargar la lista de Pokémon.</p>"
          );
        },
      });
    }
  });

  $(document).on("click", ".pokemon-item", function () {
    const pokemonName = $(this).text();
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
      method: "GET",
      success: function (pokemonData) {
        $("#pokemon-imagen").attr("src", pokemonData.sprites.front_default);
        $("#pokemon-nombre").text(pokemonData.name);
        const tipos = pokemonData.types
          .map((tipo) => tipo.type.name)
          .join(", ");
        $("#pokemon-tipo").text(tipos);
        $("#pokemon-altura").text(pokemonData.height / 10 + " m");
        $("#pokemon-peso").text(pokemonData.weight / 10 + " kg");
      },
      error: function () {
        alert("Error al obtener los datos del Pokémon.");
      },
    });
  });
});
$(document).ready(function () {
  $("#boton-buscar").click(function () {
    const pokemonBusqueda = $("#pokemon-id").val().toLowerCase().trim();

    if (pokemonBusqueda) {
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonBusqueda}`,
        method: "GET",
        success: function (pokemonData) {
          $("#pokemon-imagen").attr("src", pokemonData.sprites.front_default);
          $("#pokemon-nombre").text(pokemonData.name);
          const tipos = pokemonData.types
            .map((tipo) => tipo.type.name)
            .join(", ");
          $("#pokemon-tipo").text(tipos);
          $("#pokemon-altura").text(pokemonData.height / 10 + " m");
          $("#pokemon-peso").text(pokemonData.weight / 10 + " kg");
        },
        error: function () {
          alert("No se encontró ningún Pokémon con ese nombre o número.");
        },
      });
    } else {
      alert("Por favor, ingresa un nombre o número de Pokémon.");
    }
  });
});
