import React from "react";
import { Progress } from "../types";

const Words: React.FC<
  Pick<Progress, "current" | "history"> & {
    words: string[];
  }
> = ({ history, current, words }) => {
  const wordColor = (index: number) =>
    "word " +
    (index === current
      ? "bg-[#006dfb]"
      : typeof history[index] === "boolean"
      ? history[index]
        ? "bg-green-500"
        : "bg-red-500"
      : "");

  return (
    <div className="max-h-full overflow-hidden">
      {words.slice(0, 300).map((w, index) => (
        <div id={`word-${index}`} key={index} className={wordColor(index)}>
          {w}
        </div>
      ))}
    </div>
  );
};

export default Words;
