import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Color, BoardTile, Player } from "../types/board";
import { getGame, updateGame, createGame } from "../utils/game";
import { setUpInitialBoard, setUpBoard, findPlayerName } from "../utils/helper";

const Board = () => {
  const [board, setBoard] = useState<BoardTile[][]>();
  const [blackPlayer, setBlackPlayer] = useState<Player>();
  const [whitePlayer, setWhitePlayer] = useState<Player>();
  const [currentPlayer, setCurrentPlayer] = useState<string>();
  const [winnerId, setWinnerId] = useState<string>();
  const [winByHowMany, setWinByHowMany] = useState<number>(0);
  const [gameId, setGameId] = useState<string>();
  const [gameStatus, setGameStatus] = useState<string>();

  useEffect(() => {
    const getGameBoard = async () => {
      const res = await getGame(gameId);
      console.log(res);
      if (res !== null) {
        const board = setUpInitialBoard(res.board);
        setBoard(board);
        //TODO: probably refactor black and white player to useRef
        setBlackPlayer(res.blackPlayer);
        setWhitePlayer(res.whitePlayer);
        setGameStatus(res.state);
        setCurrentPlayer(res.currentPlayerId);
      }
      //TODO: show error model
    };
    if (gameId) {
      getGameBoard();
    }
  }, [gameId]);

  // useEffect(() => {
  //   if (board && gameStatus !== "NEW") {
  //     flip(board);
  //   }
  // }, [board]);

  const putPawn = async (e: React.BaseSyntheticEvent): Promise<void> => {
    const res = await updateGame(
      gameId,
      e.currentTarget.dataset.row,
      e.currentTarget.dataset.col,
      currentPlayer === blackPlayer?.id ? "BLACK" : "WHITE",
      currentPlayer
    );
    console.log("hit put pawn", res);
    //TODO: show error model
    if (!res) return;
    const newBoard = setUpBoard(res, board);
    setBoard(newBoard);
    setGameStatus(res.state);
    setCurrentPlayer(res.currentPlayerId);
    if (res.winnerId && res.winByHowMany) {
      setWinnerId(res.winnerId);
      setWinByHowMany(res.winByHowMany);
    }
  };

  const startNewGame = async () => {
    const newGameId = await createGame(
      "73b80336-8c7c-4591-bca7-8020ff86dfbf",
      "f91bb255-9e38-47bb-8cb5-bbf0eecd17bb"
    );
    if (newGameId) {
      setGameId(newGameId);
    }
  };

  if (!board)
    return (
      <button className="start-new-game-button" onClick={() => startNewGame()}>
        Start New Game
      </button>
    );

  return (
    <div className="game">
      <div className="current-player-info"></div>
      <div className="board">
        <div className="game-status">
          <div>Game Status: {gameStatus}</div>
          {winnerId ? (
            <>
              <div>
                Winner Player:{" "}
                {findPlayerName(blackPlayer, whitePlayer, winnerId)}
              </div>
              <div>Win by: {winByHowMany}</div>
            </>
          ) : (
            <div>
              Current Player:{" "}
              {findPlayerName(blackPlayer, whitePlayer, currentPlayer)}
            </div>
          )}
        </div>
        {board.map((row, i) => (
          <div className="board-row" key={i}>
            {row.map((tile, j) => (
              <div className="tile" key={j}>
                <div className={`flip-pawn-inner`} id={`${i}-${j}`}>
                  <Tile tile={tile} putPawn={putPawn} row={i} col={j} />
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
