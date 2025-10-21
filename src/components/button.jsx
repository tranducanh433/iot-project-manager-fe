import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  variant = "default",
  onClick,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
