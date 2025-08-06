import { startGame } from "./domStuff";
import { resetGame } from "./gameFunctions";
import gameState from "./gameState";
import {
    listenForRandomize,
    listenForReset,
    listenForRotate,
    listenForShipDragAndDrop,
} from "./shipDragAndDrop";

export function initializeListeners() {
    listenForRandomize();
    listenForReset();
    listenForShipDragAndDrop();
    listenForRotate();
    listenForRestartGame();
}

export function listenForStartGame() {
    const modal = document.querySelector("dialog.start-game-modal");
    const startBtn = document.querySelector(".start-game");
    startBtn.addEventListener("click", () => {
        modal.close();
        startGame();
    });
}

function listenForRestartGame() {
    const modal = document.querySelector("dialog.end-game-modal");
    const restartBtn = modal.querySelector(".restart-game");
    restartBtn.addEventListener("click", () => {
        modal.close();
        resetGame();
    });
}

