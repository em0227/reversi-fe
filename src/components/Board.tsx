import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Color, BoardTile } from "../types/board";

// const mockBoard = Array.from(Array(8), () => new Array(8).fill(null));
// mockBoard[3][3] = "BLACK";
// mockBoard[3][4] = "WHITE";
// mockBoard[4][3] = "WHITE";
// mockBoard[4][4] = "BLACK";

const setUpBoard = (board: Color[][]) => {
  return board.map((row) => row.map((color) => ({ color: color })));
};

const Board = () => {
  const [board, setBoard] = useState<BoardTile[][]>();
  const [blackPlayer, setBlackPlayer] = useState<string>();
  const [whitePlayer, setWhitePlayer] = useState<string>();
  const [currentPlayer, setCurrentPlayer] = useState<string>();
  const [currentColor, setCurrentColor] = useState<Color>();

  useEffect(() => {
    const getBoard = async () => {
      await fetch(
        "http://localhost:8080/game/b275891d-ac39-4b07-9e43-e0bbef5a28a2"
      )
        .then((res) => res.json())
        .then((res) => {
          const board = setUpBoard(res.board);
          setBoard(board);
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

  useEffect(() => {
    if (board) {
      console.log("in board effect");
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j].flipAnimation) {
            if (board[i][j].color === "BLACK") {
              document
                .getElementById(`${i}-${j}`)
                ?.querySelector(".black-pawn")
                ?.classList.add("invisible");
            } else {
              document
                .getElementById(`${i}-${j}`)
                ?.querySelector(".white-pawn")
                ?.classList.add("invisible");
            }
            setTimeout(() => {
              document
                .getElementById(`${i}-${j}`)
                ?.classList.remove("flip-animation");
              document
                .getElementById(`${i}-${j}`)
                ?.classList.add("flip-animation");

              console.log(document.getElementById(`${i}-${j}`));
            }, 100);
          }
        }
      }
    }
  }, [board]);

  const putPawn = async (e: React.BaseSyntheticEvent): Promise<void> => {
    await fetch(
      "http://localhost:8080/game/b275891d-ac39-4b07-9e43-e0bbef5a28a2",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: e.currentTarget.dataset.row,
          col: e.currentTarget.dataset.col,
          color: currentColor,
          player: currentPlayer,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const newBoard = res.board.map((row: Color[], i: number) =>
          row.map((color: Color, j: number) => {
            if (color !== board![i][j].color) {
              if (board![i][j].color !== "") {
                return { color: color, flipAnimation: true };
              } else {
                return { color: color, flipAnimation: false };
              }
            } else {
              return { color: color, flipAnimation: false };
            }
          })
        );
        setBoard(newBoard);
        setCurrentPlayer(res.currentPlayerId);
        if (res.currentPlayerId === res.blackPlayer) {
          setCurrentColor("BLACK");
        } else {
          setCurrentColor("WHITE");
        }
      });
    //TODO: add error handling
  };

  if (!board) return <></>;

  return (
    <div>
      {board.map((row, i) => (
        <div className="board" key={i}>
          {row.map((tile, j) => (
            <div
              className="tile flip-pawn-inner"
              data-row={i}
              data-col={j}
              id={`${i}-${j}`}
            >
              <Tile
                color={tile.color}
                putPawn={putPawn}
                key={j}
                flipAnimation={tile.flipAnimation}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
