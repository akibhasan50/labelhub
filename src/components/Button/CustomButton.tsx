import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
