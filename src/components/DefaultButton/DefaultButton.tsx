import React from "react";
import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  onClick?: () => void;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  dataCy?: string;
}

export const DefaultButton = ({
  type,
  label,
  onClick,
  primary = false,
  size = "medium",
  disabled = false,
  dataCy,
}: ButtonProps) => {
  const mode = primary ? "default-button--primary" : "default-button--secondary";
  return (
    <button
      type={type}
      onClick={onClick}
      className={["default-button", `default-button--${size}`, mode].join(" ")}
      disabled={disabled}
      data-cy={dataCy}
    >
      {label}
    </button>
  );
};
