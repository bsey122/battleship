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

  function isValidMove(x, y, length, dir) {
    if (dir === 'hor') {
      if (x + length > 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (board[x + i][y]) {
          return false;
        }
      }
    } else if (dir === 'ver') {
      if (length + y > 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (board[x][y + i]) {
          return false;
        }
      }
    }
    return true;
  }

  function placeShip(x, y, ship, dir) {
    const length = ship.getLength();
    const validMove = isValidMove(x, y, length, dir);
    if (!validMove) {
      return validMove;
    }
    if (dir === 'hor') {
      for (let i = 0; i < length; i++) {
        board[x + i][y] = ship;
      }
      placedShips.push(ship);
    } else if (dir === 'ver') {
      for (let i = 0; i < length; i++) {
        board[x][y + i] = ship;
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
    isValidMove,
    placedShips,
  };
};
export default Gameboard;
