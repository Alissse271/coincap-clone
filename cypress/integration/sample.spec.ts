/// <reference types="cypress" />

describe("My first test", () => {
  it("Visits the homepage", () => {
    cy.visit("http://localhost:3000/coincap-clone");
    cy.contains("My React App");
  });
});
