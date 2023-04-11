/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react18";
import { TableHead } from "../../src/components/TableHead/TableHead";

describe("TableHead", () => {
  it("renders correctly", () => {
    mount(<TableHead dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("exist");
  });

  it("renders with primary prop correctly", () => {
    mount(<TableHead primary dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("have.class", "table__head--primary");
    mount(<TableHead primary={false} dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("have.class", "table__head--secondary");
  });

  it("renders with size prop correctly", () => {
    mount(<TableHead size="small" dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("have.class", "table__head--small");
    mount(<TableHead size="medium" dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("have.class", "table__head--medium");
    mount(<TableHead size="large" dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').should("have.class", "table__head--large");
  });

  it("renders on different screens correctly", () => {
    cy.viewport(768, 480);
    mount(<TableHead dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').contains("Rank").should("not.exist");
    cy.get('[data-cy="table-head"]').contains("Market Cap").should("not.exist");
    cy.get('[data-cy="table-head"]').contains("Supply").should("not.exist");
    cy.get('[data-cy="table-head"]').contains("VWAP (24Hr)").should("not.exist");
    cy.get('[data-cy="table-head"]').contains("Volume (24Hr)").should("not.exist");

    cy.viewport(1024, 768);
    mount(<TableHead dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').contains("VWAP (24Hr)").should("not.exist");
    cy.get('[data-cy="table-head"]').contains("Supply").should("not.exist");

    cy.viewport(1440, 768);
    mount(<TableHead dataCy="table-head" />);
    cy.get('[data-cy="table-head"]').contains("VWAP (24Hr)").should("exist");
    cy.get('[data-cy="table-head"]').contains("Supply").should("exist");
  });
});
