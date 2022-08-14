import type { Progress } from "./types";
import { useCallback, useEffect, useState } from "react";
import Timer from "./components/Timer";
import Input from "./components/Input";
import Badge from "./components/Badge";
import useTimer from "./hooks/useTimer";
import useWords from "./hooks/useWords";
import Words from "./hooks/Words";
import Restart from "./components/Restart";

function App() {
  const words = useWords();

  const [{ started, total, current, history, incorrect }, setProgress] =
    useState<Progress>({
      started: false,
      incorrect: 0,
      total: 0,
      current: 0,
      history: {},
    });

  const { time, wpm, finished } = useTimer(60, started, total - incorrect);

  const validate = useCallback(
    (input: string) => {
      const currentWord = words[current];

      const element = document.getElementById(`word-${current}`);

      element?.scrollIntoView({
        block: "start",
      });

      const correct = input === currentWord;

      setProgress({
        started,
        total: total + 1,
        current: current + 1,
        incorrect: incorrect + Number(!correct),
        history: {
          ...history,
          [current]: correct,
        },
      });
    },
    [words, current, started, total, incorrect, history]
  );

  const restart = () => {
    setProgress({
      started: false,
      incorrect: 0,
      total: 0,
      current: 0,
      history: {},
    });
  };

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (finished) return;

      !started &&
        setProgress((prev) => ({
          ...prev,
          started: true,
        }));

      if (event.key === " ") {
        event.preventDefault();
        validate(event.currentTarget.value);
        event.currentTarget.value = "";
      }
    },
    [started, validate]
  );

  useEffect(() => {
    if (started && finished)
      setProgress((prev) => ({
        ...prev,
        started: false,
      }));
  }, [started, finished]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-1/2 mb-48">
        <div className="flex justify-between w-full">
          <div className="text-white flex gap-2 mb-2">
            <Badge bgColor="bg-green-500">{wpm || "Words Per Minute"}</Badge>
            <Badge bgColor="bg-blue-600">{total || "Total"}</Badge>
            <Badge bgColor="bg-red-500">{incorrect || "Incorrect"}</Badge>
          </div>
          <div>
            <Timer started={started} time={time} />
          </div>
        </div>
        <div className="bg-[#191A19] p-4 h-[18%] rounded-xl">
          <Words current={current} history={history} words={words} />
        </div>
        <div className="mt-4 relative bg-[#191A19] p-2 rounded-xl w-full flex items-center justify-center">
          <Input onKeyDown={onKeyDown} />
          <Restart visible={!finished} onRestart={restart} />
        </div>
      </div>
    </div>
  );
}

export default App;
