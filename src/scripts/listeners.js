import { loadBoard } from "./domStuff";
import gameState from "./gameState"

export function listenForAttack(div) {
    const playerElement = div.parentElement

    let player;
    if (playerElement.classList.contains("player-1")) {
        player = gameState.player1
    }
    else if (playerElement.classList.contains("player-2")) {
        player = gameState.player2
    }

    const coords = JSON.parse(div.dataset.position)
    div.addEventListener("click", () => {
        player.gameboard.receiveAttack(coords)
        div.dataset.value = 1
        loadBoard(div.parentElement)
    })
}