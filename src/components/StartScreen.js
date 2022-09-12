import "./StartScreen.css";

const StartScreen = ({ handleClick }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={handleClick}>Começar</button>
    </div>
  );
};

export default StartScreen;
