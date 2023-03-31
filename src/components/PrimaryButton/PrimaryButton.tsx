import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

interface ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  onClick: () => void;
}

export const PrimaryButton = ({ type, label, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="primary-button">
      {label}
    </button>
  );
};
