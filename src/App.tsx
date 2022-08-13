import { useEffect, useState } from "react";
import jojoWords from "./assets/words.json";
import { shuffle } from "./utils";

function App() {
  const [timer, setTimer] = useState(60);
  const [words, setWords] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currWord, setCurrWord] = useState(0);
  const [wordHistory, setWordHistory] = useState<Record<number, boolean>>({});
  const [progress, setProgress] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  const validate = (input: string) => {
    const element = document.getElementById(`word-${currWord}`);

    element?.scrollIntoView();

    setCurrWord((currWord) => currWord + 1);
    setProgress((progress) =>
      input === words[currWord]
        ? {
            ...progress,
            correct: progress.correct + 1,
            total: progress.total + 1,
          }
        : {
            ...progress,
            incorrect: progress.incorrect + 1,
            total: progress.total + 1,
          }
    );
    setWordHistory((wordHistory) => ({
      ...wordHistory,
      [currWord]: input === words[currWord],
    }));
  };

  useEffect(() => {
    let interval: number;

    if (started) {
      setTimer(60);
      interval = setInterval(() => {
        setTimer((timer) => {
          if (timer === 1) {
            clearInterval(interval);
            setTimer(0);
            setStarted(false);
          }

          return timer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [started]);

  useEffect(() => {
    setWords(shuffle(jojoWords));

    return () => {
      setWords([]);
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-1/2 mb-48">
        <div className="bg-[#191A19] p-4 h-[18%] rounded-xl max-h-full overflow-hidden">
          <div className="p-4">
            {words.slice(0, 300).map((w, index) => (
              <div
                id={`word-${index}`}
                key={index}
                className={`${
                  index === currWord
                    ? "bg-[#006dfb]"
                    : typeof wordHistory[index] === "boolean"
                    ? wordHistory[index]
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                } inline-block text-white text-2xl font-bold m-2 p-2 px-4 rounded-xl `}
              >
                {w}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 relative bg-[#191A19] p-2 rounded-xl w-full flex items-center justify-center">
          <input
            type="text"
            onKeyDown={(e) => {
              !started && setStarted(true);

              if (e.key === " ") {
                e.preventDefault();
                validate(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            className="w-1/3 float-none py-2 px-3 rounded-xl font-medium text-2xl"
          />
          <div
            className={`right-0 absolute mr-4 text-2xl p-2 px-3 rounded-xl font-medium text-white ${
              !started
                ? "bg-[#006dfb]"
                : timer < 30 && timer > 10
                ? "bg-yellow-500"
                : timer < 10
                ? "bg-red-400"
                : "bg-green-400"
            }`}
          >
            {timer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
