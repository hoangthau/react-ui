import React, { useState } from "react";
import "./TicTacToe.css";

const initialItems = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "O";
let hasWinner = false;

function checkWinner(items, player) {
  const count = {
    cross1: 0,
    cross2: 0,
    row: 0,
    column: 0,
  };
  const winnerCheck = 3;
  for (let i = 0; i < items.length; i++) {
    if (items[i][i] === player) {
      count.cross1++;
    }
    if (items[i][items.length - i - 1] === player) {
      count.cross2++;
    }
    if (count.cross1 === winnerCheck || count.cross2 === winnerCheck) {
      return true;
    }
    count.row = 0;
    count.column = 0;
    for (let j = 0; j < items[i].length; j++) {
      if (items[i][j] === player) {
        count.row++;
      }
      if (items[j][i] === player) {
        count.column++;
      }
      if (count.row === winnerCheck || count.column === winnerCheck) {
        return true;
      }
    }
  }
  return false;
}

export function TicTacToe() {
  const [tableItems, setTableItems] = useState(initialItems);

  const handleClick = (row, column) => {
    if (hasWinner || tableItems[row][column]) return;
    const newItems = [...tableItems];
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayer = nextPlayer;
    newItems[row][column] = nextPlayer;
    setTableItems(newItems);
  };

  const playAgain = () => {
    setTableItems([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const nextPlayer = currentPlayer === "X" ? "O" : "X";
  hasWinner = checkWinner(tableItems, currentPlayer);

  return (
    <>
      <div className="table">
        {tableItems.map((row, rowIndex) => {
          return row.map((column, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {column}
            </div>
          ));
        })}
      </div>
      {hasWinner ? (
        <div className="title">
          <h3 className="status">Game over. Winner is {currentPlayer}</h3>
          <button onClick={playAgain}>Play again</button>
        </div>
      ) : (
        <h3>Next player is {nextPlayer} </h3>
      )}
    </>
  );
}
