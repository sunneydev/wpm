import React from "react";

const Timer: React.FC<{
  started: boolean;
  time: number;
}> = ({ started, time }) => {
  const timerColor = () =>
    !started
      ? "bg-[#006dfb]"
      : time < 30 && time > 10
      ? "bg-[#FBFF00]"
      : time <= 10
      ? "bg-red-500"
      : "bg-green-500";

  return (
    <div
      className={`mr-4 text-2xl p-2 px-3 rounded-xl font-medium text-white ${timerColor()}`}
    >
      {time}
    </div>
  );
};

export default Timer;
