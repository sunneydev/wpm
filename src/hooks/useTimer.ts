import { useState, useEffect } from "react";

const useTimer = (startingTime: number, started: boolean, correct: number) => {
  const [time, setTime] = useState(startingTime);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started) {
      setFinished(false);
      setTime(startingTime);
      return;
    }

    const interval = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          setFinished(true);
          clearInterval(interval);
        }

        return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [started]);

  return {
    time,
    finished,
    wpm: Math.round(time !== 60 ? (correct / (60 - time) * 60) || 0 : correct),
  };
};

export default useTimer;
