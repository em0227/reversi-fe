import React from "react";
import { BoardTile } from "../types/board";

type Tile = {
  tile: BoardTile;
  putPawn: (e: React.BaseSyntheticEvent) => void;
  row: number;
  col: number;
};

const Tile = ({ tile, putPawn, row, col }: Tile) => {
  return tile.color === "BLACK" ? (
    <div data-testid="black-pawn">
      <div
        className={`white-pawn ${tile.flipAnimation ? "flip-out" : ""}`}
      ></div>
      <div
        className={`black-pawn ${tile.flipAnimation ? "flip-in" : ""}`}
      ></div>
    </div>
  ) : tile.color === "WHITE" ? (
    <div data-testid="white-pawn">
      <div
        className={`black-pawn ${tile.flipAnimation ? "flip-out" : ""}`}
      ></div>
      <div
        className={`white-pawn ${tile.flipAnimation ? "flip-in" : ""}`}
      ></div>
    </div>
  ) : (
    <div
      className="empty-pawn"
      id={`empty-tile-${row}-${col}`}
      data-testid="empty-tile"
      data-row={row}
      data-col={col}
      onClick={(e) => {
        putPawn(e);
      }}
    ></div>
  );
};

export default Tile;
