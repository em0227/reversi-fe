import { BoardTile, Color, Player, Response } from "../types/board";

export const setUpInitialBoard = (
  board: Color[][],
  possibleMoves: number[][]
) => {
  const initialBoard = board.map((row) =>
    row.map((color) => ({
      color: color,
      possibleMove: false,
      flipAnimation: false,
    }))
  );

  addPossibleMoves(possibleMoves, initialBoard);

  return initialBoard;
};

export const setUpBoard = (res: Response, board?: BoardTile[][]) => {
  if (!board) return undefined;
  const newBoard = board.map((row: BoardTile[], rowNum: number) =>
    row.map((tile, colNum: number) => {
      if (res.board[rowNum][colNum] !== tile.color) {
        if (board![rowNum][colNum].color !== null) {
          return {
            ...tile,
            color: res.board[rowNum][colNum],
            flipAnimation: true,
          };
        } else {
          return {
            ...tile,
            color: res.board[rowNum][colNum],
          };
        }
      } else {
        return tile;
      }
    })
  );

  addPossibleMoves(res.possibleMoves, newBoard);

  return newBoard;
};

const addPossibleMoves = (possibleMoves: number[][], board: BoardTile[][]) => {
  for (const possibleMove of possibleMoves) {
    const [row, col] = possibleMove;
    board[row][col].possibleMove = true;
  }
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
