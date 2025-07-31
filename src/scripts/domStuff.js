import gameState from "./gameState";
import Ship from "./classes/Ship";
import { listenForAttack } from "./listeners";

export function loadBoard(playerSectionElement) {
    playerSectionElement.innerHTML = ""
    const player = gameState.getPlayerFromElement(playerSectionElement)
    const playerBoard = player.gameboard;


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            const cellVal = playerBoard.board[i][j];
            cell.classList.add("cell");

            if (cellVal === 0 || cellVal === 1) {
                cell.dataset.value = cellVal;
            } else {
                // cellVal is a ship
                const ship = cellVal
                cell.dataset.value = "ship"
                cell.dataset.shipName = ship.name
            }

            cell.dataset.position = JSON.stringify([i, j]);

            playerSectionElement.appendChild(cell);

            // only listen for clicks if board is computer's
            if (player === gameState.player1) {
                listenForAttack(cell);
            }
        }
    }
}

export function styleSunkenShip(shipCell) {
    const player = shipCell.parentElement
    const shipName = shipCell.dataset.shipName

    const shipCells = player.querySelectorAll(`[data-ship-name="${shipName}"]`)

    for (const cell of shipCells) {
        cell.classList.add("sunk")
    }
}
