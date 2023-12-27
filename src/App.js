import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // winner 계산
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // next player 계산
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = `Next player : ${xIsNext ? "X" : "O"}`;
  }

  // square 클릭시 history도 변경
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];

    const newSquares = newCurrent.squares.slice();
    // winner 있거나 이미 값이 들어있을 경우
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  // 순서 이동했을 떄는 step과 turn만 변경
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // 이동 표시
  const moves = history.map((ele, idx) => {
    const desc = idx ? "Go to move #" + idx : "Go to game start";
    return (
      <li key={idx}>
        <button className="move-button" onClick={() => jumpTo(idx)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
