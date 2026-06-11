import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const [vsAI, setVsAI] = useState(true);

  const winner = checkWinner(board);

  const isDraw =
    !winner &&
    board.every((cell) => cell !== "");

  // AI Move
  useEffect(() => {
    if (
      vsAI &&
      !isXTurn &&
      !winner &&
      !isDraw
    ) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isXTurn, board]);

  // Update Score
  useEffect(() => {
    if (winner) {
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    }
  }, [winner]);

  function handleClick(index) {
    if (
      board[index] !== "" ||
      winner ||
      (!isXTurn && vsAI)
    ) {
      return;
    }

    const newBoard = [...board];

    if (vsAI) {
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsXTurn(false);
    } else {
      newBoard[index] = isXTurn
        ? "X"
        : "O";

      setBoard(newBoard);
      setIsXTurn(!isXTurn);
    }
  }

  function makeAIMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const tempBoard = [...board];
        tempBoard[i] = "O";

        const score = minimax(
          tempBoard,
          false
        );

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      const newBoard = [...board];
      newBoard[move] = "O";

      setBoard(newBoard);
      setIsXTurn(true);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  }

  function resetScore() {
    setScore({
      X: 0,
      O: 0,
    });
  }

  let status = "";

  if (winner) {
    status = `Pemenang: ${winner}`;
  } else if (isDraw) {
    status = "Hasil: Seri";
  } else {
    status = `Giliran: ${
      isXTurn ? "X" : "O"
    }`;
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <div className="score">
        <p>X: {score.X}</p>
        <p>O: {score.O}</p>
      </div>

      <p>{status}</p>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() =>
              handleClick(index)
            }
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="buttons">
        <button onClick={resetGame}>
          Reset Game
        </button>

        <button onClick={resetScore}>
          Reset Score
        </button>

        <button
          onClick={() =>
            setVsAI(!vsAI)
          }
        >
          {vsAI
            ? "VS AI"
            : "2 Player"}
        </button>
      </div>
    </div>
  );
}

function checkWinner(board) {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of patterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

// AI Minimax
function minimax(board, isMaximizing) {
  const winner = checkWinner(board);

  if (winner === "O") return 1;
  if (winner === "X") return -1;

  const isDraw = board.every(
    (cell) => cell !== ""
  );

  if (isDraw) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const tempBoard = [...board];
        tempBoard[i] = "O";

        const score = minimax(
          tempBoard,
          false
        );

        bestScore = Math.max(
          score,
          bestScore
        );
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const tempBoard = [...board];
        tempBoard[i] = "X";

        const score = minimax(
          tempBoard,
          true
        );

        bestScore = Math.min(
          score,
          bestScore
        );
      }
    }

    return bestScore;
  }
}

export default App;