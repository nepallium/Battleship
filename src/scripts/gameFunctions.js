import Player from "./classes/Player";
import {
  loadBoard,
  endGame,
  hideStartOptions,
  emboldenCurrentPlayerTurn,
} from "./domStuff";
import gameState from "./gameState";
import { styleSunkenShip } from "./domStuff";
import Ship from "./classes/Ship";
import { resetShipPlacer } from "./shipDragAndDrop";

export function resetGame() {
  // reset gameState
  gameState.player1 = new Player();
  gameState.player2 = new Player();

  // Initialize boards
  const compPlayer = gameState.player1;
  compPlayer.gameboard.randomizeBoard();
  loadBoard(gameState.getElementFromPlayer(compPlayer));

  // set first player to user
  gameState.currPlayer = gameState.player2;

  resetShipPlacer();
  hideStartOptions();

  // Show starting modal
  const startDialog = document.querySelector("dialog.start-game-modal");
  startDialog.showModal();
  loadBoard(startDialog.querySelector("section.player-2"));

  emboldenCurrentPlayerTurn();
}

export function processAttack(cell, attackedPlayer) {
  const coords = JSON.parse(cell.dataset.position);
  const [row, col] = coords;
  attackedPlayer.gameboard.receiveAttack(coords);

  let cellVal = attackedPlayer.gameboard.board[row][col];
  if (cellVal === 1) {
    cell.dataset.value = "1";
  } else if (cellVal instanceof Ship) {
    const ship = cellVal;

    cell.dataset.value = "ship";
    cell.dataset.shipName = ship.name;

    if (ship.isSunk()) {
      styleSunkenShip(cell);
    } else {
      cell.classList.add("hit");
    }
  }

  if (attackedPlayer.gameboard.isGameOver()) {
    // Determine the winner (the attacker, not the attacked player)
    const winner =
      attackedPlayer === gameState.player1
        ? gameState.player2
        : gameState.player1;
    endGame(winner);
  }
}

export function checkWin(winningPlayer) {
  const loser =
    winningPlayer === gameState.player1 ? gameState.player2 : gameState.player1;

  if (loser.gameboard.isGameOver()) {
    return true;
  }

  return false;
}
