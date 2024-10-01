import React, { useEffect, useState } from "react";
import { Color } from "../types/board";

type Tile = {
  color: Color;
  putPawn: (e: React.BaseSyntheticEvent) => void;
  row: number;
  col: number;
};

const Tile = ({ color, putPawn, row, col }: Tile) => {
  return color === "BLACK" ? (
    <>
      <div className={`white-pawn`}></div>
      <div className={`black-pawn`}></div>
    </>
  ) : color === "WHITE" ? (
    <>
      <div className={`black-pawn`}></div>
      <div className="white-pawn"></div>
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
