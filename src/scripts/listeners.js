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
    div.style.pointerEvents = "none";
    processAttack(div, player);

    // Disable the entire board section to prevent further clicks
    disableBoard();

    // computer makes moves
    setTimeout(() => {
        computerMakeMove();
        // Re-enable the board after computer move completes
        enableBoard();
    }, 250);
}

function disableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.style.pointerEvents = "none";
    player1Section.classList.add("disabled");
}

function enableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.style.pointerEvents = "auto";
    player1Section.classList.remove("disabled");
}
