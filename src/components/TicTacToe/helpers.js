export function checkWinner(items, player) {
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

export function checkDraw(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      if (!!items[i][j]) {
        total++;
      }
    }
  }
  if (total === 9) {
    return true;
  }
  return false;
}
