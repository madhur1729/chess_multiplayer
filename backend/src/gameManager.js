// interface Game {
//   id: Number;
//   name: String;
//   players1: WebSocket;
//   players2: WebSocket;
// }

// interface Users {
//   id: Number;
// }

export class gameManager {
  #games /*: Game[]*/;
  #users;
  #pendinguser;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendinguser = NULL;
  }

  addUser(socket /*: WebSocket*/) {
    this.users.push(socket);
  }

  removeUser(socket /*: WebSocket*/) {
    this.users = this.users.filter((user) => user !== socket);
  }

  #addHandler(socket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.tostring());
      if (message.type === INIT_GAME) {
        if (this.pendinguser) {
          const newgame = new Game(this.#pendinguser, socket);
          this.games.push(newgame);
          this.pendinguser = NULL;
        } else {
          this.pendinguser = socket;
        }
      }
      if (message.type === MOVE) {
      }
    });
  }
}
