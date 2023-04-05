import "./styles.scss";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: "+" | "x" | "-";
  onClick?: () => void;
  mode: "add" | "cancel" | "remove";
  disabled?: boolean;
}

export const Button = ({ type, label, onClick, mode, disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={["button", `button--${mode}`].join(" ")}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
