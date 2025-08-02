import Player from "./classes/Player";
import { loadBoard } from "./domStuff";
import gameState from "./gameState";
import { styleSunkenShip } from "./domStuff";
import Ship from "./classes/Ship";

export function resetGame() {
    // reset gameState
    gameState.player1 = new Player();
    gameState.player2 = new Player();

    // Initialize boards
    const player1Element = document.querySelector("section.player-1");
    const player2Element = document.querySelector("section.player-2");

    loadBoard(player1Element);
    loadBoard(player2Element);
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
}
