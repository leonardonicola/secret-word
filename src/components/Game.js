import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  handleClick,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  const handleSetLetter = (e) => {
    var letters = /^[A-Za-z]+$/;
    if (e.match(letters)) {
      setLetter(e);
    } else {
      return;
    }
  };

  return (
    <div className="game">
      <p className="game__points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="game__tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="game__word-container">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="game__letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="game__blank-square"></span>
          )
        )}
      </div>
      <div className="game__letter-container">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => handleSetLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="game__wrong-letters-container">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
