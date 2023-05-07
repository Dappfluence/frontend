import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  color?: "primary" | "green" | "red";
}

export const Button: React.FC<ButtonProps> = ({ children, className, color, ...props }) => {

  return (
    <button
      onClick={ props.onClick }
      className={ classNames(className, "p-4 px-6 uppercase flex flex-row justify-center font-semibold items-center gap-1 text-xl", {
        "bg-gradient-to-b from-orange-from to-orange-to text-white": color === "primary",
        "bg-green-500 text-white": color === "green",
        "bg-red-500 text-white": color === "red",
      }) }>
      { children }
    </button>
  );
};
