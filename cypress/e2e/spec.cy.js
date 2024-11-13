describe("Verificar existencia h1", () => {
  it("Visita la página", () => {
    cy.visit("http://127.0.0.1:5500/exchangeRateApi/index.html");
    cy.get("h1").should("exist");
    cy.get("h1").should("have.text", "ExchangeRate...");
  });
});
describe("Verificar existencia label", () => {
  it("Visita la página", () => {
    cy.visit("http://127.0.0.1:5500/exchangeRateApi/index.html");
    cy.get("label").should("exist");
    cy.get("label").should("have.text", "Currency:");
  });
});
describe("Verificar funcionamiento de la interfaz", () => {
  it("Debería seleccionar un valor y verificar que el div tiene más de un valor", () => {
    cy.intercept("GET", "https://v6.exchangerate-api.com/v6/**").as(
      "getApiData"
    );
    cy.visit("http://127.0.0.1:5500/exchangeRateApi/index.html");
    cy.get("#currency").select("USD");
    cy.get('button[type="submit"]').click();
    cy.wait("@getApiData");
    cy.get("#result")
      .invoke("text")
      .then((text) => {
        const texto = text.trim().split(" ");
        expect(texto.length).to.be.greaterThan(1);
      });
  });
});
