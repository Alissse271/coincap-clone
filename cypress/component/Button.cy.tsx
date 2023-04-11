/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react18";
import { Button } from "../../src/components/Button/Button";

describe("Button", () => {
  it("renders correctly", () => {
    mount(<Button label="+" mode="add" />);
    cy.contains("+");
  });

  it("renders with className correctly", () => {
    mount(<Button label="+" mode="add" dataCy="button-add" />);
    cy.get('[data-cy="button-add"]').should("have.class", "button--add");
    cy.contains("+");
  });

  it("renders with disabled prop correctly", () => {
    mount(<Button label="+" mode="add" disabled dataCy="button-add" />);
    cy.contains("+");
    cy.get('[data-cy="button-add"]').should("be.disabled");
  });

  it("handles click events correctly", () => {
    let count = 0;
    const handleClick = () => {
      ++count;
    };
    mount(<Button label="+" mode="add" onClick={handleClick} dataCy="button-add" />);
    cy.get('[data-cy="button-add"]')
      .click()
      .then(() => {
        expect(count).to.equal(1);
      });
  });
});
