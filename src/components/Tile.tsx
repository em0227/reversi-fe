import React, { useEffect, useState } from "react";
import { BoardTile, Color } from "../types/board";

type Tile = {
  tile: BoardTile;
  putPawn: (e: React.BaseSyntheticEvent) => void;
  row: number;
  col: number;
};

const Tile = ({ tile, putPawn, row, col }: Tile) => {
  return tile.color === "BLACK" ? (
    <>
      <div
        className={`white-pawn ${tile.flipAnimation ? "flip-out" : ""}`}
      ></div>
      <div
        className={`black-pawn ${tile.flipAnimation ? "flip-in" : ""}`}
      ></div>
    </>
  ) : tile.color === "WHITE" ? (
    <>
      <div
        className={`black-pawn ${tile.flipAnimation ? "flip-out" : ""}`}
      ></div>
      <div
        className={`white-pawn ${tile.flipAnimation ? "flip-in" : ""}`}
      ></div>
    </>
  ) : (
    <div
      className="empty-pawn"
      id={`empty-tile-${row}-${col}`}
      data-row={row}
      data-col={col}
      onClick={(e) => {
        console.log("click tile");
        putPawn(e);
      }}
    ></div>
  );
};

export default Tile;
