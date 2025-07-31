import { computerMakeMove } from "./computerPlayer";
import { loadBoard, styleSunkenShip } from "./domStuff";
import { processAttack } from "./gameFunctions";
import gameState from "./gameState";

export function listenForAttack(div) {
    const playerSectionElement = div.parentElement;

    const player = gameState.getPlayerFromElement(playerSectionElement);

    div.addEventListener("click", () => {
        processAttack(div, player);
        // Computer makes move after player's move
        setTimeout(() => computerMakeMove(), 500);
    });
}
