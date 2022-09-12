import "./App.css";

import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./data/words";

//components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const guessesQty = 3;
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  //pick random category and a word from that category
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const categoryPicked =
      categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[categoryPicked][
        Math.floor(Math.random() * words[categoryPicked].length)
      ];

    return { word, categoryPicked };
  }, [words]);

  //start game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterState();
    //destructuring data provided from the function
    const { word, categoryPicked } = pickWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(categoryPicked);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((prevGuessedLettersState) => [
        ...prevGuessedLettersState,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((prevWrongLettersState) => [
        ...prevWrongLettersState,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //reset all states
  useEffect(() => {
    if (guesses <= 0) {
      setTimeout(() => {
        setGameStage(stages[2].name);
        clearLetterState();
      }, 300);
    }
  }, [guesses]);

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      setScore((prevScore) => (prevScore += 100));

      //restart game if win
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  //restart game
  const restart = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen handleClick={startGame} />}
      {gameStage === "game" && (
        <Game
          handleClick={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          guessedLetters={guessedLetters}
          letters={letters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver handleClick={restart} score={score} />}
    </div>
  );
}

export default App;
