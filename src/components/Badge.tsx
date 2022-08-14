import React from "react";

const Badge: React.FC<{
  color: "red" | "green" | "blue";
  children: React.ReactNode;
}> = ({ color, children }) => (
  <div
    className={`py-3 px-3 w-12 text-center bg-${color}-600 rounded-2xl font-bold text-xl`}
  >
    {children}
  </div>
);

export default Badge;
