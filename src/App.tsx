import { useCallback, useEffect, useState } from "react";
import Timer from "./components/Timer";
import useTimer from "./hooks/useTimer";
import useWords from "./hooks/useWords";

interface Progress {
  started: boolean;
  total: number;
  current: number;
  incorrect: number;
  history: Record<number, boolean>;
}

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

  const { time, finished } = useTimer(60, started);

  const validate = (input: string) => {
    const currentWord = words[current];

    const element = document.getElementById(`word-${currentWord}`);

    element?.scrollIntoView({
      block: "start",
    });

    const correct = input === words[current];

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
  };

  const wordColor = (index: number) =>
    index === current
      ? "bg-[#006dfb]"
      : typeof history[index] === "boolean"
      ? history[index]
        ? "bg-green-500"
        : "bg-red-500"
      : "";

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
    [started]
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
        <div className="bg-[#191A19] p-4 h-[18%] rounded-xl">
          <div className=" max-h-full overflow-hidden">
            {words.slice(0, 300).map((w, index) => (
              <div
                id={`word-${index}`}
                key={index}
                className={`${wordColor(
                  index
                )} inline-block text-white text-2xl font-bold m-2 p-2 px-4 rounded-xl`}
              >
                {w}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 relative bg-[#191A19] p-2 rounded-xl w-full flex items-center justify-center">
          <input
            type="text"
            onKeyDown={onKeyDown}
            className="w-1/3 float-none py-2 px-3 rounded-xl font-medium text-2xl"
          />
          <Timer started={started} time={time} />
        </div>
      </div>
    </div>
  );
}

export default App;
