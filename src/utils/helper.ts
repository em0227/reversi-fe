import { BoardTile, Color, Player, Response } from "../types/board";

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
