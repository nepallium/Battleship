import gameState from "./gameState";
import Ship from "./classes/Ship";
import { listenForAttack } from "./listeners";

/*
Pseudocode logic for board loading

User's board:
- show misses
- show hits
- show all ships

Computer's board (left):
- show misses
- show hits
- show full ship hit with outline or smt
*/

export function loadBoard(playerSectionElement) {
    playerSectionElement.innerHTML = ""
    const player = playerSectionElement.classList.contains("player-1") ? gameState.player1 : gameState.player2
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
                cell.dataset.value = "ship"
                cell.dataset.shipName = cellVal.name 
            }

            if (cellVal === 1) {
                fillCell(cell)
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

function fillCell(div) {
    div.style.backgroundColor = "red"
}
