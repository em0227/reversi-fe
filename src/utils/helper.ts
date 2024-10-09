import { BoardTile, Color, Player, Response } from "../types/board";

export const setUpInitialBoard = (
  board: Color[][],
  possibleMoves: number[][]
) => {
  const initialBoard = board.map((row) =>
    row.map((color) => ({ color: color, possibleMove: false }))
  );
  for (const possibleMove of possibleMoves) {
    const [row, col] = possibleMove;
    initialBoard[row][col].possibleMove = true;
  }
  return initialBoard;
};

export const setUpBoard = (res: Response, board?: BoardTile[][]) => {
  if (!board) return undefined;
  const newBoard = res.board.map((row: Color[], i: number) =>
    row.map((color: Color, j: number) => {
      if (color !== board![i][j].color) {
        if (board![i][j].color !== "") {
          return { color: color, flipAnimation: true, possibleMove: false };
        } else {
          return { color: color, flipAnimation: false, possibleMove: false };
        }
      } else {
        return { color: color, flipAnimation: false, possibleMove: false };
      }
    })
  );
  for (const possibleMove of res.possibleMoves) {
    const [row, col] = possibleMove;
    newBoard[row][col].possibleMove = true;
  }

  return newBoard;
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
