import Computer from './Computer';
import Dom from './DOM';
import Gameboard from './Gameboard';
import Player from './Player';
import Ship from './Ship';

const Game = () => {
  function initOnePlayerGame() {
    const playerOne = Player('Player 1');
    const playerOneGameboard = Gameboard();
    const computer = Computer('Computer');
    const computerGameboard = Gameboard();
    const playerOneCarrier = Ship(5);
    const playerOneBattleship = Ship(4);
    const playerOneDestroyer = Ship(3);
    const playerOneSubmarine = Ship(3);
    const playerOnePatrolBoat = Ship(2);
    const computerCarrier = Ship(5);
    const computerBattleship = Ship(4);
    const computerDestroyer = Ship(3);
    const computerSubmarine = Ship(3);
    const computerPatrolBoat = Ship(2);

    const playerOneCarrierContainer = document.querySelector(
      '[data-ship="carrier"]'
    );
    const playerOneBattleshipContainer = document.querySelector(
      '[data-ship="battleship"]'
    );
    const playerOneDestroyerContainer = document.querySelector(
      '[data-ship="destroyer"]'
    );
    const playerOneSubmarineContainer = document.querySelector(
      '[data-ship="submarine"]'
    );
    const playerOnePatrolBoatContainer = document.querySelector(
      '[data-ship="patrol-boat"]'
    );
    const gameboardOneContainer = document.querySelector(
      '[data-gameboard="one"]'
    );
    const gameboardTwoContainer = document.querySelector(
      '[data-gameboard="two"]'
    );

    const shipMap = new Map();

    shipMap.set(playerOneCarrierContainer, playerOneCarrier);
    shipMap.set(playerOneBattleshipContainer, playerOneBattleship);
    shipMap.set(playerOneDestroyerContainer, playerOneDestroyer);
    shipMap.set(playerOneSubmarineContainer, playerOneSubmarine);
    shipMap.set(playerOnePatrolBoatContainer, playerOnePatrolBoat);

    Dom.createBoard(gameboardOneContainer);
    Dom.createBoard(gameboardTwoContainer);

    gameboardOneContainer.addEventListener('dragenter', Dom.dragEnter);
    gameboardOneContainer.addEventListener('dragover', (e) => {
      Dom.dragOver(e, playerOneGameboard);
    });
    gameboardOneContainer.addEventListener('dragleave', Dom.dragLeave);
    gameboardOneContainer.addEventListener('drop', (e) => {
      Dom.drop(e, playerOneGameboard, shipMap, gameboardOneContainer);
    });

    Dom.attackListener(
      playerOne,
      computerGameboard,
      gameboardTwoContainer,
      computer,
      playerOneGameboard,
      gameboardOneContainer
    );

    computerGameboard.autoPlaceShip(computerCarrier);
    computerGameboard.autoPlaceShip(computerBattleship);
    computerGameboard.autoPlaceShip(computerDestroyer);
    computerGameboard.autoPlaceShip(computerSubmarine);
    computerGameboard.autoPlaceShip(computerPatrolBoat);
    return {
      playerOne,
      playerOneGameboard,
      computer,
      computerGameboard,
      playerOneBattleship,
      playerOneDestroyer,
      playerOneSubmarine,
      playerOnePatrolBoat,
      computerCarrier,
      computerBattleship,
      computerDestroyer,
      computerSubmarine,
      computerPatrolBoat,
      shipMap,
    };
  }
  return { initOnePlayerGame };
};
export default Game;
