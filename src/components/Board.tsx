import React, { useState } from "react";

const Board = () => {
  const mockBoard = Array.from(Array(8), () => new Array(8).fill(null));
  const [board, setBoard] = useState(mockBoard);

  return (
    <div>
      {board.map((row) => (
        <div className="board">
          {row.map((tile) => (
            <div className="tile">{tile}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
