import { loadBoard, styleSunkenShip } from "./domStuff";
import gameState from "./gameState"

export function listenForAttack(div) {
    const playerSectionElement = div.parentElement

    const player = gameState.getPlayerFromElement(playerSectionElement)

    const coords = JSON.parse(div.dataset.position)
    div.addEventListener("click", () => {
        player.gameboard.receiveAttack(coords)
        
        let cellVal = div.dataset.value
        if (cellVal === "0") {
            div.dataset.value = 1
        } else if (cellVal === "ship") {
            const [row, col] = coords;
            const ship = player.gameboard.board[row][col];
            if (ship.isSunk()) {
                styleSunkenShip(div)
            } else {
                div.classList.add("hit")
            }
        }
    })
}
