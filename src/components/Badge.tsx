import React from "react";

const Badge: React.FC<{
  bgColor: `bg-${"red" | "green" | "blue"}-${"500" | "600"}`;
  children: React.ReactNode;
}> = ({ bgColor, children }) => (
  <div
    className={`py-3 px-3 min-w-12 text-center rounded-2xl font-bold text-xl ${bgColor}`}
  >
    {children}
  </div>
);

export default Badge;
