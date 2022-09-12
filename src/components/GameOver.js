import React from "react";

const GameOver = ({ handleClick, score }) => {
  return (
    <div>
      <h1>Fim do jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={handleClick}>RESTART</button>
    </div>
  );
};

export default GameOver;
