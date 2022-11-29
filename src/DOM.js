const Dom = (() => {
  const gameResults = document.querySelector('.game-results');
  const ships = document.querySelectorAll('.ship');
  let draggable = null;

  function createBoard(container) {
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-coord', `${x}, ${y}`);
        container.appendChild(square);
      }
    }
  }

  function renderSunkShip(gameboard, container) {
    const { board } = gameboard;
    board.forEach((row, x) => {
      row.forEach((ship, y) => {
        if (!ship) {
          return;
        }
        const sunk = ship.isSunk();
        if (sunk) {
          for (let i = 0; i < container.childNodes.length; i += 1) {
            const coord = container.childNodes[i];
            if (coord.dataset.coord === `${x}, ${y}`) {
              coord.classList.add('sunk');
            }
          }
        }
      });
    });
  }

  function renderBoard(attack, gameboard, container, coordinates) {
    const { x, y } = coordinates;

    for (let i = 0; i < container.childNodes.length; i += 1) {
      const coord = container.childNodes[i];
      if (coord.dataset.coord === `${x}, ${y}`) {
        let result;
        if (attack === true) {
          result = 'hit';
        } else {
          result = 'miss';
        }
        coord.classList.add(result);
      }
    }
    renderSunkShip(gameboard, container);
  }

  function renderShips(gameboard, container) {
    const { board } = gameboard;
    board.forEach((row, x) => {
      row.forEach((ship, y) => {
        if (!ship) {
          return;
        }
        for (let i = 0; i < container.childNodes.length; i += 1) {
          const coord = container.childNodes[i];
          if (coord.dataset.coord === `${x}, ${y}`) {
            coord.classList.add('ship');
          }
        }
      });
    });
  }

  function getUserAttack(e, player, gameboard, container) {
    const {
      dataset: { coord },
      classList,
    } = e.target;
    if (classList.contains('hit')) {
      return;
    }
    let [x, y] = coord.split(',');
    x = +x;
    y = +y;

    const attack = player.attack(x, y, gameboard);
    renderBoard(attack, gameboard, container, { x, y });
  }

  function getComputerAttack(computer, gameboard, container) {
    let coord = computer.randomCoordinates();
    let attacked = true;
    let computerAttack;
    let { attackResult, isAttacked } = computer.autoAttack(
      coord,
      computer.attack,
      gameboard
    );
    const attackListLength = computer.attackList.length;
    while (attacked && attackListLength < 100) {
      if (isAttacked) {
        coord = computer.randomCoordinates();
        ({ attackResult, isAttacked } = computer.autoAttack(
          coord,
          computer.attack,
          gameboard
        ));
      }
      attacked = isAttacked;
      computerAttack = attackResult;
    }
    renderBoard(computerAttack, gameboard, container, coord);
    return computerAttack;
  }

  function restartGame() {
    window.location.reload();
  }

  function renderWin(winner) {
    gameResults.textContent = `The winner is ${winner}`;
    const replayButton = document.createElement('button');
    replayButton.textContent = 'Play Again';
    gameResults.appendChild(replayButton);
    replayButton.addEventListener('click', restartGame);
  }

  function isWin(player, enemyBoard) {
    const win = enemyBoard.isSunk();
    if (win) {
      const playerName = player.getName();
      renderWin(playerName);
    }
    return win;
  }

  function attackListener(
    player,
    enemyGameboard,
    enemyContainer,
    computer,
    playerGameboard,
    playerContainer
  ) {
    function gameplay(e) {
      const playerPlacedShip = playerGameboard.placedShips;
      if (playerPlacedShip.length === 5) {
        let win;
        getUserAttack(e, player, enemyGameboard, enemyContainer);
        win = isWin(player, enemyGameboard);
        if (win) {
          this.removeEventListener('click', gameplay);
          return;
        }
        getComputerAttack(computer, playerGameboard, playerContainer);
        win = isWin(computer, playerGameboard);
        if (win) {
          this.removeEventListener('click', gameplay);
        }
      }
    }
    enemyContainer.addEventListener('click', gameplay);
  }

  function dragShip(e, playerGameboard) {
    const {
      dataset: { coord },
      classList,
    } = e.target;
    let [x, y] = coord.split(', ');
    x = +x;
    y = +y;
    const {
      children: { length },
      dataset: { direction },
    } = draggable;
    const isValid = playerGameboard.isValidMove(x, y, length, direction);
    return { x, y, isValid, classList };
  }

  function dragStart(e) {
    draggable = e.target;
  }
  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  function dragOver(e, playerGameboard) {
    e.preventDefault();
    const { isValid, classList } = dragShip(e, playerGameboard);
    if (!isValid) {
      classList.add('invalid');
      return;
    }
    classList.add('drag-over');
  }

  function dragLeave(e) {
    e.target.classList.remove('drag-over');
    e.target.classList.remove('invalid');
  }

  function drop(e, playerGameboard, shipMap, container) {
    const { x, y, isValid, classList } = dragShip(e, playerGameboard);
    if (!isValid) {
      classList.remove('invalid');
      classList.remove('drag-over');
      return;
    }
    const {
      dataset: { direction },
    } = draggable;
    classList.remove('drag-over');
    const ship = shipMap.get(draggable);
    playerGameboard.placeShip(x, y, ship, direction);
    renderShips(playerGameboard, container);
    draggable.classList.add('hide');
  }

  ships.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('click', () => {
      const { direction } = ship.dataset;
      if (direction === 'hor') {
        ship.setAttribute('data-direction', 'ver');
      } else if (direction === 'ver') {
        ship.setAttribute('data-direction', 'hor');
      }
    });
  });
  return {
    createBoard,
    renderBoard,
    renderSunkShip,
    renderShips,
    getUserAttack,
    attackListener,
    dragEnter,
    dragOver,
    dragLeave,
    drop,
  };
})();
export default Dom;
