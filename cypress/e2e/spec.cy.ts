/// <reference types="cypress" />

describe("Test the app", () => {
  const baseUrl = "REACT_APP_SERVICES_COINCAP_API_BASE_URL";
  let originalCount: number;

  beforeEach(() => {
    cy.request("GET", `${Cypress.env(baseUrl)}?limit=20`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      originalCount = response.body.data.length;
    });
    cy.request("GET", `${Cypress.env(baseUrl)}?limit=3`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  it("Displays data correctly", () => {
    cy.visit("/");
    cy.get(".cryptocurrencies").should("exist");
    cy.get(".cryptocurrencies tbody tr").should("exist");
    cy.get(".cryptocurrencies").screenshot("cryptocurrencies", {
      capture: "viewport",
      overwrite: true,
    });
  });

  it("Checks pagination", () => {
    cy.visit("/");
    cy.get(".container").should("exist").find(".default-button").click();
    cy.get(".cryptocurrencies tbody tr").should("have.length.greaterThan", originalCount);
  });

  it("Checks for a list item to have an add button", () => {
    cy.visit("/");
    cy.get(".cryptocurrencies")
      .find("tbody")
      .find("tr")
      .should("have.length.greaterThan", 0)
      .find(".button--add")
      .should("exist");
  });

  it("Opens and close modals", () => {
    cy.visit("/");
    cy.get("tbody tr:first-child")
      .should("exist")
      .find(".button--add")
      .click()
      .then(() => {
        cy.get("#addToPortfolio")
          .should("exist")
          .find(".modal-background")
          .screenshot("add-to-portfolio-modal", {
            capture: "viewport",
            overwrite: true,
          });
        cy.get("#addToPortfolio").find(".button--cancel").click();
        cy.get("#addToPortfolio").should("not.be.visible");
      });
    cy.get(".portfolio-button")
      .click()
      .then(() => {
        cy.get("#portfolio")
          .should("exist")
          .find(".portfolio-background")
          .screenshot("portfolio-modal", { capture: "viewport", overwrite: true });
        cy.get("#portfolio").find(".button--cancel").click();
        cy.get("#portfolio").should("not.be.visible");
      });
  });

  it("Opens modal to add currency", () => {
    cy.visit("/");
    cy.get("tbody tr:first-child")
      .should("exist")
      .find(".button--add")
      .click()
      .then(() => {
        cy.get("#addToPortfolio").should("exist");
      });
    cy.get(".modal-main__input").type("1").should("have.value", "1");
    cy.get(".modal-footer__button").click();
    cy.get("#addToPortfolio").should("not.be.visible");
    cy.get(".portfolio-button")
      .click()
      .then(() => {
        cy.get("#portfolio")
          .should("exist")
          .find(".portfolio-list")
          .find(".portfolio-list__item")
          .find(".cryptocurrency-name p")
          .contains("Bitcoin")
          .should("exist");
        cy.get(".portfolio-list__item").find(".amount-wrapper p").contains("1").should("exist");
        cy.get(".portfolio-list__item").find(".button--remove").click();
        cy.get(".portfolio-list").should("not.exist");
        cy.get(".empty-block-text").should("exist");
        cy.get("#portfolio").find(".button--cancel").click();
        cy.get("#portfolio").should("not.be.visible");
      });
  });

  it("Opens details page and returns to home page", () => {
    cy.visit("/");
    cy.get(".cryptocurrencies")
      .find("tbody tr:first-child")
      .should("have.length.greaterThan", 0)
      .find("a")
      .click();
    cy.url()
      .should("include", "/details")
      .then(() => {
        cy.get(".details-wrapper").should("exist");
        cy.get(".details-container")
          .should("exist")
          .find(".default-button")
          .should("exist")
          .click()
          .then(() => {
            cy.get("#addToPortfolio").should("exist").find(".button--cancel").click();
            cy.get("#addToPortfolio").should("not.be.visible");
          });
        cy.get(".chart-wrapper").should("exist").find("canvas").should("exist");
      });

    cy.get(".details-wrapper").should("be.visible");
    cy.wait(2000).then(() => {
      cy.screenshot("details", {
        capture: "viewport",
        overwrite: true,
      });
    });

    cy.get(".details-wrapper").find("a").click();
    cy.url().should("eq", "http://localhost:3000/coincap-clone");
  });

  it("Checks top currencies in the header", () => {
    cy.visit("/");
    cy.get(".header")
      .should("exist")
      .find(".header-currencies")
      .should("exist")
      .find(".header-currencies__item")
      .should("have.length", 3);
  });
  it("Checks portfolio in the header", () => {
    cy.visit("/");
    cy.get(".header")
      .should("exist")
      .find(".portfolio")
      .should("exist")
      .find(".portfolio-info")
      .should("exist")
      .find("p")
      .should("have.length", 4);
  });
});
