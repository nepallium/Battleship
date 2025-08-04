import { startGame } from "./domStuff";
import { resetGame } from "./gameFunctions"
import gameState from "./gameState";
import {
    listenForRandomize,
    listenForReset,
    listenForRotate,
    listenForShipDragAndDrop,
} from "./shipDragAndDrop";
import { listenForAttack } from "./userPlayer";

export function initializeListeners() {
    listenForRandomize();
    listenForReset();
    listenForShipDragAndDrop();
    listenForRotate();
    listenForStartGame()
    listenForRestartGame()

    // listen for user clicks on computer's board
    const compBoardElement = gameState.getElementFromPlayer(gameState.player1);
    for (const cell of compBoardElement.childNodes) {
        listenForAttack(cell);
    }
}

function listenForStartGame() {
    const startBtn = document.querySelector(".start-game")
    startBtn.addEventListener("click", () => {
        startGame()
    })
}

function listenForRestartGame() {
    const modal = document.querySelector("dialog.end-game-modal")
    const restartBtn = modal.querySelector(".restart-game")
    restartBtn.addEventListener("click", () => {
        modal.close()
        resetGame()
    })
}
