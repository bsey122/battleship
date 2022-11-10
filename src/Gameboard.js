/* eslint-disable no-plusplus */
const Gameboard = () => {
  const board = [];
  const missedShots = [];
  const placedShips = [];

  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i].push(null);
    }
  }

  function getBoardPosition(pos1, pos2) {
    const position = board[pos1][pos2];
    return position;
  }

  function placeShip(x, y, ship, dir) {
    const length = ship.getLength();
    if (dir === 'hor') {
      if (x + length > 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (board[x + i][y]) {
          return false;
        }
      }
      for (let i = 0; i < length; i++) {
        board[x + i][y] = ship;
      }
      placedShips.push(ship);
    } else if (dir === 'ver') {
      if (length - y > 0) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (board[x][y - i]) {
          return false;
        }
      }
      for (let i = 0; i < length; i++) {
        board[x][y - i] = ship;
      }
      placedShips.push(ship);
    }
    return board;
  }

  function receiveAttack(x, y) {
    const position = getBoardPosition(x, y);
    if (position) {
      position.hit();
      return true;
    }
    missedShots.push([x, y]);
    return [x, y];
  }

  function isSunk() {
    return placedShips.every((ship) => ship.isSunk() === true);
  }

  return {
    getBoardPosition,
    placeShip,
    receiveAttack,
    missedShots,
    isSunk,
    board,
  };
};
export default Gameboard;
