import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./messages.js";
import { Game } from "./game.js";

export class gameManager {
  #games /*: Game[]*/;
  #users;
  #pendinguser;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendinguser = null;
  }

  addUser(socket /*: WebSocket*/) {
    this.users.push(socket);
    this.#addHandler(socket);
  }

  removeUser(socket /*: WebSocket*/) {
    this.users = this.users.filter((user) => user !== socket);
  }

  #addHandler(socket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendinguser) {
          const newgame = new Game(this.pendinguser, socket);
          this.games.push(newgame);
          this.pendinguser = null;
        } else {
          this.pendinguser = socket;
        }
      }
      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makemove(message.move);
        }
      }
    });
  }
}
