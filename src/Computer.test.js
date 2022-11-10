import Computer from './Computer';
import Gameboard from './Gameboard';
import Ship from './Ship';

test('Computer can make random attacks', () => {
  const board = Gameboard();
  const ship = Ship(3);
  const computer = Computer('com');
  board.placeShip(6, 1, ship, 'hor');

  const fakeAttackCoordinates = () => {
    const fakeX = 4;
    const fakeY = 0;
    return { x: fakeX, y: fakeY };
  };

  const fakeAttack = (x, y, gameboard) => computer.attack(x, y, gameboard);

  const expected = computer.autoAttack(
    fakeAttackCoordinates(),
    fakeAttack,
    board
  );

  expect(expected).toEqual({ attackResult: [4, 0], isAttacked: false });
});

test('Adds attack to attackList', () => {
  const board = Gameboard();
  const ship = Ship(3);
  const computer = Computer('com');

  board.placeShip(6, 1, ship, 'hor');

  const computerAttack = computer.attack;

  const fakeAttackCoordinates = () => {
    const fakeX = 4;
    const fakeY = 0;
    return { x: fakeX, y: fakeY };
  };

  computer.autoAttack(fakeAttackCoordinates(), computerAttack, board);
  expect(computer.attackList).toEqual([{ x: 4, y: 0 }]);
});

test("Computer shouldn't attack the same spot more than once", () => {
  const board = Gameboard();
  const ship = Ship(3);
  const computer = Computer('com');

  board.placeShip(6, 1, ship, 'hor');

  const computerAttack = computer.attack;

  const fakeAttackCoordinates = () => {
    const fakeX = 4;
    const fakeY = 0;
    return { x: fakeX, y: fakeY };
  };

  computer.autoAttack(fakeAttackCoordinates(), computerAttack, board);
  computer.autoAttack(fakeAttackCoordinates(), computerAttack, board);

  expect(computer.attackList).toEqual([{ x: 4, y: 0 }]);
});
