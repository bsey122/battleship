import Player from './Player';

const Computer = (name) => {
  const { getName, attack } = Player(name);
  const attackList = [];

  function randomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return { x, y };
  }

  function autoAttack(coordinates, computerAttack, gameboard) {
    const { x, y } = coordinates();
    const isAttacked = attackList.some(
      (coordinate) => coordinate.x === x && coordinate.y === y
    );
    if (!isAttacked) {
      attackList.push({ x, y });
    }
    return computerAttack(x, y, gameboard);
  }

  return { autoAttack, attack, getName, randomCoordinates, attackList };
};
export default Computer;
