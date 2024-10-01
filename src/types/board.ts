export type Color = "BLACK" | "WHITE" | "";

export type BoardTile = {
  color: Color;
  flipAnimation?: boolean;
};

export type Response = {
  id: string;
  state: string;
  winnerId?: string;
  currentPlayerId: string;
  blackPlayer: Player;
  whitePlayer: Player;
  board: Color[][];
};

export type Player = {
  id: string;
  name: string;
};
