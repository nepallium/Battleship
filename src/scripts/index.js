import "../css/reset.css"
import "../css/styles.css"

import Player from "./classes/Player";
import Gameboard from "./classes/Gameboard";
import Ship from "./classes/Ship";
import { createBoard } from "./domStuff";

// Initialize boards
const player1Board = document.querySelector("section.player-1")
const player2Board = document.querySelector("section.player-2")

createBoard(player1Board)
createBoard(player2Board)
