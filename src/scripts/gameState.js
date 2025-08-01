import Player from "./classes/Player";

class GameState {
    constructor() {
        this.player1 = new Player(); // computer's board
        this.player2 = new Player(); // user's board
        this.currPlayer 
    }

    getPlayerFromElement(playerSectionElement) {
        return playerSectionElement.classList.contains("player-1") ? this.player1 : this.player2
    }

    getElementFromPlayer(player) {
        return player === this.player1 ? document.querySelector("section.player-1") : document.querySelector("section.player-2")
    }
}

export default new GameState();
