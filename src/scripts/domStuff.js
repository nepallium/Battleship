export function createBoard(playerSectionElement) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div")
            cell.dataset.position = JSON.stringify([i, j])
            cell.className = "cell"

            playerSectionElement.appendChild(cell)
        }
    }
}
