import React, { useEffect, useState } from "react";

type Tile = {
  color: "BLACK" | "WHITE" | "";
  putPawn: (e: React.BaseSyntheticEvent) => void;
  flipAnimation?: boolean;
};

const Tile = ({ color, putPawn }: Tile) => {
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
    <div onClick={(e) => putPawn(e)}></div>
  );
};

export default Tile;
