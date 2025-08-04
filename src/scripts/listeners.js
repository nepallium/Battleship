import { startGame } from "./domStuff";
import { resetGame } from "./gameFunctions";
import gameState from "./gameState";
import {
    listenForRandomize,
    listenForReset,
    listenForRotate,
    listenForShipDragAndDrop,
} from "./shipDragAndDrop";
import { listenForAttack } from "./userPlayer";

export function initializeListeners() {
    // disableEscAndAutofocusDialog();
    listenForRandomize();
    listenForReset();
    listenForShipDragAndDrop();
    listenForRotate();
    listenForRestartGame();

    // listen for user clicks on computer's board
    const compBoardElement = gameState.getElementFromPlayer(gameState.player1);
    for (const cell of compBoardElement.childNodes) {
        listenForAttack(cell);
    }
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

function disableEscAndAutofocusDialog() {
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach((dialog) =>
        dialog.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
            }
        })
    );
}
