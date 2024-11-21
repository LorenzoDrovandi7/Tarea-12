describe("Pokédex App", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/pokedexApi/index.html");
  });

  it("Debe cargar la página correctamente", () => {
    cy.get("h1").should("have.text", "Pokédex");
    cy.get("#boton-buscar").should("be.visible");
    cy.get("#pokemon-list-container").should("not.be.visible");
  });

  it("Debe mostrar y ocultar la lista de Pokémon", () => {
    cy.get("#mostrar-boton-lista").click();
    cy.get("#pokemon-list-container").should("be.visible");
    cy.get("#mostrar-boton-lista").should("have.text", "Ocultar lista");
    cy.get("#mostrar-boton-lista").click();
    cy.get("#pokemon-list-container").should("not.be.visible");
    cy.get("#mostrar-boton-lista").should("have.text", "Mostrar lista");
  });

  it("Debe buscar un Pokémon por nombre o ID y mostrar sus detalles", () => {
    cy.get("#pokemon-id").type("pikachu");
    cy.get("#boton-buscar").click();
    cy.get("#pokemon-nombre").should("have.text", "pikachu");
    cy.get("#pokemon-tipo").should("exist");
    cy.get("#pokemon-altura").should("exist");
    cy.get("#pokemon-peso").should("exist");
    cy.get("#pokemon-imagen")
      .should("have.attr", "src")
      .should("include", "25");
  });

  it("Debe manejar la búsqueda de un Pokémon inexistente", () => {
    cy.get("#pokemon-id").type("pokemonnodisponible");
    cy.get("#boton-buscar").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("No se encontró ningún Pokémon");
    });
  });

  it("Debe cargar los detalles de un Pokémon al hacer clic en la lista", () => {
    cy.get("#mostrar-boton-lista").click();
    cy.get("#pokemon-list li").contains("bulbasaur").click();
    cy.get("#pokemon-nombre").should("have.text", "bulbasaur");
    cy.get("#pokemon-imagen").should("have.attr", "src").should("include", "1");
    cy.get("#pokemon-tipo").should("exist");
    cy.get("#pokemon-altura").should("exist");
    cy.get("#pokemon-peso").should("exist");
  });
});
