//tests

//initial board has 4 peices, 2 black 2 white diagnoally

//player can only click available moves

//once player click an available move, putpawn is called

//show correct win info (game status, win by, winner)

//clicking start new game will call creategame

//error handling

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Board from "./Board";
import { Color } from "../types/board";

describe("Board", () => {
  it("set up initial board with 4 pieces", () => {});
});
