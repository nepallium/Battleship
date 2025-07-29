import gameState from "./gameState";
import { listenForAttack } from "./listeners";

export function loadBoard(playerSectionElement) {
    const player = playerSectionElement.classList.contains("player-1") ? gameState.player1 : gameState.player2
    const playerBoard = player.gameboard;


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            const cellVal = playerBoard.board[i][j];
            cell.classList.add("cell");
            cell.dataset.value = cellVal;

            if (cellVal === 1) {
                fillCell(cell)
            }

            cell.dataset.position = JSON.stringify([i, j]);

            playerSectionElement.appendChild(cell);
            listenForAttack(cell);
        }
    }
}

function fillCell(div) {
    div.style.backgroundColor = "red"
}
