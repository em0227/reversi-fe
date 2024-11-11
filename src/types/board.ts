export type Color = "BLACK" | "WHITE" | "";

export type BoardTile = {
  color: Color;
  flipAnimation: boolean;
  possibleMove: boolean;
};

export type Response = {
  id: string;
  state: string;
  winnerId?: string;
  currentPlayerId: string;
  blackPlayer: Player;
  whitePlayer: Player;
  board: Color[][];
  winByHowMany?: number;
  possibleMoves: number[][];
  errorMessage?: string;
};

export type Player = {
  id: string;
  name: string;
};
