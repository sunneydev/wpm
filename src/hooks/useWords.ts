import { useEffect, useState } from "react";
import { shuffle } from "../utils";
import someWords from "../assets/words.json";

const useWords = () => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(shuffle(someWords.filter((word) => word.length > 2 && word.length < 5)));

    return () => {
      setWords([]);
    };
  }, []);

  return words
};
export default useWords;
