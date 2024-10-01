import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Color, BoardTile, Player } from "../types/board";
import { getGame, updateGame, createGame } from "../utils/game";

// const mockBoard = Array.from(Array(8), () => new Array(8).fill(null));
// mockBoard[3][3] = "BLACK";
// mockBoard[3][4] = "WHITE";
// mockBoard[4][3] = "WHITE";
// mockBoard[4][4] = "BLACK";
//first game id b275891d-ac39-4b07-9e43-e0bbef5a28a2

const setUpBoard = (board: Color[][]) => {
  return board.map((row) => row.map((color) => ({ color: color })));
};

const Board = () => {
  const [board, setBoard] = useState<BoardTile[][]>();
  const [blackPlayer, setBlackPlayer] = useState<Player>();
  const [whitePlayer, setWhitePlayer] = useState<Player>();
  const [currentPlayer, setCurrentPlayer] = useState<string>();
  const [winnerId, setWinnerId] = useState<string>();
  const [currentColor, setCurrentColor] = useState<Color>();
  const [gameId, setGameId] = useState("946e6de1-92a3-4b7a-8255-f4988a10901d");
  const [gameStatus, setGameStatus] = useState<string>();

  useEffect(() => {
    const getGameBoard = async () => {
      const res = await getGame(gameId);
      console.log(res);
      if (res !== null) {
        const board = setUpBoard(res.board);
        setBoard(board);
        //TODO: probably refactor black and white player to useRef
        setBlackPlayer(res.blackPlayer);
        setWhitePlayer(res.whitePlayer);
        setGameStatus(res.state);
        setWinnerId(res.winnerId);
        setCurrentPlayer(res.currentPlayerId);
        if (res.currentPlayerId === res.blackPlayer.id) {
          setCurrentColor("BLACK");
        } else {
          setCurrentColor("WHITE");
        }
      }
      //TODO: show error model
    };
    getGameBoard();
  }, [gameId]);

  useEffect(() => {
    if (board && gameStatus !== "NEW") {
      console.log("in board effect");
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j].flipAnimation) {
            document
              .getElementById(`${i}-${j}`)
              ?.classList.remove("flip-animation");

            if (board[i][j].color === "BLACK") {
              document
                .getElementById(`${i}-${j}`)
                ?.querySelector(".black-pawn")
                ?.classList.add("invisible");
            } else {
              document
                .getElementById(`${i}-${j}`)
                ?.querySelector(".white-pawn")
                ?.classList.add("invisible");
            }

            setTimeout(() => {
              document
                .getElementById(`${i}-${j}`)
                ?.classList.add("flip-animation");

              console.log(document.getElementById(`${i}-${j}`));
            }, 500);
          }
        }
      }
    }
  }, [board]);

  //TODO: refactor some method out
  const putPawn = async (e: React.BaseSyntheticEvent): Promise<void> => {
    console.log("hit put pawn");
    const res = await updateGame(
      gameId,
      e.currentTarget.dataset.row,
      e.currentTarget.dataset.col,
      currentColor,
      currentPlayer
    );
    console.log(res);
    //TODO: show error model
    if (!res) return;
    const newBoard = res.board.map((row: Color[], i: number) =>
      row.map((color: Color, j: number) => {
        if (color !== board![i][j].color) {
          if (board![i][j].color !== "") {
            return { color: color, flipAnimation: true };
          } else {
            return { color: color, flipAnimation: false };
          }
        } else {
          return { color: color, flipAnimation: false };
        }
      })
    );
    setBoard(newBoard);
    setGameStatus(res.state);
    setWinnerId(res.winnerId);
    setCurrentPlayer(res.currentPlayerId);
    if (res.currentPlayerId === res.blackPlayer.id) {
      setCurrentColor("BLACK");
    } else {
      setCurrentColor("WHITE");
    }
  };

  const findPlayerName = (id?: string) => {
    if (!id) return null;
    if (id === blackPlayer?.id) return blackPlayer?.name;
    if (id === whitePlayer?.id) return whitePlayer?.name;
  };

  const startNewGame = async () => {
    const newGameId = await createGame(blackPlayer?.id, whitePlayer?.id);
    if (newGameId) {
      setGameId(newGameId);
    }
  };

  if (!board) return <></>;

  return (
    <div className="game">
      <div className="current-player-info"></div>
      <div className="board">
        <div className="game-status">
          <div>Game Status: {gameStatus}</div>
          {winnerId ? (
            <div>Winner Player: {findPlayerName(winnerId)}</div>
          ) : (
            <div>Current Player: {findPlayerName(currentPlayer)}</div>
          )}
        </div>
        {board.map((row, i) => (
          <div className="board-row" key={i}>
            {row.map((tile, j) => (
              <div className="tile" key={j}>
                <div className="flip-pawn-inner" id={`${i}-${j}`}>
                  <Tile color={tile.color} putPawn={putPawn} row={i} col={j} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="players-info">
        <div>Black Player: {blackPlayer?.name}</div>
        <div>White Player: {whitePlayer?.name}</div>
        <button
          className="start-new-game-button"
          onClick={() => startNewGame()}
        >
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default Board;
