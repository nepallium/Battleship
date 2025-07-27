import gameState from "./gameState"

export function listenForAttack(div) {
    const playerNum = div.parentElement.className

    let player;
    if (playerNum === "player-1") {
        player = gameState.player1
    }
    else if (playerNum === "player-2") {
        player = gameState.player2
    }

    const coords = JSON.parse(div.dataset.position)
    div.addEventListener("click", () => {
        player.gameboard.receiveAttack(coords)
    })
}