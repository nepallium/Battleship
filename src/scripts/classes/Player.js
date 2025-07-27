import Gameboard from "./Gameboard";

export default class Player {
    constructor(playerType) {
        this.gameboard = new Gameboard();
        this.playerType = playerType;
    }
}
