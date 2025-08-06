import { computerMakeMove } from "./computerPlayer";
import { disableBoard } from "./domStuff";
import { processAttack } from "./gameFunctions";
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

    div.classList.add("clicked")
    processAttack(div, player);

    // If user sinks
    if (div.classList.contains("sunk")  || div.classList.contains("hit")) {
        // Continue playing
    }
    // Else if attack was a miss, keep playing
    else {
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
