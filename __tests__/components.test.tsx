/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Button } from "../src/components/Button/Button";
import { DefaultButton } from "../src/components/DefaultButton/DefaultButton";

describe("Button component", () => {
  test("renders with required props correctly", () => {
    const { getByText } = render(<Button label="+" mode="add" />);
    const button = getByText("+");
    expect(button).toBeInTheDocument();
  });

  test("renders with disabled prop correctly", () => {
    const { getByText } = render(<Button label="+" mode="add" disabled />);
    const button = getByText("+");
    expect(button).toBeInTheDocument();
  });

  test("renders with data attribute correctly", () => {
    const { getByTestId } = render(<Button label="+" mode="add" dataTestId="button" />);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  test("renders with click event correctly", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button label="-" mode="remove" onClick={onClick} />);
    const button = getByText("-");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("DefaultButton component", () => {
  test("renders with required props correctly", () => {
    const { getByText } = render(<DefaultButton label="Click" />);
    const button = getByText("Click");
    expect(button).toBeInTheDocument();
  });

  test("renders with disabled prop correctly", () => {
    const { getByText } = render(<DefaultButton label="Click" disabled />);
    const button = getByText("Click");
    expect(button).toBeInTheDocument();
  });

  test("renders with data-cy attribute correctly", () => {
    const { getByTestId } = render(<DefaultButton label="Click" dataTestId="button" />);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  test("renders with click event correctly", () => {
    const onClick = jest.fn();
    const { getByText } = render(<DefaultButton label="Click" onClick={onClick} />);
    const button = getByText("Click");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
