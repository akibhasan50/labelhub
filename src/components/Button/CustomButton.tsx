import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
}) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
