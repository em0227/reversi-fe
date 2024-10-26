import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";
import { getGame, updateGame, createGame } from "../utils/game";
import { setUpInitialBoard, setUpBoard, findPlayerName } from "../utils/helper";

// Mock the utility functions
jest.mock("../utils/game");
jest.mock("../utils/helper");

describe("Board Component", () => {
  // Mock data
  const mockGame = {
    board: Array(8).fill(Array(8).fill(null)),
    possibleMoves: [],
    blackPlayer: { id: "black-id", name: "Black Player" },
    whitePlayer: { id: "white-id", name: "White Player" },
    state: "IN_PROGRESS",
    currentPlayerId: "black-id",
    id: "test-game-id",
  };

  const mockBoard = Array(8).fill(
    Array(8).fill({
      color: null,
      possibleMove: false,
    })
  );
  const mockGetGame = getGame as jest.MockedFunction<typeof getGame>;
  const mockCreateGame = createGame as jest.MockedFunction<typeof createGame>;
  const mockUpdateGame = updateGame as jest.MockedFunction<typeof updateGame>;
  const mockSetUpBoard = setUpBoard as jest.MockedFunction<typeof setUpBoard>;
  const mockSetUpInitialBoard = setUpInitialBoard as jest.MockedFunction<
    typeof setUpInitialBoard
  >;
  const mockfindPlayerName = findPlayerName as jest.MockedFunction<
    typeof findPlayerName
  >;
  let localStorageMock: { [key: string]: string } = {};

  beforeAll(() => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation((key) => localStorageMock[key]);
    jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation((key, value) => (localStorageMock[key] = value));
    jest
      .spyOn(Storage.prototype, "clear")
      .mockImplementation(() => (localStorageMock = {}));
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    localStorageMock = {};

    // Set up default mock implementations
    mockSetUpInitialBoard.mockReturnValue(mockBoard);
    mockGetGame.mockResolvedValue(mockGame);
    mockSetUpBoard.mockReturnValue(mockBoard);
  });

  test('renders "Start New Game" button when no board is present', async () => {
    mockGetGame.mockResolvedValueOnce(null);

    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText("Start New Game")).toBeInTheDocument();
    });
  });

  test("loads existing game from localStorage", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");

    render(<Board />);

    await waitFor(() => {
      expect(getGame).toHaveBeenCalledWith("test-game-id");
    });
  });

  test("displays game status and current player", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");
    mockSetUpInitialBoard.mockReturnValue(mockBoard);
    mockGetGame.mockResolvedValue(mockGame);
    mockSetUpBoard.mockReturnValue(mockBoard);
    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText("Game Status: IN_PROGRESS")).toBeInTheDocument();
      expect(screen.getByText(/Current Player:/)).toBeInTheDocument();
    });
  });

  test("displays winner when game is complete", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");

    const gameWithWinner = {
      ...mockGame,
      state: "FINISHED",
      winnerId: "black-id",
      winByHowMany: 5,
    };

    mockGetGame.mockResolvedValueOnce(gameWithWinner);
    mockfindPlayerName.mockReturnValue("Black Player");

    render(<Board />);

    await waitFor(() => {
      expect(
        screen.getByText(/Winner Player: Black Player/)
      ).toBeInTheDocument();
      expect(screen.getByText("Win by: 5")).toBeInTheDocument();
    });
  });

  //review if this test make sesne or should it go further
  test("handles pawn placement", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");

    const getGame = {
      ...mockGame,
      currentPlayerId: "black-id",
    };

    mockGetGame.mockResolvedValueOnce(getGame);

    render(<Board />);

    await waitFor(() => {
      const tiles = screen.getAllByTestId("empty-tile"); // You'll need to add data-testid="tile" to your Tile component
      fireEvent.click(tiles[0]);
    });

    expect(updateGame).toHaveBeenCalledWith(
      "test-game-id",
      "0",
      "0",
      "BLACK",
      "black-id"
    );
  });

  test("starts new game when button is clicked", async () => {
    const newGameId = "new-game-id";
    mockCreateGame.mockResolvedValueOnce(newGameId);

    render(<Board />);

    await waitFor(() => {
      const button = screen.getByText("Start New Game");
      fireEvent.click(button);
    });

    expect(createGame).toHaveBeenCalledWith(
      "73b80336-8c7c-4591-bca7-8020ff86dfbf",
      "f91bb255-9e38-47bb-8cb5-bbf0eecd17bb"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith("currentGame", newGameId);
  });

  test("handles API errors gracefully", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");
    mockGetGame.mockResolvedValueOnce(null);

    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
      expect(
        screen.getByText(/please refresh the page and try again/)
      ).toBeInTheDocument();
    });
  });

  //not sure if the mock board should be correclty set up with the correct values, if so need to update this
  test("renders correct number of tiles", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");
    mockSetUpInitialBoard.mockReturnValue(mockBoard);
    mockGetGame.mockResolvedValue(mockGame);
    mockSetUpBoard.mockReturnValue(mockBoard);
    render(<Board />);

    await waitFor(() => {
      const tiles = screen.getAllByTestId("empty-tile");
      expect(tiles).toHaveLength(64); // 8x8 board
    });
  });

  test("displays both players information", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("test-game-id");
    mockSetUpInitialBoard.mockReturnValue(mockBoard);
    mockGetGame.mockResolvedValue(mockGame);
    mockSetUpBoard.mockReturnValue(mockBoard);
    render(<Board />);

    await waitFor(() => {
      expect(
        screen.getByText("Black Player: Black Player")
      ).toBeInTheDocument();
      expect(
        screen.getByText("White Player: White Player")
      ).toBeInTheDocument();
    });
  });
});
