import { useEffect, useState } from "react";
import words from "./assets/words.json";

function App() {
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setWord(words[0]);
  }, [input]);

  const validate = (input: string) => {
    if (input === word) {
      setInput("");
      setWord(words[Math.floor(Math.random() * words.length)]);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-1/2 mb-48">
        <div className="bg-[#191A19] h-1/3 p-4 rounded-xl max-h-full overflow-hidden">
          {words.slice(0, 300).map((w, index) => (
            <div
              key={index}
              className={`inline-block text-white text-2xl font-bold m-2 p-2 px-4 rounded-xl ${
                w === word &&
                (w === ""
                  ? "bg-[#1B2430]"
                  : word === input
                  ? "bg-green-500"
                  : "bg-red-500")
              }`}
            >
              {w}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[#191A19] p-4 rounded-xl w-full flex items-center justify-center">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            className="w-1/3 py-2 px-3 rounded-xl font-medium text-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
