import React, { useState } from "react";
import "./TicTacToe.css";
import { checkDraw, checkWinner, getInitialItems } from "./helpers";

let currentPlayer = "O";
let hasWinner = false;

export function TicTacToe() {
  const [tableItems, setTableItems] = useState(() => getInitialItems());

  const handleClick = (row, column) => {
    if (hasWinner || tableItems[row][column]) return;
    const newItems = [...tableItems];
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayer = nextPlayer;
    newItems[row][column] = nextPlayer;
    setTableItems(newItems);
  };

  const playAgain = () => {
    setTableItems(getInitialItems());
  };

  const nextPlayer = currentPlayer === "X" ? "O" : "X";
  const isDraw = checkDraw(tableItems);
  hasWinner = checkWinner(tableItems, currentPlayer);

  return (
    <div>
      <div className={`table ${hasWinner ? "disabled" : ""}`}>
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
      {hasWinner || isDraw ? (
        <div className="title">
          {hasWinner ? (
            <h3 className="status">
              Game over. Winner is player {currentPlayer}
            </h3>
          ) : (
            <h3 className="status">Game over. This game is draw</h3>
          )}
          <button onClick={playAgain}>Play again</button>
        </div>
      ) : (
        <h3>Next player is {nextPlayer} </h3>
      )}
    </div>
  );
}
