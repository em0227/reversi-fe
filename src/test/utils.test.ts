import { Color } from "../types/board";
import { setUpBoard } from "../utils/helper";

const mockRes = {
  id: "1",
  state: "NEW",
  currentPlayerId: "1",
  blackPlayer: { id: "1", name: "Emily" },
  whitePlayer: { id: "1", name: "Emily" },
  board: [["BLACK" as Color, "WHITE" as Color]],
  possibleMoves: [[]],
};

//

describe("setUpBoard", () => {
  it("if there's no board, set up nothing", () => {
    expect(setUpBoard(mockRes)).toEqual(undefined);
  });

  it("set up the board correctly", () => {});
});
