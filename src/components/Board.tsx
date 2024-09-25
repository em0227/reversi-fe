import React, { useEffect, useState } from "react";

const Board = () => {
  const [board, setBoard] = useState<string[][]>();

  useEffect(() => {
    const getBoard = async () => {
      await fetch(
        "http://localhost:8080/game/55be3af7-7ec4-4947-9f59-182aff592914"
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBoard(res.board);
        });
    };
    getBoard();
  }, []);

  console.log("board", board);
  if (!board) return <></>;
  return (
    <div>
      {board.map((row, i) => (
        <div className="board" key={i}>
          {row.map((tile, j) => (
            <div className="tile" key={j}>
              {tile}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
