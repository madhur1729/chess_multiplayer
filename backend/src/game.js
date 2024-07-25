import { WebSocket } from "ws";
import { Chess } from "chess.js";
// import { type } from "express/lib/response";
import { INIT_GAME, MOVE, GAME_OVER } from "./messages.js";

export class Game {
  player1;
  player2;
  board;
  moves;
  #starttime;

  constructor(socket1, socket2) {
    this.player1 = socket1;
    this.player2 = socket2;
    this.board = new Chess();
    this.starttime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          colour: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          colour: "black",
        },
      })
    );
  }

  makemove(socket, move) {
    // validate
    if (this.board.moves.lenght % 2 === 0 && socket !== this.player1) {
      return;
    }
    if (this.board.moves.lenght % 2 === 1 && socket !== this.player2) {
      return;
    }

    //make move and update board
    try {
      this.board.move(move);
    } catch (e) {
      return;
    }
    //push moves
    //check-/mate status of game
    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }
    if (this.board.moves.length % 2 === 0) {
      this.player2.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
  }
}
