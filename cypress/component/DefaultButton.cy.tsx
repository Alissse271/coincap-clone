/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react18";
import { DefaultButton } from "../../src/components/DefaultButton/DefaultButton";

describe("DefaultButton", () => {
  it("renders correctly", () => {
    mount(<DefaultButton label="Submit" />);
    cy.contains("Submit");
  });

  it("renders with prop size correctly", () => {
    mount(<DefaultButton label="Submit" size="medium" dataCy="button-submit" />);
    cy.get('[data-cy="button-submit"]').should("have.class", "default-button--medium");
    cy.contains("Submit");
  });

  it("renders with prop primary correctly", () => {
    mount(<DefaultButton label="Submit" primary dataCy="button-submit" />);
    cy.get('[data-cy="button-submit"]').should("have.class", "default-button--primary");
    cy.contains("Submit");
  });

  it("renders with disabled prop correctly", () => {
    mount(<DefaultButton label="Submit" disabled dataCy="button-submit" />);
    cy.contains("Submit");
    cy.get('[data-cy="button-submit"]').should("be.disabled");
  });

  it("handles click events correctly", () => {
    let count = 0;
    const handleClick = () => {
      ++count;
    };
    mount(<DefaultButton label="Submit" onClick={handleClick} dataCy="button-submit" />);
    cy.get('[data-cy="button-submit"]')
      .click()
      .then(() => {
        expect(count).to.equal(1);
      });
  });
});
