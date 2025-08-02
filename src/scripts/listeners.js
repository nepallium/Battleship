import { computerMakeMove } from "./computerPlayer";
import { loadBoard, styleSunkenShip } from "./domStuff";
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

    div.style.pointerEvents = "none";
    processAttack(div, player);

    // Check if the attack was successful
    if (!(div.classList.contains("hit") || div.classList.contains("sunk"))) {
        // User missed - switch to computer's turn
        gameState.switchTurn();
        gameState.setComputerThinking(true);
        
        // Disable the entire board to prevent further clicks
        disableBoard();

        // Computer makes moves
        setTimeout(() => {
            computerMakeMove();
        }, 500);
    }
}

function disableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.classList.add("disabled");
}

export function enableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.classList.remove("disabled");
}
