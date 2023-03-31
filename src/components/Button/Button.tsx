import "./styles.scss";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  onClick: () => void;
}

export const Button = ({ type, label, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {label}
    </button>
  );
};
