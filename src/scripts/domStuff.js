import gameState from "./gameState";
import Ship from "./classes/Ship";
import { listenForAttack } from "./listeners";

export function loadBoard(playerSectionElement) {
    playerSectionElement.innerHTML = "";
    const player = gameState.getPlayerFromElement(playerSectionElement);
    const playerBoard = player.gameboard;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            const cellVal = playerBoard.board[i][j];
            cell.classList.add("cell");

            cell.dataset.position = JSON.stringify([i, j]);

            playerSectionElement.appendChild(cell);

            // only listen for clicks if board is computer's
            if (player === gameState.player1) {
                listenForAttack(cell);
            }
            // only display ships on user's own board
            else {
                if (cellVal instanceof Ship) {
                    const ship = cellVal;
                    cell.dataset.value = "ship";
                    cell.dataset.shipName = ship.name;
                }
            }
        }
    }
}

export function styleSunkenShip(shipCell) {
    const player = shipCell.parentElement;
    const shipName = shipCell.dataset.shipName;

    const shipCells = player.querySelectorAll(`[data-ship-name="${shipName}"]`);

    for (const cell of shipCells) {
        cell.classList.add("sunk");
        cell.classList.remove("hit");
    }
}

export function getDivFromCoord(coord, player) {
    const playerSectionElement = gameState.getElementFromPlayer(player);

    const selectedDiv = playerSectionElement.querySelector(
        `div.cell[data-position="${JSON.stringify(coord)}"]`
    );

    console.log(selectedDiv);
    return selectedDiv;
}

export function disableBoard(player) {
    const playerSection = gameState.getElementFromPlayer(player);
    playerSection.classList.add("disabled");
}

export function enableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.classList.remove("disabled");
}

export function endGame(winner) {
    const winningPlayer = winner === gameState.player2 ? "User" : "Computer"

    disableBoard(gameState.player1)
    disableBoard(gameState.player2)
    console.log(`GGs! ${winningPlayer} won!`)
}
