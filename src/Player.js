const Player = (name) => {
  function getName() {
    return name;
  }

  function attack(x, y, gameboard) {
    return gameboard.receiveAttack(x, y);
  }
  return { getName, attack };
};
export default Player;
