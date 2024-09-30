export type Color = "BLACK" | "WHITE" | "";

export type BoardTile = {
  color: Color;
  flipAnimation?: boolean;
};

export type Response = {
  id: string;
  state: string;
  winnerId?: string;
  currentPlyer: string;
  blackPlayer: string;
  whitePlayer: string;
  board: string[][];
};
