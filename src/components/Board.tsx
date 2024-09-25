import React, { useEffect, useState } from "react";

type Response = {
  id: string;
  state: string;
  winnerId?: string;
  currentPlyer: string;
  blackPlayer: string;
  whitePlayer: string;
  board: string[][];
};

const Board = () => {
  const [board, setBoard] = useState<string[][]>();
  const [blackPlayer, setBlackPlayer] = useState<string>();
  const [whitePlayer, setWhitePlayer] = useState<string>();
  const [currentPlayer, setCurrentPlayer] = useState<string>();
  const [currentColor, setCurrentColor] = useState<"BLACK" | "WHITE">();

  useEffect(() => {
    const getBoard = async () => {
      await fetch(
        "http://localhost:8080/game/a8b86fa3-1936-4e0a-9258-5f1dfab2de2a"
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBoard(res.board);
          //TODO: probably refactor black and white player to useRef
          setBlackPlayer(res.blackPlayer);
          setWhitePlayer(res.whitePlayer);
          setCurrentPlayer(res.currentPlayerId);
          if (res.currentPlayerId === res.blackPlayer) {
            setCurrentColor("BLACK");
          } else {
            setCurrentColor("WHITE");
          }
        });
    };
    getBoard();
  }, []);

  const putPawn = async (i: number, j: number): Promise<void> => {
    await fetch(
      "http://localhost:8080/game/a8b86fa3-1936-4e0a-9258-5f1dfab2de2a",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: i,
          col: j,
          color: currentColor,
          player: currentPlayer,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBoard(res.board);
        setCurrentPlayer(res.currentPlayerId);
        if (res.currentPlayerId === res.blackPlayer) {
          setCurrentColor("BLACK");
        } else {
          setCurrentColor("WHITE");
        }
        console.log("update", res);
      });
    //TODO: add error handling
  };

  if (!board) return <></>;

  return (
    <div>
      {board.map((row, i) => (
        <div className="board" key={i}>
          {row.map((tile, j) =>
            tile === "BLACK" ? (
              <div className="tile" key={j}>
                <div className="black-pawn"></div>
              </div>
            ) : tile === "WHITE" ? (
              <div className="tile" key={j}>
                <div className="white-pawn"></div>
              </div>
            ) : (
              <div className="tile" key={j} onClick={() => putPawn(i, j)}></div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
