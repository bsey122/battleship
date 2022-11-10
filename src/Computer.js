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
    const { x, y } = coordinates;
    let attackResult;
    const isAttacked = attackList.some(
      (coordinate) => coordinate.x === x && coordinate.y === y
    );
    if (!isAttacked) {
      attackList.push({ x, y });
      attackResult = computerAttack(x, y, gameboard);
    }
    return { attackResult, isAttacked };
  }

  return { autoAttack, attack, getName, randomCoordinates, attackList };
};
export default Computer;
