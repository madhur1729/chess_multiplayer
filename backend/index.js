import { WebSocketServer } from "ws";
import { gameManager } from "./src/gameManager.js";

const wss = new WebSocketServer({ port: 8080 });

const GameManager = new gameManager();
wss.on("connection", function connection(ws) {
  GameManager.addUser(ws);
  ws.on("disconnect", () => GameManager.removeUser(ws));
  // ws.on("error", console.error);

  // ws.on("message", function message(data) {
  //   console.log("received: %s", data);
  // });

  // ws.send("something");
});
