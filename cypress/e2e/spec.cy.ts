/// <reference types="cypress" />

describe("Test the app", () => {
  const baseUrl = "REACT_APP_SERVICES_COINCAP_API_BASE_URL";
  let originalCount: number;

  before(() => {
    cy.request(`${Cypress.env(baseUrl)}?limit=20`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      originalCount = response.body.data.length;
    });
    cy.request(`${Cypress.env(baseUrl)}?limit=3`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
    cy.visit("/");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays data correctly", () => {
    cy.get('[data-cy="cryptocurrencies"]').should("exist");
    cy.get('[data-cy="cryptocurrencies-row"]').should("exist");
    cy.get('[data-cy="cryptocurrencies"]').screenshot("cryptocurrencies", {
      capture: "viewport",
      overwrite: true,
    });
  });

  it("Checks pagination", () => {
    cy.get('[data-cy="container"]').should("exist").find('[data-cy="view-more-button"]').click();
    cy.get('[data-cy="cryptocurrencies-row"]').should("have.length.greaterThan", originalCount);
  });

  it("Checks for a list item to have an add button", () => {
    cy.get('[data-cy="cryptocurrencies"]')
      .find('[data-cy="cryptocurrencies-row"]')
      .should("have.length.greaterThan", 0)
      .find('[data-cy="button-add"]')
      .should("exist");
  });

  it("Opens and close modals", () => {
    cy.get('[data-cy="cryptocurrencies-row"]:first-child')
      .should("exist")
      .find('[data-cy="button-add"]')
      .click()
      .then(() => {
        cy.get('[data-cy="add-to-portfolio-modal"]')
          .should("exist")
          .find('[data-cy="modal-background"]')
          .screenshot("add-to-portfolio-modal", {
            capture: "viewport",
            overwrite: true,
          });
        cy.get('[data-cy="add-to-portfolio-modal"]').find('[data-cy="button-cancel"]').click();
        cy.get('[data-cy="add-to-portfolio-modal"]').should("not.be.visible");
      });
    cy.get('[data-cy="portfolio-button"]')
      .click()
      .then(() => {
        cy.get('[data-cy="portfolio-modal"]')
          .should("exist")
          .find('[data-cy="portfolio-background"]')
          .screenshot("portfolio-modal", { capture: "viewport", overwrite: true });
        cy.get('[data-cy="portfolio-modal"]').find('[data-cy="button-cancel"]').click();
        cy.get('[data-cy="portfolio-modal"]').should("not.be.visible");
      });
  });

  it("Opens modal to add currency", () => {
    cy.get('[data-cy="cryptocurrencies-row"]:first-child')
      .should("exist")
      .find('[data-cy="button-add"]')
      .click()
      .then(() => {
        cy.get('[data-cy="add-to-portfolio-modal"]').should("exist");
      });
    cy.get('[data-cy="input"]').type("1").should("have.value", "1");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="add-to-portfolio-modal"]').should("not.be.visible");
    cy.get('[data-cy="portfolio-button"]')
      .click()
      .then(() => {
        cy.get('[data-cy="portfolio-modal"]')
          .should("exist")
          .find('[data-cy="portfolio-list"]')
          .find('[data-cy="portfolio-list-item"]')
          .find('[data-cy="currency-name"]')
          .contains("Bitcoin")
          .should("exist");
        cy.get('[data-cy="portfolio-list-item"]')
          .find('[data-cy="currency-amount"]')
          .contains("1")
          .should("exist");
        cy.get('[data-cy="portfolio-list-item"]').find('[data-cy="button-remove"]').click();
        cy.get('[data-cy="portfolio-list"]').should("not.exist");
        cy.get('[data-cy="empty-block-text"]').should("exist");
        cy.get('[data-cy="portfolio-modal"]').find('[data-cy="button-cancel"]').click();
        cy.get('[data-cy="portfolio-modal"]').should("not.be.visible");
      });
  });

  it("Opens details page and returns to home page", () => {
    cy.get('[data-cy="cryptocurrencies"]')
      .find('[data-cy="cryptocurrencies-row"]:first-child')
      .should("have.length.greaterThan", 0)
      .find('[data-cy="currency-link"]')
      .click();
    cy.url()
      .should("include", "/details")
      .then(() => {
        cy.get('[data-cy="details-wrapper"]').should("exist");
        cy.get('[data-cy="details-container"]')
          .should("exist")
          .find('[data-cy="add-to-portfolio-button"]')
          .should("exist")
          .click()
          .then(() => {
            cy.get('[data-cy="add-to-portfolio-modal"]')
              .should("exist")
              .find('[data-cy="button-cancel"]')
              .click();
            cy.get('[data-cy="add-to-portfolio-modal"]').should("not.be.visible");
          });
        cy.get('[data-cy="chart-wrapper"]')
          .should("exist")
          .find('[data-cy="canvas"]')
          .should("exist");
      });

    cy.get('[data-cy="details-wrapper"]').should("be.visible");
    cy.wait(1000).then(() => {
      cy.screenshot("details", {
        capture: "viewport",
        overwrite: true,
      });
    });

    cy.get('[data-cy="details-wrapper"]').find('[data-cy="link-home"]').click();
    cy.url().should("eq", "http://localhost:3000/coincap-clone");
  });

  it("Checks top currencies in the header", () => {
    cy.get('[data-cy="header"]')
      .should("exist")
      .find('[data-cy="header-currencies"]')
      .should("exist")
      .find('[data-cy="header-currencies__item"]')
      .should("have.length", 3);
  });
  it("Checks portfolio in the header", () => {
    cy.get('[data-cy="header"]')
      .should("exist")
      .find('[data-cy="portfolio"]')
      .should("exist")
      .find('[data-cy="portfolio-info"]')
      .should("exist")
      .find('[data-cy="portfolio-info__item"]')
      .should("have.length", 4);
  });
});
