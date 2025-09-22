import Square from "./Square";
import { calculateWinner } from "../utils/calculateWinner";

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
};

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map((rowStart) => (
        <div className="board-row" key={rowStart}>
          {Array.from({ length: 3 }, (_, i) => (
            <Square
              key={rowStart + i}
              value={squares[rowStart + i]}
              onSquareClick={() => handleClick(rowStart + i)}
            />
          ))}
        </div>
      ))}
    </>
  );
}