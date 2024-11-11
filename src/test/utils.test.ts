import { Color, BoardTile } from "../types/board";
import { setUpBoard } from "../utils/helper";

const colorValue = {
  BLACK: "BLACK" as Color,
  WHITE: "WHITE" as Color,
  EMPTY: "" as Color,
};

const mockRes = {
  id: "1",
  state: "NEW",
  currentPlayerId: "1",
  blackPlayer: { id: "1", name: "Emily" },
  whitePlayer: { id: "1", name: "Emily" },
  board: [
    [colorValue.BLACK, colorValue.WHITE],
    [colorValue.WHITE, colorValue.EMPTY],
  ],
  possibleMoves: [[1, 1]],
};

const mockBoard: BoardTile[][] = [
  [
    { color: colorValue.BLACK, possibleMove: false, flipAnimation: false },
    { color: colorValue.BLACK, possibleMove: false, flipAnimation: false },
  ],
  [
    { color: colorValue.EMPTY, possibleMove: false, flipAnimation: false },
    { color: colorValue.EMPTY, possibleMove: false, flipAnimation: false },
  ],
];

describe("setUpBoard", () => {
  const testResult = setUpBoard(mockRes, mockBoard);

  test("if there's no board, set up nothing", () => {
    expect(setUpBoard(mockRes)).toEqual(undefined);
  });

  test("if a tile color is different between res.board and local board, the tile's flipAnimation should be true", () => {
    expect(testResult![0][1].flipAnimation).toEqual(true);
  });

  test("if a tile color is NOT different between res.board and local board, the tile's flipAnimation should be false", () => {
    expect(testResult![0][0].flipAnimation).toEqual(false);
  });

  test("if a tile color is different but the color is NULL on local board, the tile's flipAnimation should be false", () => {
    expect(testResult![1][0].flipAnimation).toEqual(false);
  });

  test("if a tile is identified as a possible move from res, the possibleMove should be true", () => {
    expect(testResult![1][1].possibleMove).toEqual(true);
  });
});
