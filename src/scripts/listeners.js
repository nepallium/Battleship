import { computerMakeMove } from "./computerPlayer";
import { loadBoard, styleSunkenShip, disableBoard, endGame } from "./domStuff";
import { checkWin, processAttack } from "./gameFunctions";
import gameState from "./gameState";

export function listenForAttack(div) {
    const playerSectionElement = div.parentElement;

    const player = gameState.getPlayerFromElement(playerSectionElement);

    div.addEventListener("click", () => {
        handleAttackClick(div, player);
    });
}

function handleAttackClick(div, player) {
    // Only allow attacks during user's turn
    if (!gameState.isUserTurn()) {
        return;
    }

    div.style.pointerEvents = "none";
    processAttack(div, player);

    // If user sinks
    if (div.classList.contains("sunk")) {
        // Continue playing
    }
    // Else if attack was a miss, keep playing
    else if (!div.classList.contains("hit")) {
        // User missed - switch to computer's turn
        gameState.switchTurn();
        gameState.setComputerThinking(true);
        
        // Disable the entire board to prevent further clicks
        disableBoard(player);

        // Computer makes moves
        setTimeout(() => {
            computerMakeMove();
        }, 50);
    }
}
