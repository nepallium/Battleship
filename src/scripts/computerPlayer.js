import { processAttack } from "./gameFunctions";
import { getDivFromCoord } from "./domStuff";
import gameState from "./gameState";

// use user's board copy to know which coordinates to select from
const coords = generateCoordsArr()
let adjCoords = []
export function computerMakeMove() {
    const size = coords.length

    let idx, selectedCoord
    if (adjCoords.length > 0) {
        idx = Math.floor(Math.random() * adjCoords.length)
        selectedCoord = adjCoords.splice(idx, 1)[0]
    } else {
        idx = Math.floor(Math.random() * size)
        selectedCoord = coords.splice(idx, 1)[0]
    }

    const selectedDiv = getDivFromCoord(selectedCoord)

    processAttack(selectedDiv, gameState.player2)

    if (selectedDiv.classList.contains("hit")) {
        findAdjCoords(selectedCoord)
        console.log(adjCoords)
        setTimeout((() => computerMakeMove()), 250)
    }
}

function findAdjCoords(base) {
    const [baseX, baseY] = base

    adjCoords.push(...coords.filter(coord => {
        const [x, y] = coord

        if (x === baseX) {
            if (y === baseY + 1 || y === baseY - 1) {
                return true
            }
        }
        if (y === baseY) {
            if (x === baseX + 1 || x === baseX - 1) {
                return true
            }
        }
        else {
            return false
        }
    }))
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