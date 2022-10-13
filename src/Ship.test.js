import Ship from './Ship';

test('Returns the number of hits to a ship', () => {
  const ship = Ship(3);
  expect(ship.getHits()).toBe(0);
});

test('Increases the number of hits', () => {
  const ship = Ship(4);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});

test('Ship should not be sunk initially', () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test('Ship of length 3 should not sink from 1 hit', () => {
  const ship = Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('Ship of length 3 should sink from 3 hits', () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('Returns the length of ship', () => {
  const ship = Ship(3);
  expect(ship.getLength()).toBe(3);
});
