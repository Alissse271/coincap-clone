import "./styles.scss";
import React from "react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: "+" | "x" | "-";
  onClick?: () => void;
  mode: "add" | "cancel" | "remove";
  disabled?: boolean;
  dataCy?: string;
}

export const Button = ({ type, label, onClick, mode, disabled = false, dataCy }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={["button", `button--${mode}`].join(" ")}
      disabled={disabled}
      data-cy={dataCy}
    >
      {label}
    </button>
  );
};
