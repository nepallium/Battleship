import Player from "./classes/Player";

class GameState {
    constructor() {
        this.player1 = new Player();
        this.player2 = new Player();
    }
}

export default new GameState();
