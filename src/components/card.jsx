import React from "react";
import clsx from "clsx";

export const Card = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "rounded-2xl border border-gray-200 bg-white shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={clsx("p-4 md:p-6", className)} {...props}>
    {children}
  </div>
);
