import { Color, Response } from "../types/board";

export const getGame = async (id?: string): Promise<Response | null> => {
  if (!id) return null;
  let result = null;
  await fetch(`http://localhost:8080/game/${id}`)
    .then((res) => res.json())
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log(err));
  return result;
};

export const updateGame = async (
  id?: string,
  row?: number,
  col?: number,
  color?: Color,
  currentPlayer?: string
): Promise<Response | null> => {
  if (!id || !row || !col || color === "" || !currentPlayer) return null;
  let result = null;
  await fetch(`http://localhost:8080/game/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      row,
      col,
      color,
      player: currentPlayer,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log(err));
  return result;
};

export const createGame = async (
  player1?: string,
  player2?: string
): Promise<string | null> => {
  if (!player1 || !player2) return null;
  let result = null;
  await fetch(`http://localhost:8080/game`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      player1,
      player2,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      result = res;
    })
    .catch((err) => console.log(err));
  return result;
};
