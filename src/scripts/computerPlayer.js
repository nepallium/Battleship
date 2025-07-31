import { processAttack } from "./gameFunctions";
import gameState from "./gameState";

// use user's board copy to know which coordinates to select from
const userBoardElements = Array.from(document.querySelector("section.player-2").children)
console.log(userBoardElements)
export function computerMakeMove() {
    const size = userBoardElements.length
    // random idx
    const idx = Math.floor(Math.random() * size)

    const selectedDiv = userBoardElements.splice(idx, 1)
    processAttack(selectedDiv, gameState.player2)
}