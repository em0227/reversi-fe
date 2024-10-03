import { BoardTile, Color, Player, Response } from "../types/board";

export const flip = (board: BoardTile[][]) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].flipAnimation) {
        document
          .getElementById(`${i}-${j}`)
          ?.classList.remove("flip-animation");

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
          document.getElementById(`${i}-${j}`)?.classList.add("flip-animation");

          console.log(document.getElementById(`${i}-${j}`));
        }, 500);
      }
    }
  }
};

export const setUpInitialBoard = (board: Color[][]) => {
  return board.map((row) => row.map((color) => ({ color: color })));
};

export const setUpBoard = (res: Response, board?: BoardTile[][]) => {
  if (!board) return undefined;
  return res.board.map((row: Color[], i: number) =>
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
};

export const findPlayerName = (
  blackPlayer?: Player,
  whitePlayer?: Player,
  id?: string
) => {
  if (!id) return null;
  if (id === blackPlayer?.id) return blackPlayer.name;
  if (id === whitePlayer?.id) return whitePlayer.name;
};
