import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Tile from "./Tile";
import { Color } from "../types/board";

describe("Tile", () => {
  it("render black piece on the tile", () => {
    const mockTile = { color: "BLACK" as Color, possibleMove: false };
    render(<Tile tile={mockTile} putPawn={jest.fn()} row={1} col={1} />);
    expect(screen.getByTestId("black-pawn").firstChild).toHaveClass(
      "white-pawn"
    );
    expect(screen.getByTestId("black-pawn").lastChild).toHaveClass(
      "black-pawn"
    );
  });

  it("render white piece on the tile", () => {
    const mockTile = { color: "WHITE" as Color, possibleMove: false };
    render(<Tile tile={mockTile} putPawn={jest.fn()} row={1} col={1} />);
    expect(screen.getByTestId("white-pawn").firstChild).toHaveClass(
      "black-pawn"
    );
    expect(screen.getByTestId("white-pawn").lastChild).toHaveClass(
      "white-pawn"
    );
  });

  it("render no piece on the tile", () => {
    const mockTile = { color: "" as Color, possibleMove: false };
    render(<Tile tile={mockTile} putPawn={jest.fn()} row={1} col={1} />);
    expect(screen.getByTestId("empty-tile")).not.toHaveClass("white-pawn");
    expect(screen.getByTestId("empty-tile")).not.toHaveClass("black-pawn");
  });
});
