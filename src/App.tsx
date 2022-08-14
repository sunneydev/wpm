import type { Progress } from "./types";
import { useCallback, useEffect, useState } from "react";
import Timer from "./components/Timer";
import Input from "./components/Input";
import useTimer from "./hooks/useTimer";
import useWords from "./hooks/useWords";
import Words from "./hooks/Words";
import Badge from "./components/Badge";

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

  useEffect(() => {
    const seconds = 5;
    const words = 10;
    const wpm = (words / seconds) * 60;
  }, [started, total, incorrect]);

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

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        <div className="w-full text-white flex gap-2 mb-2">
          <Badge color="green">{wpm}</Badge>
          <Badge color="blue">{total}</Badge>
          <Badge color="red">{incorrect}</Badge>
        </div>
        <div className="bg-[#191A19] p-4 h-[18%] rounded-xl">
          <Words current={current} history={history} words={words} />
        </div>
        <div className="mt-4 relative bg-[#191A19] p-2 rounded-xl w-full flex items-center justify-center">
          <Input onKeyDown={onKeyDown} />
          <Timer started={started} time={time} />
        </div>
      </div>
    </div>
  );
}

export default App;
