import Gameboard from './Gameboard';
import Ship from './Ship';

test('Placed ship at location (5,4) has correct length of 3 horizontally', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(5, 4, ship, 'hor');
  expect(board.getBoardPosition(5, 4)).toBeTruthy();
  expect(board.getBoardPosition(6, 4)).toBeTruthy();
  expect(board.getBoardPosition(7, 4)).toBeTruthy();
});

test('Should not place a ship that goes out of the board horizontally', () => {
  const board = Gameboard();
  const ship = Ship(4);
  board.placeShip(7, 2, ship, 'hor');
  expect(board.getBoardPosition(7, 2)).toBeFalsy();
  expect(board.getBoardPosition(8, 2)).toBeFalsy();
  expect(board.getBoardPosition(9, 2)).toBeFalsy();
});

test('Should not place ship if a ship is already there horizontally', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(2, 3, ship, 'hor');
  expect(board.placeShip(3, 3, ship, 'hor')).toBe(false);
  expect(board.getBoardPosition(5, 3)).toBeFalsy();
});

test('Should not place ship before another ship if a ship is already in place horizontally', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(2, 3, ship, 'hor');
  expect(board.placeShip(0, 3, ship, 'hor')).toBe(false);
  expect(board.getBoardPosition(0, 3)).toBeFalsy();
  expect(board.getBoardPosition(1, 3)).toBeFalsy();
});

test('Placed ship at location (2,7) has correct length of 3 vertically', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(2, 7, ship, 'ver');
  expect(board.getBoardPosition(2, 7)).toBeTruthy();
  expect(board.getBoardPosition(2, 6)).toBeTruthy();
  expect(board.getBoardPosition(2, 5)).toBeTruthy();
});

test('Should not place a ship that goes out of the board vertically', () => {
  const board = Gameboard();
  const ship = Ship(4);
  board.placeShip(3, 2, ship, 'ver');
  expect(board.getBoardPosition(3, 2)).toBeFalsy();
  expect(board.getBoardPosition(3, 1)).toBeFalsy();
  expect(board.getBoardPosition(3, 0)).toBeFalsy();
});

test('Should not place ship if a ship is already there vertically', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(2, 3, ship, 'hor');
  expect(board.placeShip(2, 3, ship, 'ver')).toBe(false);
  expect(board.getBoardPosition(2, 2)).toBeFalsy();
  expect(board.getBoardPosition(2, 1)).toBeFalsy();
});

test('Attack hit the ship', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(1, 2, ship, 'hor');
  expect(board.receiveAttack(2, 2)).toBe(true);
});

test('Attack missed the ship', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(1, 2, ship, 'hor');
  expect(board.receiveAttack(5, 4)).toEqual([5, 4]);
});

test('Returns an array of missed shots', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(4, 2, ship, 'hor');
  board.receiveAttack(7, 8);
  board.receiveAttack(5, 4);
  board.receiveAttack(4, 2);
  expect(board.missedShots).toEqual([
    [7, 8],
    [5, 4],
  ]);
});

test('Return true if all ships on board have sunk', () => {
  const board = Gameboard();
  const ship1 = Ship(1);
  const ship2 = Ship(2);
  board.placeShip(0, 0, ship1, 'hor');
  board.placeShip(1, 1, ship2, 'hor');
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 1);
  board.receiveAttack(2, 1);
  expect(board.isSunk()).toBe(true);
});

test("Return false if some ships on board haven't sunk", () => {
  const board = Gameboard();
  const ship1 = Ship(1);
  const ship2 = Ship(2);
  board.placeShip(0, 0, ship1, 'hor');
  board.placeShip(1, 1, ship2, 'hor');
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 1);
  expect(board.isSunk()).toBe(false);
});
