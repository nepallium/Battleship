import { processAttack } from "./gameFunctions";
import { getDivFromCoord } from "./domStuff";
import gameState from "./gameState";

// use user's board copy to know which coordinates to select from
const coords = generateCoordsArr()
export function computerMakeMove() {
    const size = coords.length
    // random idx
    const idx = Math.floor(Math.random() * size)

    const selectedCoord = coords.splice(idx, 1)[0]
    
    console.log(selectedCoord)
    const selectedDiv = getDivFromCoord(selectedCoord)

    processAttack(selectedDiv, gameState.player2)
}

function generateCoordsArr() {
    let coords = []

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            coords.push([i, j])
        }
    }

    return coords
}