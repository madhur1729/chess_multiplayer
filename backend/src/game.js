import { WebSocket } from "ws";

export class Game {
  #player1;
  #player2;
  #board;
  #moves;
  #starttime;

  constructor(socket1, socket2) {
    this.#player1 = socket1;
    this.#player2 = socket2;
    this.#board = "";
    this.moves = [];
    this.starttime = new Date();
  }

  makemove(move) {
    // validate
    //make move and update board
    //push moves
    //check-/mate status of game
  }
}
