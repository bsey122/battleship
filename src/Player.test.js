import Gameboard from './Gameboard';
import Player from './Player';
import Ship from './Ship';

test('Returns the name of the player', () => {
  const player = Player('joe');
  expect(player.getName()).toBe('joe');
});

test('Player can attack an enemy gameboard', () => {
  const player = Player('joe');
  const enemyBoard = Gameboard();
  const enemyShip = Ship(3);
  enemyBoard.placeShip(5, 5, enemyShip, 'hor');
  player.attack(5, 5, enemyBoard);
  expect(enemyShip.getHits()).toBe(1);
});
